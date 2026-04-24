import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ForgotPassword = () => {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email');
            return;
        }

        setIsLoading(true);
        try {
            await resetPassword(email);
            setIsSent(true);
            toast.success('Recovery email sent');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to send email');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Forgot Password | RECON AUTOBOTS</title>
            </Helmet>

            <Navbar />

            <div className="min-h-screen pt-24 pb-20 bg-white flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full px-6">

                    <Link to="/login" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-12 hover:text-black transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                    </Link>

                    {isSent ? (
                        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Check your inbox.</h1>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                We've sent a password recovery link to <span className="text-black font-bold">{email}</span>.
                            </p>
                            <Button
                                onClick={() => setIsSent(false)}
                                variant="outline"
                                className="h-12 border-gray-200 hover:border-black uppercase text-xs font-bold tracking-widest px-8"
                            >
                                Try another email
                            </Button>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Recover Access.</h1>
                            <p className="text-gray-500 mb-12">Enter the email associated with your account.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="h-12 rounded-none border-gray-200 focus:border-black transition-colors"
                                        placeholder="name@example.com"
                                        disabled={isLoading}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-black text-white hover:bg-gray-900 rounded-none uppercase text-xs font-bold tracking-widest"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Recovery Link'}
                                </Button>
                            </form>
                        </>
                    )}

                </div>
            </div>

            <Footer />
        </>
    );
};

export default ForgotPassword;
