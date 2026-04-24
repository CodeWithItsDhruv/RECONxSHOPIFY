import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const from = (location.state as any)?.from?.pathname || '/';
      const safeFrom = from === '/login' ? '/profile' : from;
      navigate(safeFrom, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      console.log("Attempting login with:", formData.email);
      await login(formData.email, formData.password);
      console.log("Login successful - Waiting for auth state update...");
      toast.success('Welcome back');
      // Navigation handled by useEffect
    } catch (error) {
      console.error("Login failed:", error);
      const msg = error instanceof Error ? error.message : 'Invalid credentials';
      toast.error(msg);
      alert(`Login Failed: ${msg}`);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | RECON AUTOBOTS</title>
      </Helmet>

      <Navbar />

      <div className="min-h-screen pt-24 pb-20 bg-white flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full px-6">

          <Link to="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-12 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
          </Link>

          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Sign In</h1>
          <p className="text-gray-500 mb-12">Enter your details to access your account.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
              <Input
                type="email"
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                className="h-12 rounded-none border-gray-200 focus:border-black transition-colors"
                placeholder="name@example.com"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
                <Link to="/forgot-password" className="text-xs font-bold uppercase tracking-wider text-black underline">Forgot?</Link>
              </div>
              <Input
                type="password"
                value={formData.password}
                onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                className="h-12 rounded-none border-gray-200 focus:border-black transition-colors"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-black text-white hover:bg-gray-900 rounded-none uppercase text-xs font-bold tracking-widest"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm mb-4">Don't have an account?</p>
            <Link to="/signup">
              <Button variant="outline" className="w-full h-12 rounded-none border-black text-black hover:bg-black hover:text-white uppercase text-xs font-bold tracking-widest">
                Create Account <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
