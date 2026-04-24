import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Filter, Search, ChevronDown, Minus, Plus, X, Home, ChevronRight } from 'lucide-react';

import { getAllProducts } from '@/lib/products';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'jackets', name: 'Riding Jackets', keywords: ['jacket'] },
  { id: 'helmets', name: 'Helmets', keywords: ['helmet'] },
  { id: 'gloves', name: 'Gloves', keywords: ['glove'] },
  { id: 'boots', name: 'Boots', keywords: ['boot', 'shoe'] },
  { id: 'pants', name: 'Riding Pants', keywords: ['pant', 'trouser', 'jeans'] },
  { id: 'luggage', name: 'Luggage', keywords: ['luggage', 'bag', 'pannier', 'top box', 'tank'] },
  { id: 'fog-lights', name: 'Fog Lights', keywords: ['light', 'fog', 'lamp'] },
  { id: 'protection', name: 'Protective Gear', keywords: ['protection', 'armor', 'guard', 'knee', 'elbow'] },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: allProducts = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Update selectedCategory when URL changes
  useEffect(() => {
    setSelectedCategory(categoryParam || 'all');
  }, [categoryParam]);

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [showFilters, setShowFilters] = useState(false);

  // Mapping images removed, rely on product.image
  const productImages: { [key: string]: string } = {};

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'category', label: 'Category' },
  ];

  const extractPrice = (priceStr: string | number) => {
    if (typeof priceStr === 'number') return priceStr;
    return parseInt(priceStr.replace(/[₹,]/g, '') || '0');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategory !== 'all') {
      const category = categories.find(c => c.id === selectedCategory);
      // Loose matching if category names slightly differ
      if (category && category.keywords) {
        filtered = filtered.filter(product => {
          const searchString = `${product.category} ${product.title}`.toLowerCase();
          return category.keywords?.some(keyword => searchString.includes(keyword.toLowerCase()));
        });
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.descriptionHtml?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(product => {
      const price = extractPrice(product.price);
      return price >= priceRange.min && price <= priceRange.max;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'price':
          aValue = extractPrice(a.price);
          bValue = extractPrice(b.price);
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'name':
        case 'name':
        default:
          aValue = a.title;
          bValue = b.title;
      }

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [allProducts, selectedCategory, searchQuery, priceRange, sortBy, sortOrder]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange({ min: 0, max: 50000 });
    setSortBy('name');
    setSortOrder('asc');
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery || priceRange.min > 0 || priceRange.max < 50000;

  // Render content for sidebar
  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-100 pb-2">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 bg-transparent text-sm border-b border-gray-200 focus:border-black transition-colors outline-none placeholder:text-gray-400"
          />
          <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-100 pb-2">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`block text-sm text-left transition-all w-full flex items-center justify-between group ${selectedCategory === category.id
                ? 'font-bold text-black pl-2 border-l-2 border-black'
                : 'text-gray-500 font-medium pl-2 border-l-2 border-transparent hover:border-gray-200 hover:text-gray-900'
                }`}
            >
              {category.name}
              {selectedCategory === category.id && <ChevronRight className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-100 pb-2">Price Range</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
              className="w-full py-2 pl-5 pr-2 bg-gray-50 text-sm outline-none border border-transparent focus:border-gray-200 rounded-sm font-medium transition-colors"
            />
          </div>
          <Minus className="w-3 h-3 text-gray-300" />
          <div className="flex-1 relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 50000 }))}
              className="w-full py-2 pl-5 pr-2 bg-gray-50 text-sm outline-none border border-transparent focus:border-gray-200 rounded-sm font-medium transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={clearFilters}
        className="w-full py-3 bg-black text-white text-xs uppercase font-bold tracking-wider hover:bg-gray-800 transition-colors rounded-sm shadow-sm hover:shadow-md"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Shop | RECON AUTOBOTS</title>
      </Helmet>

      <Navbar />

      <main className="pt-20 min-h-screen bg-[#F9FAFB]">

        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm opacity-95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
          <div className="max-w-[1400px] mx-auto px-6 py-6">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-medium uppercase tracking-wide">
              <Link to="/" className="hover:text-black flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-black font-bold">Shop</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-gray-900 leading-none">THE COLLECTION</h1>
                <p className="text-sm text-gray-500 font-medium mt-2">
                  Premium gear for the modern rider.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-wider border border-gray-300 px-4 py-2.5 rounded-sm hover:border-black transition-colors"
                >
                  <Filter className="w-3 h-3" /> Filters
                </button>

                <div className="flex items-center gap-3 pl-4 h-10 border-l border-gray-200/60 ml-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest hidden sm:inline">Sort By</span>
                  <div className="relative group">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 text-xs font-bold text-gray-900 rounded-sm pl-4 pr-9 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/5 hover:border-gray-300 transition-all cursor-pointer shadow-sm uppercase tracking-wide min-w-[120px]"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 group-hover:text-black transition-colors pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28 bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100/50">
                <FilterContent />
              </div>
            </aside>

            {/* Mobile Sidebar Drawer */}
            <AnimatePresence>
              {showFilters && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setShowFilters(false)}
                    className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-y-0 right-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                        <h2 className="text-lg font-black uppercase tracking-tight">Filters</h2>
                        <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <FilterContent />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Product Grid Area */}
            <div className="flex-1">

              {/* Active Filters Chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Active:</span>

                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
                    >
                      {categories.find(c => c.id === selectedCategory)?.name} <X className="w-3 h-3" />
                    </button>
                  )}

                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
                    >
                      "{searchQuery}" <X className="w-3 h-3" />
                    </button>
                  )}

                  {(priceRange.min > 0 || priceRange.max < 50000) && (
                    <button
                      onClick={() => setPriceRange({ min: 0, max: 50000 })}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
                    >
                      Price: ₹{priceRange.min} - ₹{priceRange.max} <X className="w-3 h-3" />
                    </button>
                  )}

                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-gray-400 hover:text-black hover:underline uppercase tracking-wide ml-2"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Grid */}
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10"
              >
                <AnimatePresence>
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.handle}
                      variantId={product.variants?.[0]?.id || ''}
                      name={product.title}
                      image={product.images[0] || '/placeholder.svg'}
                      price={product.formatPrice}
                      category={product.category}
                      sizes={product.options?.find(o => /size|waist|length/i.test(o.name))?.values || []}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredAndSortedProducts.length === 0 && (
                <div className="py-32 text-center bg-white rounded-xl border border-dashed border-gray-200 shadow-sm">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No matches found</h3>
                  <p className="text-gray-500 mb-6 font-medium max-w-xs mx-auto">
                    We couldn't find any products matching your current filters.
                  </p>
                  <button onClick={clearFilters} className="text-sm font-bold bg-black text-white px-6 py-2 rounded-sm hover:bg-gray-800 transition-all">
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Products;
