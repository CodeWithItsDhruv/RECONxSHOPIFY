import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, ArrowRight, Instagram, Facebook, Globe } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact | RECON AUTOBOTS</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Left: Info (Sticky) */}
            <div className="lg:h-[calc(100vh-100px)] lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
              >
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-12">
                  Get in<br />Touch.
                </h1>

                <div className="space-y-12 max-w-sm">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Visit Us</h3>
                    <p className="text-sm font-bold leading-tight">
                      RECON AUTOBOTS<br />
                      SHOP NO. 1 GROUND FLOOR, MISHRI HOUSE<br />
                      Akota - Mujmahuda Rd, opposite THE KING OF DETAILING<br />
                      Sheetal Nagar, Akota, Vadodara, Gujarat 390007
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Contact</h3>
                    <div className="space-y-2">
                      <a href="mailto:support@reconautobots.com" className="block text-xl font-medium hover:text-gray-600 transition-colors">support@reconautobots.com</a>
                      <a href="tel:+919510701911" className="block text-xl font-medium hover:text-gray-600 transition-colors">095107 01911</a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Follow</h3>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                        <Facebook className="w-4 h-4" />
                      </div>
                      <div className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                        <Globe className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Form */}
            <div className="lg:pt-20">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-gray-50/50 p-8 md:p-12 border border-gray-100"
              >
                <h2 className="text-2xl font-black uppercase tracking-wide mb-8">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white border-gray-200 h-12 rounded-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white border-gray-200 h-12 rounded-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-white border-gray-200 h-12 rounded-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-white border-gray-200 rounded-none focus:border-black transition-colors resize-none p-4"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-black text-white hover:bg-gray-900 rounded-none uppercase text-xs font-bold tracking-widest transition-all"
                  >
                    Send Message <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
