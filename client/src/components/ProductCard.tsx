import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
interface ProductCardProps {
  id: string;
  variantId: string;
  name: string;
  image: string;
  price: string;
  category: string;
  sizes?: string[]; // Made dynamic
}

const ProductCard = ({ id, variantId, name, image, price, category, sizes = [] }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  // Helper function to parse price string to number
  const parsePrice = (priceString: string): number => {
    if (!priceString) return 0;
    return parseInt(priceString.replace(/[^0-9]/g, '') || '0');
  };

  const handleQuickAdd = () => {
    if (sizes.length > 0) {
      setShowSizeModal(true);
    } else {
      // If no sizes, add directly
      if (variantId) {
        addToCart(variantId, 1);
      }
    }
  };

  const handleAddWithSize = () => {
    if (selectedSize) {
      // Ideally we match size to variant ID here.
      // For now, using the main variantId as placeholder or if single variant.
      if (variantId) {
        addToCart(variantId, 1);
      }
      setShowSizeModal(false);
      setSelectedSize('');
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 mb-4 rounded-sm">
        <Link to={`/product/${id}`} className="block w-full h-auto relative">
          <img
            src={image}
            alt={name}
            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Hover Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm flex gap-2 pointer-events-none group-hover:pointer-events-auto">
          <Button
            className="flex-1 bg-black text-white hover:bg-gray-800 h-9 text-xs uppercase tracking-wider rounded-sm"
            onClick={handleQuickAdd}
          >
            Add to Cart
          </Button>
          <Link to={`/product/${id}`} className="flex-none">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-sm border-gray-200">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-left">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          {category}
        </p>
        <Link to={`/product/${id}`}>
          <h3 className="font-bold text-sm text-gray-900 mb-1 leading-tight group-hover:text-gray-600 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm font-semibold text-gray-900">{price}</p>
      </div>

      {/* Quick Add Size Modal */}
      <Dialog open={showSizeModal} onOpenChange={setShowSizeModal}>
        <DialogContent className="sm:max-w-md bg-white border-none shadow-2xl rounded-none">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold uppercase tracking-wide">Select Size</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={image}
                alt={name}
                className="w-20 h-24 object-cover bg-gray-50"
              />
              <div>
                <h4 className="font-bold text-sm text-gray-900 mb-1">{name}</h4>
                <p className="text-sm font-medium text-gray-500">{price}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">Available Sizes</p>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-1 border transition-all text-sm font-medium ${selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 text-gray-600 hover:border-black'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white h-10 uppercase tracking-wide rounded-none text-xs font-bold"
                disabled={!selectedSize}
                onClick={handleAddWithSize}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ProductCard;
