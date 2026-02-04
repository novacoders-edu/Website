import React from "react";
import { motion } from "framer-motion";

const RegistrationBadges = () => {
  // Registration data - easily expandable for future registrations
  const registrations = [
    {
      id: "msme",
      name: "MSME Registered",
      description: "Micro, Small & Medium Enterprises",
      logo: "MSME-Logo.png", // You'll need to add the MSME logo to public folder
      certificateNumber: "UDYAM-UP-02-0086383", // Replace with actual certificate number
      registrationDate: "2024",
      status: "Active",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-500/10 to-emerald-600/10",
      borderColor: "border-green-400/30",
      hoverBorder: "hover:border-green-400/60"
    },
    // Future registrations can be added here
    // {
    //   id: "iso",
    //   name: "ISO Certified",
    //   description: "International Organization for Standardization",
    //   logo: "/public/iso-logo.png",
    //   certificateNumber: "ISO-XXXX-XXXX",
    //   registrationDate: "2024",
    //   status: "Active",
    //   color: "from-blue-500 to-cyan-600",
    //   bgColor: "from-blue-500/10 to-cyan-600/10",
    //   borderColor: "border-blue-400/30",
    //   hoverBorder: "hover:border-blue-400/60"
    // }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 px-6 md:px-10 lg:px-20">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
              Official Registrations
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nova Coders is officially registered and recognized by government authorities, 
            ensuring credibility and trust in our services.
          </p>
        </motion.div>

        {/* Registration Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {registrations.map((registration) => (
            <motion.div
              key={registration.id}
              className={`bg-gradient-to-br ${registration.bgColor} backdrop-blur-sm rounded-2xl p-8 border ${registration.borderColor} ${registration.hoverBorder} transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] group relative overflow-hidden`}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
              </div>

              <div className="relative z-10">
                {/* Logo and Status */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                    {/* Placeholder for logo - replace with actual logo */}
                    <img 
                      src={registration.logo} 
                      alt={`${registration.name} Logo`}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        // Fallback if logo doesn't exist
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div 
                      className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center text-2xl font-bold text-white hidden"
                    >
                      {registration.name.charAt(0)}
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${registration.color} text-white text-sm font-semibold`}>
                    {registration.status}
                  </div>
                </div>

                {/* Registration Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {registration.name}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {registration.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Certificate No:</span>
                      <span className="text-white font-mono text-sm">
                        {registration.certificateNumber}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Registered:</span>
                      <span className="text-white font-semibold text-sm">
                        {registration.registrationDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-semibold">
                      Verified & Active
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Why Official Registration Matters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-blue-400 text-lg">🛡️</span>
                </div>
                <h4 className="text-white font-semibold">Credibility</h4>
                <p className="text-gray-300 text-sm">
                  Official recognition ensures trust and reliability in our services.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-green-400 text-lg">⚖️</span>
                </div>
                <h4 className="text-white font-semibold">Legal Compliance</h4>
                <p className="text-gray-300 text-sm">
                  We operate within legal frameworks and industry standards.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-purple-400 text-lg">🎯</span>
                </div>
                <h4 className="text-white font-semibold">Quality Assurance</h4>
                <p className="text-gray-300 text-sm">
                  Registered entities maintain higher quality and service standards.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RegistrationBadges;