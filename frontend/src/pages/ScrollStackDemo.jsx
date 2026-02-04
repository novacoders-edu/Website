import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowDown, FaMousePointer, FaCode, FaRocket, FaPalette, FaHome, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import ServiceCard from '../components/ServiceCard';
import { DataContext } from '../context/DataProvider';
import useScrollRestoration from '../hooks/useScrollRestoration';
import usePersistedState from '../hooks/usePersistedState';

const ScrollStackDemo = () => {
  const { services } = useContext(DataContext);
  
  // Use persisted state to maintain component state across route changes
  const [showInstructions, setShowInstructions] = usePersistedState(true, 'scrollStackDemo-instructions');
  const [currentCard, setCurrentCard] = usePersistedState(0, 'scrollStackDemo-currentCard');
  
  // Enable scroll restoration
  useScrollRestoration('scrollStackDemo');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#232a46] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-green-400 to-teal-600 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Header */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <FaArrowLeft className="text-lg" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                <FaCode className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Scroll Stack Demo</h1>
                <p className="text-xs text-gray-400">Interactive Service Showcase</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Card {currentCard + 1} of {services.length}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Instructions Overlay */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInstructions(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 max-w-md mx-auto border border-white/20 text-center"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaMousePointer className="text-white text-2xl" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">How to Navigate</h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <FaArrowDown className="text-cyan-400 text-sm" />
                  </div>
                  <span className="text-gray-300">Scroll down to stack cards</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <FaMousePointer className="text-purple-400 text-sm" />
                  </div>
                  <span className="text-gray-300">Click cards to interact</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <FaRocket className="text-green-400 text-sm" />
                  </div>
                  <span className="text-gray-300">Explore our services</span>
                </div>
              </div>

              <motion.button
                className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-purple-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInstructions(false)}
              >
                Got it, let's explore!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="pt-20 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30 mb-6">
              <FaPalette className="text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Interactive Demo</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Scroll Stack
              </span>
              <br />
              <span className="text-white">Experience</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our services through an immersive scrolling experience. 
              Watch as cards stack and transform as you navigate through our offerings.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-gray-400 text-sm">Scroll to begin</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center"
            >
              <motion.div
                className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ScrollStack Container */}
        <div className="relative" style={{ height: '200vh' }}>
          <ScrollStack
            className="no-scrollbar"
            itemDistance={300}
            itemScale={0.08}
            itemStackDistance={40}
            stackPosition="30%"
            baseScale={0.9}
            blurAmount={2}
            useWindowScroll={false}
          >
            {services.map((service, index) => {
              const accents = [
                'from-purple-500/20 via-indigo-500/10 to-cyan-500/20',
                'from-cyan-500/20 via-blue-500/10 to-emerald-500/20',
                'from-rose-500/20 via-orange-500/10 to-amber-500/20',
                'from-green-500/20 via-teal-500/10 to-blue-500/20',
                'from-pink-500/20 via-purple-500/10 to-indigo-500/20',
                'from-orange-500/20 via-red-500/10 to-pink-500/20',
              ];
              const accent = accents[index % accents.length];
              
              return (
                <ScrollStackItem
                  key={index}
                  itemClassName={`h-[500px] bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative overflow-hidden rounded-3xl`}
                >
                  {/* Background Gradient */}
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-80`} />
                  
                  {/* Card Number */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>

                  {/* Service Card Content */}
                  <div className="relative pointer-events-auto h-full flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                      <ServiceCard {...service} />
                    </div>
                  </div>

                  {/* Floating Elements */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/40 rounded-full"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${15 + i * 20}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Experience the power of our services firsthand. Join Nova Coders and 
              transform your ideas into reality with our expert team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FaRocket className="text-lg" />
                  <span>Explore Services</span>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <FaHome className="text-lg" />
                  <span>Join Community</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollStackDemo;
