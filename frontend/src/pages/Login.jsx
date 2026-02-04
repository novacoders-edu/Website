import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import { authAPI } from "../utils/api";

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

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setLoginError('');
    
    try {
      const result = await authAPI.login(data);
      
      if (result.success) {
        const userData = result.data.data || result.data;
        
        localStorage.setItem('userEmail', userData.email || data.email);
        localStorage.setItem('userRole', userData.role || 'user');
        localStorage.setItem('token', userData.token || 'authenticated');
        localStorage.setItem('userId', userData._id || userData.id);
        
        const isAdmin = userData.role === 'admin' || 
                       userData.email?.includes('admin') || 
                       userData.email === 'novacoder007@gmail.com';
        
        navigate(isAdmin ? '/admin' : '/dashboard');
        if (isAdmin) localStorage.setItem('userRole', 'admin');
      } else {
        setLoginError(result.error?.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError('Login failed. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#232a46] flex items-center justify-center px-6 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Sign in to continue your journey with Nova Coders
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)] relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-sm -z-10"></div>
          
          {/* Error Message */}
          {loginError && (
            <motion.div 
              className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6"
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-red-400 text-center">{loginError}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
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
              />
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                register={register}
                name="password"
                validation={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                error={errors.password}
                showPasswordToggle={true}
              />
            </motion.div>


            {/* Login Button */}
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
                className="w-full text-lg py-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </motion.div>
          </form>

          {/* Sign Up Link */}
          <motion.div className="text-center mt-6" variants={itemVariants}>
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;