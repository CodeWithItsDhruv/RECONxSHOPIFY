import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 | RECON AUTOBOTS</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-20 bg-white flex items-center justify-center text-center">
        <div className="px-6">
          <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-black opacity-10 select-none">
            404
          </h1>
          <div className="-mt-12 md:-mt-20 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Page Not Found</h2>
            <p className="text-gray-500 text-lg mb-12 max-w-lg mx-auto">
              The page you are looking for has been moved or deleted.
            </p>
            <Link to="/">
              <Button className="h-14 px-10 bg-black text-white hover:bg-gray-800 rounded-none uppercase text-xs font-bold tracking-widest">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default NotFound;
