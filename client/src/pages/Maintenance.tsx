import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const Maintenance = () => {
  return (
    <>
      <Helmet>
        <title>Maintenance | RECON AUTOBOTS</title>
      </Helmet>

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] mb-8 text-sm animate-pulse">System Upgrade In Progress</p>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            We'll be<br />back soon.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-lg mx-auto">
            We are currently updating our systems to bring you a better experience.
            Please check back in a few hours.
          </p>

          <a href="mailto:support@reconautobots.com">
            <Button variant="outline" className="h-14 px-10 border-white text-white hover:bg-white hover:text-black rounded-none uppercase text-xs font-bold tracking-widest bg-transparent transition-colors">
              <Mail className="w-4 h-4 mr-2" /> Contact Support
            </Button>
          </a>
        </div>

        <div className="absolute bottom-12 text-gray-600 text-xs font-bold uppercase tracking-widest">
          &copy; 2025 RECON AUTOBOTS
        </div>
      </div>
    </>
  );
};

export default Maintenance;
