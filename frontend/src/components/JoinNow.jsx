import React, { useState } from "react";
import LazyJoinCommunityForm from "./LazyJoinCommunityForm";
import Button from "./ui/Button";
import { AnimatePresence, motion } from "framer-motion";

const JoinNow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full bg-slate-950 py-16">
      {/* Grid background pattern */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Header Section with Simple Border */}
      <div className="relative z-10 mb-12">
        <div
          className="mx-8 md:mx-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl"
          style={{ border: "3px solid #67e8f9" }}
        >
          <div className="p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Join Nova Coders?
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Be part of a vibrant community of tech enthusiasts, innovators,
              and future leaders. Fill out the form below to get started on your
              journey with us.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="flex items-center space-x-4 text-cyan-400">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                  500+ Active Members
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                  50+ Workshops
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                  24/7 Support
                </span>
              </div>
            </div>
            <Button
              variant="primary"
              className="mt-10 px-15 py-5"
              onClick={handleJoinNowClick}
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
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
                onClick={handleCloseModal}
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
              <div className="w-full  flex items-center justify-center p-4">
                <div className=" w-full max-w-6xl">
                  <LazyJoinCommunityForm />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JoinNow;
