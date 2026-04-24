import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Loader2, Package, LogOut, User as UserIcon, MapPin, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>My Account | RECON AUTOBOTS</title>
            </Helmet>

            <Navbar />

            <main className="min-h-screen pt-24 pb-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar / User Info */}
                        <aside className="w-full md:w-1/4">
                            <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg sticky top-24">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white">
                                        <span className="text-2xl font-bold">{user.firstName?.[0]}{user.lastName?.[0]}</span>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    <button className="flex items-center w-full px-4 py-3 bg-black text-white rounded-md text-sm font-medium transition-colors">
                                        <UserIcon className="w-4 h-4 mr-3" />
                                        Overview
                                    </button>
                                    <button className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors">
                                        <MapPin className="w-4 h-4 mr-3" />
                                        Addresses (Managed in Checkout)
                                    </button>
                                    <button
                                        onClick={() => { logout(); navigate('/'); }}
                                        className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition-colors mt-8"
                                    >
                                        <LogOut className="w-4 h-4 mr-3" />
                                        Sign Out
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content / Orders */}
                        <div className="flex-1">
                            <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg">
                                <h1 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center">
                                    <ShoppingBag className="w-6 h-6 mr-3" />
                                    Order History
                                </h1>

                                {user.orders && user.orders.length > 0 ? (
                                    <div className="space-y-6">
                                        {user.orders.map((order) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                key={order.id}
                                                className="border border-gray-200 rounded-lg overflow-hidden group hover:border-black transition-colors"
                                            >
                                                <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 group-hover:bg-gray-100 transition-colors">
                                                    <div className="flex gap-8">
                                                        <div>
                                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Order Placed</p>
                                                            <p className="text-sm font-semibold text-gray-900">{new Date(order.processedAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total</p>
                                                            <p className="text-sm font-semibold text-gray-900">{order.totalPrice} {order.currency}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Order #</p>
                                                            <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.fulfillmentStatus === 'FULFILLED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {order.fulfillmentStatus}
                                                        </div>
                                                        <Button variant="outline" size="sm" className="h-8 text-xs font-bold bg-white">
                                                            View Invoice
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="p-6">
                                                    <div className="space-y-4">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="flex items-center gap-4">
                                                                {item.image ? (
                                                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded bg-gray-100" />
                                                                ) : (
                                                                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                                                                        <Package className="w-6 h-6 text-gray-300" />
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
                                        <p className="text-gray-500 mb-8">When you place an order, it will appear here.</p>
                                        <Button onClick={() => navigate('/products')} className="bg-black text-white hover:bg-gray-800">
                                            Start Shopping
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Profile;
