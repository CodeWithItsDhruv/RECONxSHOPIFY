import { Button } from '@/components/ui/button';

interface StickyBarProps {
    price: number | undefined;
    isAvailable: boolean;
    onAddToCart: () => void;
    adding: boolean;
}

const StickyBar = ({ price, isAvailable, onAddToCart, adding }: StickyBarProps) => {
    return (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50 flex gap-4 items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Total</span>
                <span className="text-xl font-black text-gray-900">
                    {price ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price) : '-'}
                </span>
            </div>

            <Button
                onClick={onAddToCart}
                disabled={!isAvailable || adding}
                className={`flex-1 h-12 bg-black text-white hover:bg-gray-800 rounded-sm text-sm font-bold uppercase tracking-widest ${!isAvailable ? 'opacity-50 cursor-not-allowed bg-gray-300 transform-none' : ''
                    }`}
            >
                {adding ? 'Adding...' : !isAvailable ? 'Out of Stock' : 'Add to Cart'}
            </Button>
        </div>
    );
};

export default StickyBar;
