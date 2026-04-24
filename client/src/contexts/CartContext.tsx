import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getCart, addToCart as shopifyAddToCart, updateLineItem, removeLineItem, goToCheckout, initCart } from '@/lib/cart';
import { toast } from 'sonner';

export interface CartItem {
  id: string; // This will be the line item ID in Shopify
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  category?: string;
  handle?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  checkout: () => void;
  cartTotal: number;
  cartCount: number;
  isLoading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        await initCart();
        const cart = await getCart();
        if (cart) {
          normalizeAndSetCart(cart);
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Use useCallback to prevent infinite loops if dependencies change
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizeAndSetCart = useCallback((cart: any) => {
    if (!cart || !cart.lineItems) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = cart.lineItems.map((item: any) => ({
      id: item.id,
      variantId: item.variant?.id,
      name: item.title,
      price: parseFloat(item.variant?.price?.amount || '0'),
      quantity: item.quantity,
      image: item.variant?.image?.src || '',
      size: item.variant?.title === 'Default Title' ? '' : item.variant?.title,
      handle: item.variant?.product?.handle
    }));

    setCartItems(items);
  }, []);

  const addToCart = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      const cart = await shopifyAddToCart(variantId, quantity);
      normalizeAndSetCart(cart);
      toast.success('Added to cart');
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineItemId: string) => {
    setIsLoading(true);
    try {
      const cart = await removeLineItem(lineItemId);
      normalizeAndSetCart(cart);
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setIsLoading(true);
    try {
      const cart = await updateLineItem(lineItemId, quantity);
      normalizeAndSetCart(cart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    // We don't really 'clear' in Shopify easily without removing all items one by one or making a new checkout.
    // Ideally we just make a new checkout token? Or just empty state for now.
    // For now, let's just empty the state, but technically the checkout persists on Shopify side until expiry.
    setCartItems([]);
  };

  const checkout = async () => {
    setIsLoading(true);
    try {
      await goToCheckout();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to redirect to checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        cartTotal,
        cartCount,
        isLoading,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
