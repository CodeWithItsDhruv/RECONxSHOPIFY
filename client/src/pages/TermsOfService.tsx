import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | RECON AUTOBOTS</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-20 bg-white text-black">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Terms of Service.</h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-16">Last Updated: January 2025</p>

          <div className="space-y-12 text-lg text-gray-600 leading-relaxed font-medium">
            <section>
              <h2 className="text-black text-xl font-black uppercase tracking-tight mb-4">1. Acceptance</h2>
              <p className="mb-4">By engaging with RECON AUTOBOTS, you agree to these terms. If you do not agree, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-black text-xl font-black uppercase tracking-tight mb-4">2. Products</h2>
              <p className="mb-4">We strive for extreme accuracy in our descriptions. However, we cannot guarantee that every photo perfectly matches the real-world texture or color due to screen variations.</p>
              <p>All safety gear is sold as-is. While we only stock certified products, proper usage is your responsibility.</p>
            </section>

            <section>
              <h2 className="text-black text-xl font-black uppercase tracking-tight mb-4">3. Payments & Orders</h2>
              <p className="mb-4">We reserve the right to refuse service to anyone. Orders may be cancelled for suspected fraud or stock discrepancies. In such cases, a full refund is immediate.</p>
            </section>

            <section>
              <h2 className="text-black text-xl font-black uppercase tracking-tight mb-4">4. Liability</h2>
              <p className="mb-4">Motorcycling is inherently dangerous. RECON AUTOBOTS is not liable for injuries or accidents that occur while using our products. Ride responsibly and always wear full gear.</p>
            </section>

            <section>
              <h2 className="text-black text-xl font-black uppercase tracking-tight mb-4">5. Jurisdiction</h2>
              <p className="mb-4">These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts in Mumbai.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsOfService;
