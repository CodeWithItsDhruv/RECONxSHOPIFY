import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductDTO } from '@/lib/products';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TabsProps {
    product: ProductDTO;
}

const Tabs = ({ product }: TabsProps) => {
    const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

    const tabs = [
        { id: 'desc', label: 'Description' },
        { id: 'specs', label: 'Specifications' },
        { id: 'reviews', label: 'Reviews' }
    ] as const;

    return (
        <div className="mt-24 mb-20 max-w-[1600px] mx-auto px-6">

            {/* Header */}
            <div className="flex border-b border-gray-200 mb-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-8 py-4 text-sm font-bold uppercase tracking-widest relative transition-colors ${activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-black'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'desc' && (
                        <motion.div
                            key="desc"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-3xl"
                        >
                            <h3 className="font-black uppercase text-xl mb-6 tracking-wide">Product DNA</h3>
                            <div
                                className="prose prose-sm max-w-none text-gray-500 leading-loose mb-8 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>strong]:text-black"
                                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                            />
                        </motion.div>
                    )}

                    {activeTab === 'specs' && (
                        <motion.div
                            key="specs"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-3xl"
                        >
                            <h3 className="font-black uppercase text-xl mb-6 tracking-wide">Technical Specs</h3>
                            <div className="divide-y divide-gray-100">
                                {[
                                    { label: 'Brand', value: product.vendor },
                                    { label: 'Category', value: product.category },
                                    { label: 'SKU', value: product.handle } // Mocking SKU
                                ].map((spec, i) => (
                                    <div key={i} className="flex justify-between py-4 text-sm">
                                        <span className="font-bold text-gray-500 uppercase tracking-wider">{spec.label}</span>
                                        <span className="font-bold text-gray-900 text-right">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'reviews' && (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Customer Reviews</h2>
                                    <div className="flex items-center gap-3">
                                        <div className="flex text-black">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 fill-black" />)}
                                        </div>
                                        <span className="text-lg font-bold">4.8</span>
                                        <span className="text-gray-400">Based on 12 reviews</span>
                                    </div>
                                </div>
                                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white uppercase text-xs font-bold tracking-widest rounded-none h-12 px-8">
                                    Write Review
                                </Button>
                            </div>

                            {/* Static Mock Reviews */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-gray-50 p-8">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex text-black">
                                                <Star className="w-3 h-3 fill-black" /><Star className="w-3 h-3 fill-black" /><Star className="w-3 h-3 fill-black" /><Star className="w-3 h-3 fill-black" /><Star className="w-3 h-3 fill-black" />
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">2 days ago</span>
                                        </div>
                                        <h4 className="font-bold text-sm uppercase tracking-wide mb-2">Verified Customer</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6">"Absolutely fantastic quality. Fits perfectly and looks even better in person."</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Tabs;
