import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | RECON AUTOBOTS</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-20 bg-white text-black">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Privacy Policy.</h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-16">Last Updated: January 2025</p>

          <div className="space-y-12 text-lg text-gray-600 leading-relaxed font-medium">
            <section>
              <h2 className="text-black text-xl font-black uppercase tracking-tight mb-4">1. Collection</h2>
              <p className="mb-4">We collect information you fulfill: name, address, payment details, and riding preferences. We also collect automated data like IP addresses to secure our platform.</p>
            </section>

            <section>
              <h2 className="text-black text-xl font-black uppercase tracking-tight mb-4">2. Usage</h2>
              <p className="mb-4">Your data fuels your experience. We use it to process orders (obviously), but more importantly, to tailor our gear recommendations to your riding style.</p>
              <p>We do not sell your data. Period. We are in the business of selling premium gear, not personal information.</p>
            </section>

            <section>
              <h2 className="text-black text-xl font-black uppercase tracking-tight mb-4">3. Security</h2>
              <p className="mb-4">We use 256-bit SSL encryption for all transactions. Our payment processors (Razorpay/Stripe) are PCI-DSS compliant. Your credit card numbers never touch our servers.</p>
            </section>

            <section>
              <h2 className="text-black text-xl font-black uppercase tracking-tight mb-4">4. Cookies</h2>
              <p className="mb-4">We use cookies to keep your cart active and remember your preferences. You can disable them, but our site won't work as smoothly.</p>
            </section>

            <section>
              <h2 className="text-black text-xl font-black uppercase tracking-tight mb-4">5. Contact</h2>
              <p className="mb-4">Questions about your data? Email us directly at <a href="mailto:privacy@reconautobots.com" className="text-black underline decoration-2 underline-offset-4">privacy@reconautobots.com</a>.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
