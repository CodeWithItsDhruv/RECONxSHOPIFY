import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trophy, Target, Heart, Users, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const milestones = [
    { year: '2018', title: 'The Starting Line', description: 'RECON AUTOBOTS launched with a single passion: serving the riding community with gear that matters.' },
    { year: '2021', title: 'Digital Evolution', description: 'Launched our flagship e-commerce platform, bringing premium gear to riders nationwide.' },
    { year: '2023', title: 'Community First', description: 'Served over 10,000 satisfied riders, building a reputation for trust and excellence.' },
    { year: '2025', title: 'Future Vision', description: 'Setting new standards in safety and style, partnering with global leaders in protection.' },
  ];

  const values = [
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'We enable perfection. Every helmet and jacket is curated for peak performance.'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Data-driven selection ensures you get exactly what your ride demands.'
    },
    {
      icon: Heart,
      title: 'Obsession',
      description: 'We don’t just ride. We live for the machine and the open road.'
    },
    {
      icon: Users,
      title: 'Brotherhood',
      description: 'Supporting the global rider community with every sale and every mile.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About | RECON AUTOBOTS</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-20 bg-white text-black">

        {/* Hero Section */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center z-10 relative">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-6"
            >
              Since 2018
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8"
            >
              Built for <br /> the obsessed.
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="w-24 h-1 bg-black mx-auto mb-10"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              RECON AUTOBOTS exists for one reason: to equip riders with the absolute best. We don't deal in compromises. We deal in protection, style, and speed.
            </motion.p>
          </div>

          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 skew-x-12 opacity-50 translate-x-20"></div>
        </section>

        {/* Values Grid */}
        <section className="py-24 border-t border-gray-100 bg-gray-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {values.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wide mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Stats / Timeline */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16">
              {/* Left Static */}
              <div className="md:w-1/3">
                <h2 className="text-3xl font-black uppercase tracking-tight sticky top-32">Our <br />Journey</h2>
              </div>

              {/* Right Timeline */}
              <div className="md:w-2/3 border-l border-gray-200 pl-8 md:pl-16 space-y-20">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <span className="absolute -left-[41px] md:-left-[73px] top-0 w-3 h-3 bg-black rounded-full ring-4 ring-white"></span>
                    <span className="text-5xl font-black text-gray-100 absolute -top-10 -left-4 -z-10 select-none">{m.year}</span>
                    <h3 className="text-xl font-black uppercase tracking-wide mb-2 pt-2">{m.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{m.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default About;
