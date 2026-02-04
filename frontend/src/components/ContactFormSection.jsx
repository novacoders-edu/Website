import { DataContext } from "../context/DataProvider";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import { contactAPI } from "../utils/api";

const ContactFormSection = () => {
  const { social } = useContext(DataContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Initialize useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      url: "",
      message: "",
    },
  });

  // Define the submission logic
  const onSubmit = async (data) => {
    setSubmitError(null);

    try {
      const result = await contactAPI.create(data);
      
      if (result.success) {
        setIsSuccess(true);
        reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.error('Contact form submission failed:', result.error);
        setSubmitError(result.error?.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError('Network error. Please check your connection and try again.');
    }
  };

  // Helper component for error messages
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return <p className="text-red-400 text-sm mt-1">{error.message}</p>;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h2 className="text-4xl font-bold mb-4">
          Let's{" "}
          <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
            Collaborate
          </span>
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Have a project idea or want to join our community? Get in touch with
          us and let's build something amazing together
        </p>
      </motion.div>

      {/* Success Message */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center"
        >
          <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
          <p className="text-green-400 font-semibold">
            Message sent successfully! We'll get back to you soon.
          </p>
        </motion.div>
      )}

      {/* Error Message */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-center"
        >
          <FaExclamationTriangle className="text-red-400 text-2xl mx-auto mb-2" />
          <p className="text-red-400 font-semibold">
            {submitError}
          </p>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 rounded-2xl p-6 md:p-10 shadow-lg backdrop-blur-lg">
        {/* Left: Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={itemVariants}
          className="flex-1 flex flex-col gap-4 bg-gray-700/15 shadow-gray-900 shadow-5xl rounded-xl p-6 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.005] transition-all duration-300 border border-white/10"
        >
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-2">Get In Touch</h3>
            <p className="text-gray-400">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <label className="text-white font-bold">
                Name<span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required." })}
                className="mt-1 w-full rounded-md bg-transparent border border-cyan-500 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                placeholder="Enter your name"
                disabled={isSubmitting}
              />
              <ErrorMessage error={errors.name} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="text-white font-bold">
                Phone<span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                {...register("phone", {
                  required: "Phone is required.",
                  pattern: {
                    value: /^[0-9+() -]*$/,
                    message: "Invalid phone number format.",
                  },
                })}
                className="mt-1 w-full rounded-md bg-transparent border border-cyan-500 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                placeholder="Enter your phone number"
                disabled={isSubmitting}
              />
              <ErrorMessage error={errors.phone} />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <label className="text-white font-bold">
                Email<span className="text-cyan-400">*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address.",
                  },
                })}
                className="mt-1 w-full rounded-md bg-transparent border border-cyan-500 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
              <ErrorMessage error={errors.email} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="text-white font-bold">
                URL
                <span className="text-gray-400 font-normal text-xs">
                  (Optional)
                </span>
              </label>
              <input
                type="url"
                {...register("url")}
                className="mt-1 w-full rounded-md bg-transparent border border-cyan-500 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                placeholder="Enter website URL"
                disabled={isSubmitting}
              />
            </motion.div>
          </div>
          <motion.div variants={itemVariants}>
            <label className="text-white font-bold">
              Message
              <span className="text-gray-400 font-normal text-xs">
                (Optional)
              </span>
            </label>
            <textarea
              rows={4}
              {...register("message")}
              className="mt-1 w-full rounded-md bg-transparent border border-cyan-500 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 resize-none"
              placeholder="Tell us about your project or how we can help you..."
              disabled={isSubmitting}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              className="justify-center w-full relative"
              variant="secondary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <span className="text-2xl ml-2">&#8594;</span>
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Right: Info */}
        <motion.div
          variants={itemVariants}
          className="flex-1 bg-gray-700/15 shadow-gray-900 shadow-5xl rounded-xl p-6 flex flex-col justify-between backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.005] transition-all duration-300 border border-white/10"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>
            <p className="text-gray-400 mb-6">
              Ready to turn your ideas into reality? We're here to help you
              every step of the way.
            </p>

            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <FaMapMarkerAlt className="text-amber-400 bg-transparent border border-cyan-400 rounded-lg text-4xl p-2 flex-shrink-0" />
                <span className="text-white">
                  Aligarh, Uttar Pradesh,{" "}
                  <span className="text-cyan-400">India</span>
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <FaEnvelope className="text-amber-400 bg-transparent border border-cyan-400 rounded-lg text-4xl p-2 flex-shrink-0" />
                <Link
                  to="mailto:novacoder007@gmail.com"
                  className="text-amber-400 hover:underline break-all"
                >
                  novacoder007@gmail.com
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <FaPhoneAlt className="text-amber-400 bg-transparent border border-cyan-400 rounded-lg text-4xl p-2 flex-shrink-0" />
                <Link
                  to="tel:+916397973513"
                  className="text-amber-400 hover:underline"
                >
                  +91 6397973513
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="mt-8">
            <div className="text-white mb-4 font-semibold">Connect With Us</div>
            <div className="flex gap-3">
              {social.map(({ icon: Icon, url }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent border border-cyan-400 rounded-lg p-3 text-white hover:bg-cyan-400 hover:text-black transition-all duration-200 block"
                  >
                    <Icon className="text-lg" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
              <p className="text-sm text-gray-300">
                <span className="text-cyan-400 font-semibold">
                  Quick Response:
                </span>{" "}
                We typically respond within 24 hours during business days.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactFormSection;
