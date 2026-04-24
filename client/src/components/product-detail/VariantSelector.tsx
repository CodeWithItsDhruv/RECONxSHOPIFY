import { ProductDTO, ProductVariant } from '@/lib/products';
import { cn } from '@/lib/utils'; // Assuming generic utility, or implement simple classnames

interface VariantSelectorProps {
    product: ProductDTO;
    selectedVariant: ProductVariant | null;
    onVariantChange: (variant: ProductVariant) => void;
}

const VariantSelector = ({ product, selectedVariant, onVariantChange }: VariantSelectorProps) => {
    // Group variants by option name (e.g., Size -> [S, M, L], Color -> [Red, Blue])
    // NOTE: This logic assumes simple single-option for now or robust matrix matching.
    // For simpler implementation given standard Shopify shapes, we often just list options.
    // Ideally, we find the variant that matches the combination of selected options.

    // Let's assume the user selects options, and we find the variant.
    // BUT for the "Architecture Plan", we often just show chips for the primary option (like Size).

    // We will iterate through product.options

    return (
        <div className="space-y-6">
            {product.options.map((option) => (
                <div key={option.name}>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                            Select {option.name}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                            // Find generic availability for this option value
                            // This is a naive check; "is there ANY variant with this size that is available?"
                            // A robust one would check based on *current* other selections.
                            // For single option products (common in gear), this is sufficient.

                            const variantForOption = product.variants.find(v =>
                                v.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
                            );

                            const isAvailable = variantForOption?.available;

                            // Check if currently selected
                            const isSelected = selectedVariant?.selectedOptions.some(
                                opt => opt.name === option.name && opt.value === value
                            );

                            return (
                                <button
                                    key={value}
                                    onClick={() => {
                                        if (variantForOption) onVariantChange(variantForOption);
                                    }}
                                    disabled={!variantForOption}
                                    className={`
                                        h-12 px-6 min-w-[3rem] text-sm font-bold border transition-all duration-200 rounded-sm
                                        ${isSelected
                                            ? 'bg-black text-white border-black'
                                            : isAvailable
                                                ? 'bg-white text-gray-900 border-gray-200 hover:border-black'
                                                : 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed decoration-slice line-through'
                                        }
                                    `}
                                >
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VariantSelector;
