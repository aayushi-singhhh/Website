import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building, MessageSquare, Twitter, Instagram, Linkedin } from 'lucide-react';
import GridBackground from './GridBackground';

const FormInput = ({ icon: Icon, ...props }) => (
  <div className="relative w-full">
    <div className="absolute top-1/2 left-4 -translate-y-1/2 text-yellow-400/50">
      <Icon size={20} />
    </div>
    <input
      {...props}
      className="w-full bg-black/30 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all duration-300"
    />
  </div>
);

const SponsorPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center relative overflow-hidden py-20 px-4">
      <GridBackground />
      
      <motion.div
        className="relative z-10 w-full max-w-6xl bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-yellow-900/10"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Information */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 p-8 md:p-12 rounded-l-2xl flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500">
              Sponsor Us
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Want to connect your Web3 company with top tech talent? Sponsor Assetmerkle IGDTUW to gain high-visibility placement in our campus events and Twitter Spaces. We've collaborated with industry names like Web3 Samaj and Capex. Partner with us to support innovation and elevate your brand in the Web3 ecosystem.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <FormInput icon={User} type="text" placeholder="Name" required />
              <FormInput icon={Mail} type="email" placeholder="Email" required />
              <FormInput icon={Phone} type="tel" placeholder="Phone No." />
              <FormInput icon={Building} type="text" placeholder="Organisation / Company" />
              
              <div className="relative w-full">
                <div className="absolute top-4 left-4 text-yellow-400/50 pointer-events-none">
                  <MessageSquare size={20} />
                </div>
                <textarea
                  placeholder="Your expectations for our collaboration"
                  rows="4"
                  className="w-full bg-black/30 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all duration-300"
                ></textarea>
              </div>

              <FormInput icon={Twitter} type="text" placeholder="Twitter Profile URL" />
              <FormInput icon={Instagram} type="text" placeholder="Instagram Profile URL" />
              <FormInput icon={Linkedin} type="text" placeholder="LinkedIn Profile URL" />

              <button
                type="submit"
                className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg font-semibold text-lg text-black hover:scale-105 active:scale-100 transition-transform duration-300 shadow-lg shadow-yellow-500/20"
              >
                Submit Sponsor Request
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SponsorPage;