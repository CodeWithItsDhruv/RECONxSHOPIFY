import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Shield, Truck, CreditCard, RotateCcw, Headphones, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqCategories = [
    {
      title: 'Product & Safety',
      questions: [
        {
          question: 'Are your helmets DOT and ISI certified?',
          answer: 'Yes. Every helmet we stock meets or exceeds DOT and ISI strict safety standards. Certification labels are permanently affixed to the back of each helmet.'
        },
        {
          question: 'What materials are used in your riding jackets?',
          answer: 'We rigorously select jackets using genuine high-grade leather or abrasion-resistant Cordura. Protectors are always CE Level 1 or 2 certified.'
        },
        {
          question: 'How do I choose the right helmet size?',
          answer: 'Measure your head circumference one inch above your eyebrows. Consult the specific size chart on the product page, as fit varies by brand.'
        },
        {
          question: 'Warranty Coverage?',
          answer: 'All products carry a minimum 2-year manufacturer warranty against defects. Premium technical gear often extends this coverage.'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      questions: [
        {
          question: 'How fast will I get my gear?',
          answer: 'Standard shipping is 3-5 business days across India. Major metros often see delivery in 2 days. Express options are available at checkout.'
        },
        {
          question: 'Is shipping free?',
          answer: 'We offer complimentary standard shipping on all orders over ₹5,000. Below that, a flat rate applies based on your region.'
        },
        {
          question: 'International Sourcing?',
          answer: 'We ship primarily within India, but we can arrange international shipments for specific high-value items upon request.'
        }
      ]
    },
    {
      title: 'Returns & Support',
      questions: [
        {
          question: 'What is the return policy?',
          answer: 'We accept returns on unused items with tags attached within 30 days. Helmets must be completely unworn (beyond sizing check) for safety reasons.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Log into your account and select the order. If you checked out as a guest, use the "Contact" page to request a return authorization.'
        },
        {
          question: 'Refund Timing?',
          answer: 'Once we receive and inspect the gear (typically 2 days after arrival), refunds are processed instantly to your original payment method.'
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ | RECON AUTOBOTS</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-20 bg-white text-black">

        {/* Header */}
        <section className="px-6 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
            >
              Common<br />Questions.
            </motion.h1>
            <p className="text-gray-500 text-lg">Everything you need to know about our gear and service.</p>
          </div>
        </section>

        {/* FAQ Sections */}
        <div className="max-w-3xl mx-auto px-6 space-y-20">
          {faqCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8 border-b border-gray-100 pb-4">{cat.title}</h2>
              <Accordion type="single" collapsible className="space-y-0">
                {cat.questions.map((q, j) => (
                  <AccordionItem key={j} value={`${i}-${j}`} className="border-b border-gray-100 last:border-0">
                    <AccordionTrigger className="text-lg font-bold hover:text-gray-600 transition-colors uppercase py-6 hover:no-underline text-left">
                      {q.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 leading-relaxed pb-8 text-base">
                      {q.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="max-w-3xl mx-auto px-6 mt-24 pt-12 border-t border-gray-100 text-center">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Still need help?</h3>
          <p className="text-gray-500 mb-8">Our support team is available Mon-Sat, 10am - 7pm IST.</p>
          <Link to="/contact">
            <button className="bg-black text-white h-12 px-8 uppercase text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors">
              Contact Support
            </button>
          </Link>
        </div>

      </main>

      <Footer />
    </>
  );
};

export default FAQ;
