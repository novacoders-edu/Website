import React, { useContext, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { DataContext } from "../context/DataProvider";
import Button from "../components/ui/Button";

// Lazy load heavy components for better performance
const Ballpit = React.lazy(() => import("../components/Ballpit"));
const MissionVision = React.lazy(() => import("../components/MissionVision"));
const TeamCard = React.lazy(() => import("../components/TeamCard"));
const RegistrationBadges = React.lazy(() =>
  import("../components/RegistrationBadges")
);

const About = () => {
  const { team, timeline } = useContext(DataContext);

  // Memoized animation variants for performance
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

  // Memoized team data to prevent unnecessary re-renders
  const memoizedTeam = useMemo(() => team, [team]);
  const memoizedTimeline = useMemo(() => timeline, [timeline]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#232a46]">
      <div className="relative overflow-hidden w-full min-h-[90vh] md:min-h-[90vh] max-h-[700px]">
        {/* Lazy-loaded Ballpit Background Animation */}
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#232a46] animate-pulse" />
          }
        >
          <Ballpit
            count={80} // Reduced count for better performance
            gravity={0.01}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={false}
            colors={["#3B82F6", "#60A5FA", "#93C5FD", "#1E40AF"]}
            ambientColor={0xffffff}
            ambientIntensity={1}
            lightIntensity={200}
            minSize={0.5}
            maxSize={1.2}
            size0={1}
            maxVelocity={0.15}
            maxX={5}
            maxY={5}
            maxZ={2}
          />
        </Suspense>

        {/* Overlay: About Us Content */}
        <section className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-br from-[#030712]/20 via-[#0c1329]/50 to-[#232a46]/20">
          <motion.div
            className="relative z-10 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                About Us
              </span>
            </motion.h1>

            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 text-gray-300 font-semibold"
              variants={itemVariants}
            >
              Who We Are &{" "}
              <span className="text-blue-400 font-semibold">What We Do</span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-100 max-w-full sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              <strong>Nova Coders</strong> is a community of learners and
              innovators empowering students to become{" "}
              <span className="text-blue-400 font-semibold">
                industry-ready professionals
              </span>
              . We organize hackathons, tech seminars, and internships to
              explore technologies like{" "}
              <span className="text-blue-400 font-semibold">
                AI, Web Development, Blockchain, and Cybersecurity
              </span>{" "}
              through hands-on projects and mentorship.
            </motion.p>
          </motion.div>
        </section>
      </div>
      {/* Mission & Vision Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
          }
        >
          <MissionVision />
        </Suspense>
      </section>

      {/* Clean Timeline Section */}
      <section className=" px-6 md:px-10 lg:px-20">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Simple Timeline Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From a small group of passionate developers to a thriving
              community of innovators
            </p>
          </motion.div>

          {/* Modern Timeline Layout */}
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full opacity-30"></div>

            <div className="space-y-16">
              {memoizedTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Timeline Content */}
                  <div className="w-5/12">
                    <motion.div
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] group"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </span>
                        <span className="text-cyan-400 font-bold text-xl">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-2/12 flex justify-center">
                    <motion.div
                      className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-gray-900 shadow-[0_0_20px_rgba(34,211,238,0.6)] z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      whileHover={{ scale: 1.3 }}
                    />
                  </div>

                  {/* Empty Space for Alternating Layout */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Optimized Team Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The passionate individuals behind Nova Coders, driving innovation
              and community growth
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {memoizedTeam.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <Suspense
                  fallback={
                    <div className="bg-white/5 rounded-2xl p-6 animate-pulse">
                      <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-4"></div>
                      <div className="h-4 bg-gray-600 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded"></div>
                    </div>
                  }
                >
                  <TeamCard {...member} />
                </Suspense>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Registration Badges Section */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>
        }
      >
        <RegistrationBadges />
      </Suspense>
    </div>
  );
};

export default About;
