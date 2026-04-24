import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductDTO } from '@/lib/products';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface GalleryProps {
    images: string[];
    title: string;
}

const Gallery = ({ images, title }: GalleryProps) => {
    const [activeImage, setActiveImage] = useState(images[0]);
    // Filter duplicates
    const uniqueImages = Array.from(new Set(images));

    // Ensure active image is valid
    if (!uniqueImages.includes(activeImage) && uniqueImages.length > 0) {
        setActiveImage(uniqueImages[0]);
    }

    const showControls = uniqueImages.length > 1;

    const handlePrev = () => {
        const currentIndex = uniqueImages.indexOf(activeImage);
        const prevIndex = currentIndex === 0 ? uniqueImages.length - 1 : currentIndex - 1;
        setActiveImage(uniqueImages[prevIndex]);
    };

    const handleNext = () => {
        const currentIndex = uniqueImages.indexOf(activeImage);
        const nextIndex = currentIndex === uniqueImages.length - 1 ? 0 : currentIndex + 1;
        setActiveImage(uniqueImages[nextIndex]);
    };

    // Zoom Logic
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
    };

    return (
        <div className="w-full lg:sticky top-0">
            <div className="flex flex-col gap-4">
                <div className="bg-white shadow-sm p-2 relative">
                    <div
                        className="relative w-full aspect-[11/8] overflow-hidden cursor-crosshair"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImage}
                                src={activeImage}
                                alt={title}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: isHovering ? 2 : 1,
                                    originX: `${mousePosition.x}%`,
                                    originY: `${mousePosition.y}%`
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
                                className="w-full h-full object-contain object-top absolute inset-0 pointer-events-none"
                            />
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controlls */}
                    {showControls && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md transition-colors border border-gray-100"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md transition-colors border border-gray-100"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </>
                    )}
                </div>
                <div className="bg-white shadow-sm p-2 w-full max-w-full overflow-auto">
                    <div className="flex justify-start flex-row gap-4 shrink-0">
                        {uniqueImages.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${title} ${idx}`}
                                onClick={() => setActiveImage(img)}
                                className={`w-16 h-16 aspect-square object-contain object-top cursor-pointer shadow-md border-b-2 ${activeImage === img ? 'border-black' : 'border-transparent'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
