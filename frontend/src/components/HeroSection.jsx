import React, { useMemo, Suspense, useState, useEffect } from "react";
import Button from "./ui/Button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import LazyJoinCommunityForm from "./LazyJoinCommunityForm";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Lazy-load heavier visual components to reduce initial bundle size
const Hyperspeed = React.lazy(() => 
  import("./Hyperspeed").catch(error => {
    console.error('Failed to load Hyperspeed component:', error);
    // Return a fallback component
    return { default: () => null };
  })
);
const KeyStats = React.lazy(() => import("./KeyStats"));

const HeroSection = () => {
  const [shouldLoadHyperspeed, setShouldLoadHyperspeed] = useState(false);
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleServices = () =>{
    navigate("/services")
  }

  // Detect device performance capabilities
  useEffect(() => {
    const checkPerformance = () => {
      // Simplified performance check - less restrictive
      const isLowEnd = 
        navigator.hardwareConcurrency < 2 || 
        (navigator.deviceMemory && navigator.deviceMemory < 2) ||
        (navigator.connection && navigator.connection.effectiveType === 'slow-2g');


      setIsLowPerformanceDevice(isLowEnd);

      // Load Hyperspeed after a short delay for better UX
      setTimeout(() => {
        setShouldLoadHyperspeed(true);
      }, 1000);
    };

    checkPerformance();
  }, []);

  // ✅ Reduced complexity for better performance
  const effectOptions = useMemo(
    () => ({
      onSpeedUp: () => {},
      onSlowDown: () => {},
      distortion: "turbulentDistortion",
      length: isLowPerformanceDevice ? 200 : 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 4,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: isLowPerformanceDevice ? 10 : 20,
      lightPairsPerRoadWay: isLowPerformanceDevice ? 20 : 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],
      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],
      carLightsLength: [400 * 0.03, 400 * 0.2],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.8, 0.8],
      carFloorSeparation: [0, 5],
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0xffffff,
        brokenLines: 0xffffff,
        leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
        rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
        sticks: 0x03b3c3,
      },
    }),
    [isLowPerformanceDevice]
  );

  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen bg-slate-950 overflow-hidden pt-20">
      {/* ✅ 3D Hyperspeed background - Load conditionally */}
      {shouldLoadHyperspeed && !isLowPerformanceDevice ? (
        <div id="lights" className="absolute inset-0 z-0">
          <Suspense 
            fallback={
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
              </div>
            }
          >
            <Hyperspeed effectOptions={effectOptions} />
          </Suspense>
        </div>
      ) : (
        /* Fallback gradient for low-performance devices or while loading */
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900"></div>
          {/* Loading indicator */}
          {!shouldLoadHyperspeed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse text-cyan-400/50 text-sm">Loading Background...</div>
            </div>
          )}
        </div>
      )}

      {/* ✅ Content Layer */}
      <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-3">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-medium text-cyan-300">
          Empowering Minds. Building Futures.
        </span>
      </motion.div>
      <div className="relative z-10 px-6">
        <h1 className="font-bitcount text-4xl md:text-6xl font-bold bg-gradient-to-b from-green-400 to-blue-500 bg-clip-text text-transparent leading-tight">
          Empowering the Next Generation of Innovators and Tech Leaders
        </h1>

        <p className="font-roboto mt-6 text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Nova Coders is a vibrant student-driven tech community in Aligarh
          dedicated to shaping future innovators. We empower learners to explore
          cutting-edge technologies.
        </p>

        {/* ✅ Call-to-Action Buttons */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className="justify-center"
            variant="secondary"
            onClick={() => setIsModalOpen(true)}
          >
            Join the Community <span className="text-2xl">&#8594;</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleServices}
          >
            Explore Services
          </Button>
        </div>

        {/* ✅ Key Stats Component */}
        <div className="mt-10">
          <Suspense fallback={<div className="h-24" />}>
            <KeyStats />
          </Suspense>
        </div>
      </div>

      {/* Join Community Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full bg-slate-950 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-0 right-0 z-10 m-4 p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-200 flex items-center justify-center"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Form Content */}
              <div className="w-full flex items-center justify-center p-4">
                <div className="w-full max-w-6xl">
                  <LazyJoinCommunityForm />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
