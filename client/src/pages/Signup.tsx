import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      console.log("Attempting signup for:", formData.email);
      // Construct full name or just pass parts if AuthContext supports it. 
      // Our AuthContext currently splits "username" payload. 
      // Let's UPDATE AuthContext to accept firstName/lastName directly or concatenate here.
      // Better: Concatenate here to match existing signature for now, OR update AuthContext signature.
      // Update: I will update the signup call to pass a combined string if the context expects it, 
      // BUT I see I previously updated AuthContext to split the string. 
      // Let's just pass "First Last" to match that logic so I don't break the interface yet.
      // Actually, passing "First Last" is cleaner for now.

      await signup(`${formData.firstName} ${formData.lastName}`, formData.email, formData.password);

      console.log("Signup successful");
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      console.error("Signup failed:", error);
      const msg = error instanceof Error ? error.message : 'Signup failed';
      toast.error(msg);
      // Fallback alert
      alert(`Signup Failed: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | RECON AUTOBOTS</title>
      </Helmet>

      <Navbar />

      <div className="min-h-screen pt-24 pb-20 bg-white flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full px-6">

          <Link to="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-12 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
          </Link>

          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Join Us.</h1>
          <p className="text-gray-500 mb-12">Create an account to track orders and checkout faster.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">First Name</label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                  className="h-12 rounded-none border-gray-200 focus:border-black transition-colors"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Last Name</label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                  className="h-12 rounded-none border-gray-200 focus:border-black transition-colors"
                  disabled={isLoading}
                />
              </div>
            </div>

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
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                className="h-12 rounded-none border-gray-200 focus:border-black transition-colors"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Confirm Password</label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={e => setFormData(p => ({ ...p, confirmPassword: e.target.value }))}
                className="h-12 rounded-none border-gray-200 focus:border-black transition-colors"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-black text-white hover:bg-gray-900 rounded-none uppercase text-xs font-bold tracking-widest"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-gray-500 text-sm">Already a member? </span>
            <Link to="/login" className="text-sm font-bold uppercase tracking-wider text-black underline pl-2">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signup;
