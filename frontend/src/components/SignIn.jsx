import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, CheckCircle, XCircle, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userActions";
import { clearError } from "../store/authSlice";
import Button from "./ui/Button";
import InputField from "./ui/InputField";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState("");

  // Clear messages after 3 seconds
  React.useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        if (error) dispatch(clearError());
        if (successMessage) setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);

  const onSubmit = useCallback(
    async (data) => {
      dispatch(clearError());
      setSuccessMessage("");

      const result = await dispatch(
        loginUser({ email: data.email, password: data.password })
      );

      if (loginUser.fulfilled.match(result)) {
        setSuccessMessage("Login successful! Redirecting...");
        
        // Check for admin privileges
        const userData = result.payload?.data || result.payload; // Adjust based on actual payload structure
        const isAdmin = userData?.role === 'admin' || 
                       userData?.email?.includes('admin') || 
                       userData?.email === 'novacoder007@gmail.com';
        
        reset();
        setTimeout(() => navigate(isAdmin ? '/admin' : '/dashboard', { replace: true }), 1500);
      }
    },
    [dispatch, navigate, reset]
  );

  return (
    <motion.div
      className="w-full flex flex-col justify-start py-4 px-6 sm:px-8 pb-20 relative overflow-y-auto max-h-[650px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 via-transparent pointer-events-none" />
      
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-6 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-cyan-500/40 ring-2 ring-cyan-500/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <LogIn className="text-white text-lg" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
        </div>
        <p className="text-gray-300 text-sm">
          Sign in to continue your journey with Nova Coders
        </p>
      </motion.div>

      {/* Error/Success Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-xl text-red-300 text-xs text-center max-w-md mx-auto flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
          >
            <XCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
        
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mb-4 p-3 bg-green-500/20 backdrop-blur-sm border border-green-400/50 rounded-xl text-green-300 text-xs text-center max-w-md mx-auto flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign In Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto w-full relative z-10"
        variants={itemVariants}
      >
        {/* Email */}
        <motion.div variants={itemVariants}>
          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            register={register}
            name="email"
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            }}
            error={errors.email}
            icon={Mail}
            inputClassName="py-2.5 text-sm"
          />
        </motion.div>

        {/* Password */}
        <motion.div variants={itemVariants}>
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            name="password"
            validation={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            }}
            error={errors.password}
            icon={Lock}
            showPasswordToggle={true}
            inputClassName="py-2.5 text-sm"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="pt-2">
          <motion.div
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              type="submit"
              variant="secondary"
              disabled={loading}
              className="w-full py-3 text-base justify-center font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300"
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>

    </motion.div>
  );
};

export default Signin;
