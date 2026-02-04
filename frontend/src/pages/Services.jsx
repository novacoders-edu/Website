import React, { useContext, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DataContext } from "../context/DataProvider";
import ServiceCard from "../components/ServiceCard";
import EventCard from "../components/EventCard";
import Button from "../components/ui/Button";
import { HashLink } from "react-router-hash-link";



// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const startCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(startCount);
      }
    };
    requestAnimationFrame(startCount);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const Services = () => {
  const { services, events, whyChooseUs } = useContext(DataContext);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const parallaxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#232a46]">
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-20 pb-16 px-6 md:px-10 lg:px-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400/20 to-teal-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative z-10 max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y }}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold">
              Our{" "}
              <motion.span 
                className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Services
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            variants={itemVariants}
          >
            Comprehensive tech solutions and learning opportunities designed to
            accelerate your journey in the world of technology and innovation.
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
          >
            <motion.div
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                <AnimatedCounter end={500} />+
              </div>
              <div className="text-gray-300">Projects Delivered</div>
            </motion.div>
            <motion.div
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                <AnimatedCounter end={1000} />+
              </div>
              <div className="text-gray-300">Happy Clients</div>
            </motion.div>
            <motion.div
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                <AnimatedCounter end={50} />+
              </div>
              <div className="text-gray-300">Expert Team</div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                className="text-lg px-8 py-4"
                onClick={() =>
                  window.scrollTo({
                    top:
                      document.getElementById("services-section").offsetTop - 100,
                    behavior: "smooth",
                  })
                }
              >
                Explore Services 🚀
              </Button>
            </motion.div>
            <HashLink 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              to={"/portfolio#events"}
            >
              <Button
                variant="outline"
                className="text-lg px-8 py-4"
                
              
              >
                View Events
              </Button>
            </HashLink>
          </motion.div>
        </motion.div>
      </section>

      {/* Service Cards Section */}
      <section id="services-section" className="py-16 px-6 md:px-10 lg:px-20 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h2 
              className="text-4xl font-bold mb-4"
              whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
              transition={{ duration: 0.6 }}
            >
              What We{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Offer
              </span>
            </motion.h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Cutting-edge solutions and comprehensive training programs
              tailored for modern developers
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="perspective-1000"
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

  
      {/* Why Choose Us Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Nova Coders?
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We combine innovation, community, and real-world experience to
              deliver exceptional results
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] text-center group"
                variants={parallaxVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

  
      {/* How We Work Process Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              How We{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Work
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our proven process ensures successful project delivery every time
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "We understand your requirements, goals, and challenges through detailed consultation.",
                  icon: "🔍"
                },
                {
                  step: "02", 
                  title: "Planning",
                  description: "Create a comprehensive roadmap with timelines, milestones, and deliverables.",
                  icon: "📋"
                },
                {
                  step: "03",
                  title: "Development",
                  description: "Execute the plan with agile methodology, regular updates, and quality assurance.",
                  icon: "⚡"
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  description: "Deploy your solution and provide ongoing support to ensure continued success.",
                  icon: "🚀"
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] mb-4">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {process.icon}
                    </div>
                    <div className="text-2xl font-bold text-cyan-400 mb-2">
                      {process.step}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {process.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {process.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

    {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-10 lg:px-20 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart Inc.",
                content: "Nova Coders transformed our development process. Their expertise and dedication helped us launch our product 3 months ahead of schedule.",
                rating: 5,
                avatar: "👩‍💼"
              },
              {
                name: "Michael Chen",
                role: "CTO, InnovateLab",
                content: "The training programs are exceptional. Our team's productivity increased by 40% after completing their advanced React course.",
                rating: 5,
                avatar: "👨‍💻"
              },
              {
                name: "Emily Rodriguez",
                role: "Founder, DataFlow",
                content: "Outstanding support and cutting-edge solutions. They helped us scale from startup to enterprise level seamlessly.",
                rating: 5,
                avatar: "👩‍🔬"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>


          {/* Events/Workshops Section */}
      {/* <section id="events-section" className="py-16 px-6 md:px-10 lg:px-20">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
                Events
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join our workshops, hackathons, and tech talks to enhance your
              skills and network with industry experts
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {events.slice(0, 6).map((event, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  rotateX: 5,
                  transition: { duration: 0.3 },
                }}
                className="perspective-1000"
              >
                <EventCard {...event} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-12" variants={itemVariants}>
            <Button
              variant="outline"
              className="text-lg px-8 py-4"
              onClick={() => alert("View All Events clicked!")}
            >
              View All Events
            </Button>
          </motion.div>
        </motion.div>
      </section> */}



    </div>
  );
};

export default Services;
