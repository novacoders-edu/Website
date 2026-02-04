import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, CheckCircle, XCircle, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/userActions";
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

const calculatePasswordStrength = (password) => {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  return strength;
};

const getPasswordStrengthData = (strength) => {
  if (strength >= 75) return { color: "bg-green-500", text: "Strong" };
  if (strength >= 50) return { color: "bg-yellow-500", text: "Good" };
  if (strength >= 25) return { color: "bg-orange-500", text: "Fair" };
  return { color: "bg-red-500", text: "Weak" };
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState("");

  const password = watch("password", "");
  const passwordStrength = useMemo(() => calculatePasswordStrength(password), [password]);
  const passwordStrengthData = useMemo(() => getPasswordStrengthData(passwordStrength), [passwordStrength]);

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
        registerUser({
          userName: data.username,
          email: data.email,
          password: data.password,
          fullName: data.name,
        })
      );

      if (registerUser.fulfilled.match(result)) {
        setSuccessMessage("Account created successfully! Redirecting...");
        reset();
        setTimeout(() => navigate("/", { replace: true }), 2000);
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
      <div className="absolute inset-0 via-transparent to-cyan-500/5 pointer-events-none" />
      
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-4 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/40 ring-2 ring-purple-500/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="text-white text-lg" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            Create Account
          </h2>
        </div>
        <p className="text-gray-300 text-sm">
          Start your journey with our amazing community
        </p>
      </motion.div>

      {/* Error/Success Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-xl text-red-300 text-xs text-center max-w-md mx-auto flex items-center gap-2 shadow-lg shadow-red-500/20"
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
            className="mb-4 p-3 bg-green-500/20 backdrop-blur-sm border border-green-400/50 rounded-xl text-green-300 text-xs text-center max-w-md mx-auto flex items-center gap-2 shadow-lg shadow-green-500/20"
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 max-w-md mx-auto w-full relative z-10"
        variants={itemVariants}
      >
        {/* Full Name */}
        <motion.div variants={itemVariants}>
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            register={register}
            name="name"
            validation={{
              required: "Full name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" }
            }}
            error={errors.name}
            icon={User}
            inputClassName="py-2.5 text-sm"
          />
        </motion.div>

        {/* Username */}
        <motion.div variants={itemVariants}>
          <InputField
            label="Username"
            type="text"
            placeholder="Choose a username"
            register={register}
            name="username"
            validation={{
              required: "Username is required",
              minLength: { value: 3, message: "Username must be at least 3 characters" },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Username can only contain letters, numbers, and underscores"
              }
            }}
            error={errors.username}
            icon={User}
            inputClassName="py-2.5 text-sm"
          />
        </motion.div>

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
            placeholder="Create a strong password"
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
          
          {/* Password Strength Indicator */}
          {password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-gray-800/50 rounded-full overflow-hidden shadow-inner border border-gray-700/50">
                  <motion.div
                    className={`h-full ${passwordStrengthData.color} rounded-full shadow-sm`}
                    initial={{ width: 0 }}
                    animate={{ width: `${passwordStrength}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className={`text-[10px] font-semibold min-w-[50px] text-right ${
                  passwordStrength >= 75 ? "text-green-400" :
                  passwordStrength >= 50 ? "text-yellow-400" :
                  passwordStrength >= 25 ? "text-orange-400" : "text-red-400"
                }`}>
                  {passwordStrengthData.text}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="pt-1">
          <motion.div
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              type="submit"
              variant="secondary"
              disabled={loading}
              className="w-full py-3 text-base justify-center font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>

    </motion.div>
  );
};

export default Signup;
