import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

// Data & Components
import { getProductByHandle, ProductDTO, ProductVariant } from '@/lib/products';
import Skeleton from '@/components/product-detail/Skeleton';
import Gallery from '@/components/product-detail/Gallery';
import InfoPanel from '@/components/product-detail/InfoPanel';
import StickyBar from '@/components/product-detail/StickyBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductDetail = () => {
    const { handle } = useParams();
    const { addToCart } = useCart();

    // State Machine
    const [product, setProduct] = useState<ProductDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);

    // Fetch Logic
    useEffect(() => {
        const fetchProduct = async () => {
            if (!handle) return;
            setLoading(true);
            try {
                const data = await getProductByHandle(handle);
                if (data) {
                    setProduct(data);

                    // Auto-select logic: Find first available or just first
                    const firstAvailable = data.variants.find(v => v.available) || data.variants[0];
                    setSelectedVariant(firstAvailable);
                } else {
                    toast.error("Product not found");
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [handle]);

    // Cart Logic
    const handleAddToCart = async () => {
        if (!selectedVariant || !selectedVariant.available) {
            toast.error("Please select an available option");
            return;
        }

        setAdding(true);
        try {
            await addToCart(selectedVariant.id, qty);
            toast.success("Added to cart");
        } catch (err) {
            toast.error("Failed to add to cart");
        } finally {
            setAdding(false);
        }
    };

    if (loading || !product) return <Skeleton />;

    return (
        <>
            <Helmet>
                <title>{product.title} | RECON AUTOBOTS</title>
                <meta name="description" content={product.descriptionHtml.substring(0, 160)} />
            </Helmet>

            <Navbar />

            <main className="pt-24 pb-20 bg-white min-h-screen">

                {/* Breadcrumbs */}
                <div className="max-w-[1600px] mx-auto px-6 mb-8">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <Link to="/" className="hover:text-black transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to="/products" className="hover:text-black transition-colors">Shop</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-black">{product.title}</span>
                    </div>
                </div>

                {/* Main Grid: Desktop 60/40 */}
                <div className="max-w-[1600px] mx-auto px-6">
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 xl:gap-24 relative">

                        {/* LEFT: Gallery (Col 7) */}
                        <div className="lg:col-span-7">
                            <Gallery images={product.images} title={product.title} />
                        </div>

                        {/* RIGHT: Info (Col 5) */}
                        <div className="lg:col-span-5">
                            <InfoPanel
                                product={product}
                                descriptionHtml={product.descriptionHtml}
                                selectedVariant={selectedVariant}
                                onVariantChange={setSelectedVariant}
                                qty={qty}
                                setQty={setQty}
                                onAddToCart={handleAddToCart}
                                adding={adding}
                            />
                        </div>

                    </div>
                </div>



                {/* Mobile Sticky Bar */}
                <StickyBar
                    price={selectedVariant?.price}
                    isAvailable={selectedVariant?.available ?? false}
                    onAddToCart={handleAddToCart}
                    adding={adding}
                />

            </main>

            <Footer />
        </>
    );
};

export default ProductDetail;
