import React, { useContext, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { DataContext } from "../context/DataProvider";
import { FaCode, FaCalendarAlt } from "react-icons/fa";

// Lazy load components for better performance
const ProjectCard = React.lazy(() => import("../components/ProjectCard"));
const EventCard = React.lazy(() => import("../components/EventCard"));
const ContactFormSection = React.lazy(() =>
  import("../components/ContactFormSection")
);
const AnimatedBackground = React.lazy(() =>
  import("../components/AnimatedBackground")
);

const Portfolio = () => {
  const { events, projects } = useContext(DataContext);

  // Memoized projects from context
  const memoizedProjects = useMemo(() => projects || [], [projects]);

  // Animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
        },
      },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#232a46]">
      {/* Hero Section - Inspired by the provided design */}
      <div className="relative overflow-hidden w-full min-h-[60vh] bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#232a46]">
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#232a46] animate-pulse" />
          }
        >
          <AnimatedBackground />
        </Suspense>

        {/* Hero Content */}
        <section className="relative z-20 px-6 md:px-10 lg:px-20 py-16 md:py-24">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Portfolio Header with Icon */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              variants={itemVariants}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-2xl border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(34, 211, 238, 0.6)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.3)",
                    "0 0 30px rgba(34, 211, 238, 0.5)",
                    "0 0 20px rgba(34, 211, 238, 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: { duration: 0.3 },
                }}
              >
                <FaCode className="text-2xl text-cyan-400" />
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                variants={itemVariants}
              >
                Portfolio
              </motion.h1>
            </motion.div>

            {/* Subtitle with animated underline */}
            <motion.div className="mb-5" variants={itemVariants}>
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-400 mb-4 relative inline-block">
                A Glimpse Into Our Digital Journey
                <motion.div
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div className="max-w-4xl" variants={itemVariants}>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-5">
                Nova Coders' portfolio highlights diverse projects that reflect
                our expertise, creativity, and commitment to delivering
                impactful digital solutions.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              className="flex flex-wrap gap-6 mt-5"
              variants={itemVariants}
            >
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-cyan-400/30 rounded-2xl px-6 py-4 flex items-center gap-4"
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(34, 211, 238, 0.6)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <FaCode className="text-3xl text-cyan-400" />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {memoizedProjects.length}
                  </div>
                  <div className="text-sm text-gray-400">
                    Projects Completed
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-blue-400/30 rounded-2xl px-6 py-4 flex items-center gap-4"
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(59, 130, 246, 0.6)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaCalendarAlt className="text-3xl text-blue-400" />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {events?.length || 0}
                  </div>
                  <div className="text-sm text-gray-400">Events Organized</div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-2xl px-6 py-4 flex items-center gap-4"
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(147, 51, 234, 0.6)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    y: [-2, 2, -2],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-3xl">🚀</div>
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-400">Community Members</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-20 right-20 w-2 h-2 bg-cyan-400 rounded-full opacity-60"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 left-20 w-3 h-3 bg-blue-400 rounded-full opacity-40"
              animate={{
                y: [-10, 10, -10],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </section>
      </div>

      {/* Projects Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-slate-900/50 via-blue-900/20 to-purple-900/30 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our diverse range of innovative projects spanning web
              development, mobile applications, AI/ML solutions, and blockchain
              technology
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {memoizedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Suspense
                  fallback={
                    <div className="bg-white/5 rounded-2xl p-6 animate-pulse">
                      <div className="w-full h-48 bg-gray-600 rounded mb-4"></div>
                      <div className="h-6 bg-gray-600 rounded mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded mb-4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-600 rounded-full"></div>
                        <div className="h-6 w-16 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                  }
                >
                  <ProjectCard {...project} />
                </Suspense>
              </motion.div>
            ))}
          </motion.div>

          {/* Show message if no projects */}
          {memoizedProjects.length === 0 && (
            <motion.div className="text-center py-16" variants={itemVariants}>
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Projects Coming Soon
              </h3>
              <p className="text-gray-400">
                We're working on exciting new projects. Stay tuned!
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Events Section */}
      {events && events.length > 0 && (
        <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-gray-900/50 via-slate-800/30 to-gray-900/50 relative">
          {/* Background Pattern for Events */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400 to-teal-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-3xl"></div>
          </div>

          <motion.div
            className="max-w-7xl mx-auto relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div id ="events" className=" text-center mb-12" variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-4">
                Recent{" "}
                <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                  Events
                </span>
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Stay updated with our latest hackathons, workshops, and
                community events
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {events.slice(0, 6).map((event, index) => (
                <motion.div
                  key={event.id || index}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <Suspense
                    fallback={
                      <div className="bg-white/5 rounded-2xl p-6 animate-pulse">
                        <div className="w-full h-48 bg-gray-600 rounded mb-4"></div>
                        <div className="h-6 bg-gray-600 rounded mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded"></div>
                      </div>
                    }
                  >
                    <EventCard {...event} />
                  </Suspense>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Contact Form Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-900/30 relative">
        {/* Background Pattern for Contact */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-56 h-56 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <Suspense
              fallback={
                <div className="flex justify-center items-center ">
                  <div className="animate-spin rounded-full border-b-2 border-cyan-400"></div>
                </div>
              }
            >
              <ContactFormSection />
            </Suspense>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Portfolio;
