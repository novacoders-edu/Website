import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaRocket, FaUsers, FaBrain } from "react-icons/fa";
import Signup from "../components/Signup";
import Signin from "../components/SignIn";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const features = [
  {
    icon: FaUsers,
    text: "500+ Active Members",
    color: "from-cyan-500/20 to-blue-600/20",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: FaRocket,
    text: "Real-world Projects",
    color: "from-purple-500/20 to-pink-600/20",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/30",
  },
  {
    icon: FaBrain,
    text: "Expert Mentorship",
    color: "from-green-500/20 to-teal-600/20",
    iconColor: "text-green-400",
    borderColor: "border-green-500/30",
  },
];

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Animated Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>
      
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4   bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Main Container */}
      <motion.div
        className="w-full max-w-6xl bg-gray-800/20 backdrop-blur-2xl rounded-3xl sm:rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.3)] border border-white/20 overflow-hidden relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row min-h-[650px]">
          {/* Left Side - Welcome Section */}
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 p-6 sm:p-8 lg:p-10 xl:p-16 flex flex-col justify-center relative bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-500/10 border-r border-white/20 backdrop-blur-sm"
          >
              {/* Logo/Brand */}
              <motion.div
                className="flex items-center gap-3 mb-4 sm:mb-5"
                variants={itemVariants}
              >
                <motion.div
                  className=""
                >
                 
                </motion.div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Nova Coders
                </h1>
              </motion.div>

              {/* Main Heading */}
              <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  {isSignUp ? "Join Our" : "Welcome to"}{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {isSignUp ? "Community" : "Nova Coders"}
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                  {isSignUp
                    ? "Start your journey with Nova Coders and become part of a thriving tech community focused on innovation and growth."
                    : "Sign in to access your account and continue your journey with our amazing tech community."}
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                variants={itemVariants}
                className="space-y-3 sm:space-y-4"
              >
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={`feature-${index}`}
                      className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/30 cursor-pointer group transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ x: 10, scale: 1.02, transition: { duration: 0.3 } }}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + 0.4, type: "spring", stiffness: 100 }}
                    >
                      <motion.div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center ${feature.borderColor} border-2 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 shadow-lg`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <IconComponent
                          className={`${feature.iconColor} text-lg sm:text-xl`}
                        />
                      </motion.div>
                      <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors duration-300 font-semibold">
                        {feature.text}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <div className="lg:w-1/2 relative overflow-hidden bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              key={isSignUp ? "signup" : "signin"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {isSignUp ? <Signup /> : <Signin />}
            </motion.div>

            {/* Toggle Button */}
            <motion.div
              variants={itemVariants}
              className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 px-6 z-20"
            >
              <p className="text-gray-400 text-sm font-medium">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </p>
              <motion.button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-all duration-300 text-base relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{isSignUp ? "Sign In" : "Sign Up"}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
};

export default AuthPage;
