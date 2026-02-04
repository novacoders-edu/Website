// src/components/AboutNovaCoders.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Users, Code2, Rocket, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";

const AboutNovaCoders = () => {
  // Memoized card data for performance
  const cardData = useMemo(
    () => [
      {
        icon: Users,
        title: "Community First",
        desc: "We connect passionate learners and developers to collaborate and grow together through shared knowledge and experiences.",
        color: "text-cyan-400",
        bgGradient: "from-cyan-500/20 to-blue-500/20",
        borderColor: "border-cyan-500/30",
        hoverBorder: "hover:border-cyan-400",
        glowColor: "hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]",
        stats: "500+ Members",
      },
      {
        icon: Code2,
        title: "Driven by Innovation",
        desc: "We build, learn, and innovate through hackathons, coding sessions, and real-world projects that shape the future.",
        color: "text-blue-400",
        bgGradient: "from-blue-500/20 to-indigo-500/20",
        borderColor: "border-blue-500/30",
        hoverBorder: "hover:border-blue-400",
        glowColor: "hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
        stats: "50+ Projects",
      },
      {
        icon: Rocket,
        title: "Shaping Futures",
        desc: "Our goal is to help students evolve into future-ready tech professionals and industry leaders through mentorship.",
        color: "text-indigo-400",
        bgGradient: "from-indigo-500/20 to-purple-500/20",
        borderColor: "border-indigo-500/30",
        hoverBorder: "hover:border-indigo-400",
        glowColor: "hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]",
        stats: "100+ Careers",
      },
    ],
    []
  );

  // Memoized animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
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
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50, rotateX: -15 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 0.7,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  return (
    <section className="relative py-10 px-6 md:px-12 lg:px-24 text-gray-200 overflow-hidden">
      {/*  Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/*  Header Section */}
        <div className="text-center mb-16">
        

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
          >
            About Nova Coders
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4 text-lg md:text-xl"
          >
            Nova Coders is a vibrant, student-driven tech community based in
            Aligarh, dedicated to empowering future innovators. We believe in
            collaboration, curiosity, and creation.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-base md:text-lg"
          >
            Helping learners master modern technologies through projects,
            events, and shared experiences.
          </motion.p>
        </div>

        {/* Enhanced Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-16"
          variants={containerVariants}
        >
          {cardData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className={`group relative bg-gradient-to-br ${item.bgGradient} backdrop-blur-sm border ${item.borderColor} ${item.hoverBorder} rounded-3xl p-8 text-center transition-all duration-500 ${item.glowColor} cursor-pointer`}
              >
                {/* Card Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                ></div>

                <div className="relative z-10 flex flex-col items-center space-y-6">
                  {/* Enhanced Icon */}
                  <motion.div
                    className={`relative p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 ${item.color}`}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 },
                    }}
                  >
                    <IconComponent className="w-8 h-8" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-md`}
                    ></div>
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {item.desc}
                    </p>

                    {/* Stats Badge */}
                    <motion.div
                      className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${item.bgGradient} rounded-full border ${item.borderColor} text-sm font-medium ${item.color}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full bg-current animate-pulse`}
                      ></div>
                      {item.stats}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div variants={itemVariants} className="text-center">
          <Link to="/about">
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block relative group"
            >
              <Button variant="secondary" className="relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3 text-lg font-semibold">
                  <span>Discover Our Story</span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>

                {/* Button Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutNovaCoders;
