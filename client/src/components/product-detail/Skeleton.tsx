import { motion } from 'framer-motion';

const Skeleton = () => {
    return (
        <div className="max-w-[1600px] mx-auto px-6 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Gallery Skeleton */}
            <div className="lg:col-span-7 space-y-4">
                <div className="aspect-square bg-gray-100 rounded-sm animate-pulse" />
                <div className="grid grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-sm animate-pulse" />
                    ))}
                </div>
            </div>

            {/* Info Skeleton */}
            <div className="lg:col-span-5 space-y-8 sticky top-24">
                <div className="space-y-4">
                    <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                    <div className="h-12 w-3/4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-8 w-32 bg-gray-100 rounded animate-pulse" />
                </div>

                <div className="space-y-4">
                    <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 w-16 bg-gray-100 rounded animate-pulse" />
                        ))}
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="h-14 w-32 bg-gray-100 rounded animate-pulse" />
                    <div className="h-14 flex-1 bg-gray-100 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
