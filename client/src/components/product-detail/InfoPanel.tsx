import { useState } from 'react';
import DOMPurify from 'dompurify';
import { ProductDTO, ProductVariant } from '@/lib/products';
import { Star, Shield, Truck, Minus, Plus } from 'lucide-react';
import VariantSelector from './VariantSelector';
import { Button } from '@/components/ui/button';

interface InfoPanelProps {
    descriptionHtml: string;
    product: ProductDTO;
    selectedVariant: ProductVariant | null;
    onVariantChange: (v: ProductVariant) => void;
    qty: number;
    setQty: (q: number) => void;
    onAddToCart: () => void;
    adding: boolean;
}

const InfoPanel = ({
    descriptionHtml,
    product,
    selectedVariant,
    onVariantChange,
    qty,
    setQty,
    onAddToCart,
    adding
}: InfoPanelProps) => {

    // Fallbacks
    const price = selectedVariant?.price || product.price;
    const compareAt = selectedVariant?.compareAtPrice || product.compareAtPrice;
    const isAvailable = selectedVariant?.available ?? true;

    // Calculate generic discount percentage
    const discount = compareAt && price
        ? Math.round(((compareAt - price) / compareAt) * 100)
        : 0;

    // Pincode Logic
    const [pincode, setPincode] = useState('');
    const [checkStatus, setCheckStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleCheckPincode = () => {
        if (!pincode || pincode.length !== 6) {
            setCheckStatus('unavailable');
            setStatusMessage('Please enter a valid 6-digit pincode.');
            return;
        }

        setCheckStatus('checking');
        setStatusMessage('Checking availability...');

        // Simulate API check
        setTimeout(() => {
            // Mock: All pincodes starting with '1' are available, others unavailable
            // Or just make it random/always true for demo. Let's make it always true for now.
            setCheckStatus('available');
            setStatusMessage(`Delivery available to ${pincode}, delivers by ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}.`);
        }, 1000);
    };

    return (
        <div className="w-full">
            <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">{product.title}</h3>
                <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                        <span className="text-base text-slate-500">4.8</span>
                        {[1, 2, 3, 4].map(i => (
                            <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                        ))}
                        <Star className="w-3.5 h-3.5 fill-[#CED5D8] text-[#CED5D8]" />
                    </div>
                    <span className="text-slate-500">|</span>
                    <p className="text-sm text-slate-500">76 Ratings</p>
                    <span className="text-slate-500">|</span>
                    <p className="text-sm text-slate-500">50 Reviews</p>
                </div>

                <div className="mt-4">
                    <div
                        className="text-slate-500 mt-1 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(descriptionHtml) }}
                    />
                </div>

                <div className="flex items-center flex-wrap gap-2 mt-6">
                    {compareAt && <p className="text-slate-500 text-base"><s>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(compareAt)}</s></p>}
                    <h4 className="text-gray-900 text-2xl sm:text-3xl font-semibold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price)}</h4>
                    {discount > 0 && (
                        <div className="flex py-1 px-2 bg-black font-semibold !ml-4">
                            <span className="text-white text-sm">save {discount}%</span>
                        </div>
                    )}
                </div>

                <div>
                    <h4 className="text-base mt-4 text-slate-500 font-semibold">Net Wt: 100G</h4>
                </div>
            </div>

            <hr className="my-6 border-gray-300" />

            <div>
                {/* Variants */}
                <VariantSelector
                    product={product}
                    selectedVariant={selectedVariant}
                    onVariantChange={onVariantChange}
                />

                <div className="flex gap-4 items-center border border-gray-300 bg-white px-4 py-2.5 w-max mt-4">
                    <button
                        type="button"
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        disabled={!isAvailable}
                        className="border-0 outline-0 cursor-pointer disabled:opacity-50"
                    >
                        <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="text-slate-900 text-sm font-semibold px-6 block">{qty}</span>
                    <button
                        type="button"
                        onClick={() => setQty(Math.min(10, qty + 1))}
                        disabled={!isAvailable}
                        className="border-0 outline-0 cursor-pointer disabled:opacity-50"
                    >
                        <Plus className="w-2.5 h-2.5" />
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                    <Button
                        onClick={onAddToCart}
                        disabled={!isAvailable || adding}
                        className="px-4 py-3 w-[45%] h-auto cursor-pointer border border-gray-300 bg-white hover:bg-slate-50 text-slate-900 text-sm font-medium rounded-none shadow-none uppercase disabled:bg-gray-100"
                    >
                        {adding ? 'Adding...' : !isAvailable ? 'Out of Stock' : 'Add to cart'}
                    </Button>
                    <Button
                        onClick={() => onAddToCart()}
                        disabled={!isAvailable || adding}
                        className="px-4 py-3 w-[45%] h-auto cursor-pointer border border-black bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-none shadow-none uppercase disabled:bg-gray-300"
                    >
                        Buy it now
                    </Button>
                </div>
            </div>

            <hr className="my-6 border-gray-300" />

            <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Select Delivery Location</h3>
                <p className="text-slate-500 text-sm mt-2">Enter the pincode of your area to check product availability.</p>
                <div className="flex flex-col gap-2 mt-6 max-w-sm">
                    <div className="flex items-center gap-2">
                        <input
                            type='number'
                            placeholder='Enter pincode'
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCheckPincode()}
                            className="bg-white px-4 py-2.5 text-sm w-full border border-gray-300 outline-0"
                        />
                        <button
                            type='button'
                            onClick={handleCheckPincode}
                            disabled={checkStatus === 'checking'}
                            className="border border-black outline-0 bg-black hover:bg-gray-800 text-white cursor-pointer px-4 py-2.5 text-sm disabled:opacity-70 whitespace-nowrap"
                        >
                            {checkStatus === 'checking' ? 'Checking...' : 'Apply'}
                        </button>
                    </div>
                    {/* Status Message */}
                    {statusMessage && (
                        <p className={`text-xs ${checkStatus === 'available' ? 'text-green-600' : checkStatus === 'unavailable' ? 'text-red-500' : 'text-gray-500'}`}>
                            {statusMessage}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-between gap-4 mt-8">
                <div className="text-center">
                    <Truck className="w-8 h-8 text-gray-900 inline mx-auto stroke-1" />
                    <p className="text-slate-500 text-xs sm:text-sm mt-3">COD available</p>
                </div>
                <div className="text-center">
                    <Shield className="w-8 h-8 text-gray-900 inline mx-auto stroke-1" />
                    <p className="text-slate-500 text-xs sm:text-sm mt-3">15-Day Return Policy</p>
                </div>
                <div className="text-center">
                    <Truck className="w-8 h-8 text-gray-900 inline mx-auto stroke-1" />
                    <p className="text-slate-500 text-xs sm:text-sm mt-3">Free Delivery {'>'} $100</p>
                </div>
            </div>

        </div>
    );
};

export default InfoPanel;
