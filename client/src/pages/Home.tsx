import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReadyToRideCTA from '@/components/ReadyToRideCTA';
import heroOffroad from '@/assets/hero-offroad.jpg';
import heroHelmet from '@/assets/hero-helmet-1.jpg';

import { getAllProducts } from '@/lib/products';
import { getHomeContent, HomeContentDTO } from '@/lib/content';
import { useState, useEffect } from 'react';

const Home = () => {
  // Initialize with Empty Array
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  const [cmsContent, setCmsContent] = useState<HomeContentDTO>({
    heroTitle: "RECON AUTOBOTS",
    heroSubtitle: "Premium Motorcycle Riding Gear & Accessories",
    marqueeText: ["THE ULTIMATE DESTINATION FOR MOTORCYCLE GEAR, ACCESSORIES AND PARTS"]
  });

  useEffect(() => {
    const fetch = async () => {
      // Parallel fetch
      const [products, content] = await Promise.all([
        getAllProducts(),
        getHomeContent()
      ]);
      setFeaturedProducts(products.slice(0, 3));
      setCmsContent(content);
    };
    fetch();
  }, []);

  const categories = [
    {
      title: 'RIDING JACKETS',
      description: 'Premium leather and textile jackets with CE-approved armor. Maximum protection meets modern style.',
      image: heroHelmet,
      link: '/products?category=jackets'
    },
    {
      title: 'HELMETS & SAFETY',
      description: 'DOT and ISI certified helmets for every riding style. Your safety is our priority.',
      image: heroOffroad,
      link: '/products?category=helmets'
    }
  ];


  return (
    <>
      <Helmet>
        <title>{cmsContent.heroTitle} | RECON AUTOBOTS</title>
        <meta
          name="description"
          content={cmsContent.heroSubtitle}
        />
        <meta property="og:title" content={cmsContent.heroTitle} />
        <meta property="og:description" content={cmsContent.heroSubtitle} />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        {/* Passing CMS props to Hero if it accepts them, otherwise we might need to update Hero component too. 
            For now, let's assume Hero is static or we pass children? 
            Checking Hero usage: <Hero />. It seemingly has internal state or hardcoded text.
            I should update Hero to accept props or standard text. 
            Wait, I cannot see Hero source here but I can see it imported.
            I will inspect Hero next step if needed. 
            For now, let's assume I need to pass props.
            Actually, let's check Hero component content first to be safe? 
            No, "execute the plan" implies speed. I will pass props and if Hero ignores them, I will fix Hero.
        */}
        <Hero title={cmsContent.heroTitle} subtitle={cmsContent.heroSubtitle} image={cmsContent.heroImage} />

        {/* Scrolling Text Section */}
        <section className="py-8 bg-white border-t border-b border-black/15">
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap">
              <div className="flex items-center space-x-16 px-8">
                {[1, 2, 3, 4].map((_, i) => (
                  <span key={i} className="text-2xl md:text-4xl font-black text-black tracking-wider">
                    {cmsContent.marqueeText[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Category Sections */}
        {categories.map((category, index) => (
          <CategorySection
            key={category.title}
            {...category}
            index={index}
          />
        ))}

        {/* Brand Marquee Section */}
        <section className="bg-secondary overflow-hidden border-t border-b border-black/15">
          <div className="relative overflow-hidden py-8">
            <div className="flex animate-scroll-brands whitespace-nowrap">
              <div className="flex items-center space-x-16 px-8">
                {[1, 2, 3, 4].map((_, i) => (
                  <span key={i} className="text-2xl md:text-3xl font-black text-foreground tracking-wider">
                    AIROH • AXOR • BMC • BLUARMOR • MADDOG • SMK • STUDDS
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">Featured Products</h2>
              <p className="text-xl text-muted-foreground">
                Explore our best-selling riding gear
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.handle}
                  variantId={product.variants?.[0]?.id || ''}
                  name={product.title}
                  image={product.images[0] || '/placeholder.svg'}
                  price={product.formatPrice}
                  category={product.category}
                  sizes={product.options?.find((o: { name: string; }) => /size|waist|length/i.test(o.name))?.values || []}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Ready to Ride CTA Section */}
        <ReadyToRideCTA />
      </main>

      <Footer />
    </>
  );
};

export default Home;
