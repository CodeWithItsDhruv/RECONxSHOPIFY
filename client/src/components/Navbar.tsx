import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Menu, X, ChevronDown, Search, ShoppingCart, User, LogOut, Settings, Shield, Package, Trash2, Minus, CheckCircle, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
/* eslint-disable @typescript-eslint/no-explicit-any */
const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount, checkout } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [productsData, setProductsData] = useState<any[]>([]);

  // Search functionality would need to fetch all products first
  // For now, we initialize empty or fetch in useEffect
  useEffect(() => {
    // Optional: Fetch products for search here
  }, []);



  const [pinCode, setPinCode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<{
    isAvailable: boolean;
    standardDays: number;
    expressDays: number;
    city: string;
    state: string;
  } | null>(null);
  const [isCheckingDelivery, setIsCheckingDelivery] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateDeliveryDays = (state: string, city: string) => {
    const PROCESSING_BUFFER = 2;
    const EXPRESS_BUFFER = 1;

    if (city.toLowerCase().includes('vadodara') || city.toLowerCase().includes('baroda')) {
      return {
        standard: 1 + PROCESSING_BUFFER,
        express: 1 + EXPRESS_BUFFER
      };
    }

    const majorCities = ['mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'pune', 'ahmedabad', 'surat'];
    const isMajorCity = majorCities.some(cityName => city.toLowerCase().includes(cityName));

    if (isMajorCity) {
      return {
        standard: 3 + PROCESSING_BUFFER,
        express: 1 + EXPRESS_BUFFER
      };
    }

    return { standard: 7, express: 3 };
  };

  const checkDeliveryAvailability = async (pinCodeValue: string) => {
    if (!pinCodeValue || pinCodeValue.length !== 6) {
      setDeliveryInfo(null);
      return;
    }
    setIsCheckingDelivery(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pinCodeValue}`);
      const result = await response.json();
      const data = Array.isArray(result) ? result[0] : result;
      const isSuccess = data.Status === 'Success' || data.status === 'Success';
      const hasPostOffice = data.PostOffice && Array.isArray(data.PostOffice) && data.PostOffice.length > 0;

      if (isSuccess && hasPostOffice) {
        const postOffice = data.PostOffice[0];
        const deliveryDays = calculateDeliveryDays(postOffice.State, postOffice.District);
        setDeliveryInfo({
          isAvailable: true,
          standardDays: deliveryDays.standard,
          expressDays: deliveryDays.express,
          city: postOffice.District,
          state: postOffice.State
        });
      } else {
        setDeliveryInfo(null);
      }
    } catch (error) {
      setDeliveryInfo(null);
    }
    setIsCheckingDelivery(false);
  };

  const handlePinCodeChange = (value: string) => {
    setPinCode(value);
    checkDeliveryAvailability(value);
  };

  const mainCategories = [
    { name: 'Helmets', path: '/products?category=helmets' },
    { name: 'Jackets', path: '/products?category=jackets' },
    { name: 'Gloves', path: '/products?category=gloves' },
    { name: 'Boots', path: '/products?category=boots' },
  ];

  const productImages: { [key: string]: string } = {};

  const searchResults = searchQuery.trim().length > 0
    ? productsData.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 6)
    : [];

  const handleSearchItemClick = (productId: string) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchOpen) {
        const target = event.target as Element;
        if (!target.closest('.search-container')) {
          setSearchOpen(false);
          setSearchQuery('');
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md border-b border-gray-200' : 'bg-white/95 backdrop-blur-md border-b border-gray-100'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-black text-black tracking-wider group-hover:text-accent transition-colors duration-300">
                RECON AUTOBOTS
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-1">
              {mainCategories.map((category) => (
                <NavLink
                  key={category.path}
                  to={category.path}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition-all duration-200 py-2 px-4 rounded-lg ${isActive ? 'text-gray-600' : 'text-gray-600 hover:text-gray-800'}`
                  }
                >
                  {category.name}
                </NavLink>
              ))}

              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown('more')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-600 hover:text-black transition-all duration-200 font-semibold text-sm py-2 px-4 rounded-lg hover:bg-gray-50">
                  <span>More</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'more' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="py-2">
                        <Link to="/products" className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 hover:text-black border-b border-gray-100">All Products</Link>
                        <Link to="/products?category=pants" className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 hover:text-black">Riding Pants</Link>
                        <Link to="/products?category=protection" className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 hover:text-black">Protective Gear</Link>
                        <Link to="/products?category=luggage" className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 hover:text-black">Luggage</Link>
                        <Link to="/products?category=accessories" className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 hover:text-black">Accessories</Link>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <Link to="/about" className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 hover:text-black">About Us</Link>
                          <Link to="/contact" className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 hover:text-black">Contact</Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-2">
              <div className="relative search-container">
                {!searchOpen ? (
                  <button onClick={() => setSearchOpen(true)} className="p-2.5 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="relative">
                    <motion.div initial={{ width: 40 }} animate={{ width: 320 }} transition={{ duration: 0.3 }} className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:border-gray-300 focus:outline-none text-sm"
                      />
                      <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </motion.div>

                    <AnimatePresence>
                      {searchQuery.trim().length > 0 && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50">
                          {searchResults.length > 0 ? (
                            <div className="py-2">
                              {searchResults.map((product) => (
                                <button key={product.id} onClick={() => handleSearchItemClick(product.handle)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                                  <img src={product.image || product.images?.[0]} alt={product.title} className="w-12 h-12 object-cover rounded border border-gray-200" />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-900 truncate">{product.title}</p>
                                    <p className="text-xs text-gray-500">{product.vendor}</p>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{product.price}</p>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="px-4 py-6 text-center">
                              <p className="text-sm text-gray-500">No products found</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="relative profile-dropdown">
                <button
                  onClick={() => {
                    if (isAuthenticated) {
                      setProfileDropdownOpen(!profileDropdownOpen);
                    } else {
                      navigate('/login');
                    }
                  }}
                  className="p-2.5 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && isAuthenticated && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user?.firstName}</p>
                            <p className='text-sm text-gray-500'>Customer</p>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-gray-700 hover:text-black font-medium">
                          <User className="w-4 h-4 mr-3 text-gray-500" />
                          My Profile
                        </Link>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button onClick={() => { logout(); setProfileDropdownOpen(false); navigate('/'); }} className="flex items-center w-full px-4 py-2.5 text-sm hover:bg-red-50 hover:text-red-600 transition-colors text-gray-700 font-medium">
                            <LogOut className="w-4 h-4 mr-3" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => setCartOpen(true)} className="p-2.5 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            <div className="flex lg:hidden items-center space-x-2">
              <button onClick={() => navigate('/products')} className="p-2.5 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setCartOpen(true)} className="p-2.5 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2.5 text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white shadow-2xl lg:hidden">
            <div className="h-full overflow-y-auto p-6 pt-24">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-black font-bold text-base mb-3">Categories</h3>
                  {mainCategories.map((category) => (
                    <Link key={category.path} to={category.path} onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors font-semibold text-base">
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <h3 className="text-black font-bold text-base mb-3">More</h3>
                  <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors font-medium text-sm">All Products</Link>
                  <Link to="/products?category=pants" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors font-medium text-sm">Riding Pants</Link>
                  <Link to="/products?category=protection" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors font-medium text-sm">Protective Gear</Link>
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg font-semibold text-base transition-colors">About Us</Link>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg font-semibold text-base transition-colors">Contact</Link>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 px-2 py-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
                        <div>
                          <p className="text-gray-900 font-semibold">{user?.firstName}</p>
                          <p className="text-gray-500 text-sm">Customer</p>
                        </div>
                      </div>
                      <button onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }} className="flex items-center w-full px-4 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
                        <LogOut className="w-4 h-4 mr-3" /> Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button onClick={() => { setMobileMenuOpen(false); navigate('/login'); }} className="flex items-center w-full px-4 py-2.5 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors font-medium">
                        <User className="w-4 h-4 mr-3 text-gray-500" /> Sign In
                      </button>
                      <button onClick={() => { setMobileMenuOpen(false); navigate('/signup'); }} className="flex items-center w-full px-4 py-2.5 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors font-medium">
                        <User className="w-4 h-4 mr-3 text-gray-500" /> Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-gray-100/50 shadow-[0_0_50px_rgba(0,0,0,0.1)]">
          <SheetHeader className="px-8 py-6 border-b border-gray-50">
            <SheetTitle className="text-2xl font-black text-left uppercase tracking-tight flex items-end justify-between">
              <span>Bag</span>
              <span className="text-sm font-bold text-gray-400 normal-case mb-1.5">{cartCount} items</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 mb-6 rounded-full bg-gray-50 flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your bag is empty</h3>
                <p className="text-gray-500 mb-8 max-w-[240px] mx-auto leading-relaxed">Looks like you haven't added any gear to your cart yet.</p>
                <Button onClick={() => { setCartOpen(false); navigate('/products'); }} className="min-w-[200px] bg-black text-white hover:bg-gray-800 rounded-none uppercase tracking-widest text-xs font-bold h-12 transition-all hover:px-8">
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-10">
                {cartItems.map((item) => {
                  const uniqueKey = `${item.id}-${item.size || 'no-size'}`;
                  return (
                    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key={uniqueKey} className="flex gap-6 group">
                      <div className="relative w-28 aspect-[3/4] bg-gray-50 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900 text-sm leading-relaxed pr-8">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-black transition-colors -mt-1 -mr-2 p-2"><X className="w-4 h-4" /></button>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.category || 'Gear'}</p>
                            {item.size && (<div className="text-xs font-medium text-gray-500">Size: <span className="text-gray-900 font-bold">{item.size}</span></div>)}
                          </div>
                        </div>
                        <div className="flex items-end justify-between mt-4">
                          <div className="flex items-center border border-gray-200 h-9 w-28 bg-white">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-9 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500 hover:text-black"><Minus className="w-3 h-3" /></button>
                            <span className="flex-1 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500 hover:text-black"><Plus className="w-3 h-3" /></button>
                          </div>
                          <div className="text-right"><p className="text-sm font-black text-gray-900">{item.price}</p></div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="text-gray-400 text-xs">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-xl font-black mt-6 pt-6 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  className="w-full bg-black text-white hover:bg-gray-800 h-14 rounded-none uppercase tracking-widest text-xs font-bold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl hover:shadow-2xl"
                  onClick={() => {
                    setCartOpen(false);
                    checkout(); // Use Shopify checkout redirect
                  }}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navbar;
