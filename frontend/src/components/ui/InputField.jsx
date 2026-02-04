import React, { useState } from "react";
import { motion } from "framer-motion";

const InputField = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
  validation = {},
  error,
  className = "",
  showPasswordToggle = false,
  icon: Icon,
  inputClassName = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (type === "password" && showPasswordToggle) {
      return showPassword ? "text" : "password";
    }
    return type;
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      {label && (
        <label className="block text-white font-semibold text-sm tracking-wide">
          {label}
        </label>
      )}
      
      <div className="relative group">
        <input
          type={getInputType()}
          placeholder={placeholder}
          {...(register ? register(name, validation) : {})}
          className={`w-full rounded-xl bg-white/5 backdrop-blur-sm border-2 ${
            error 
              ? "border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-500/30" 
              : "border-cyan-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          } px-4 py-3.5 pr-12 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 hover:border-cyan-400/50 focus:bg-white/10 shadow-lg shadow-cyan-500/10 focus:shadow-cyan-500/20 ${inputClassName}`}
          {...props}
        />
        {Icon && (
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
            error ? "text-red-400" : "text-cyan-400 group-focus-within:text-cyan-300"
          }`}>
            <Icon size={20} />
          </div>
        )}
        
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-all duration-300 p-1 rounded-md hover:bg-white/10 active:scale-95"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 mt-1.5 flex items-center gap-1.5"
        >
          <span className="text-red-500">•</span>
          {error.message}
        </motion.p>
      )}
    </div>
  );
};

export default InputField;
