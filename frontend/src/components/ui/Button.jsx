import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
}) => {
   // Base styling for all buttons
  const baseStyle =
    "px-4 py-2 rounded-xl font-semibold transition-all duration-300 ease-in-out transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-base tracking-wide shadow-lg";

  // Updated variants with gradient styles
  const variants = {
    // 1. Gradient Fill (Primary) - Adjusted to a blue-to-cyan gradient with rounded-xl corners
    primary:
      "bg-gradient-to-r shadow-md shadow-blue-500/90  from-blue-500 to-cyan-500 text-white hover:shadow-3xl hover:brightness-105 hover:scale-105 text-black font-bold px-8 py-3 items-center gap-2 rounded-xl transition-all disabled:opacity-50 ",
    
    // 2. Secondary (Kept neutral)
    secondary:
      "px-8 py-3 text-black font-bold text-base flex items-center gap-2 shadow-md hover:scale-102 transition  rounded-lg bg-gradient-to-r from-cyan-400 to-green-400  hover:from-cyan-300 hover:to-green-300 transition-all disabled:opacity-50 ",
    
    // 3. Gradient Outline (Transitions to gradient fill on hover)
    outline:
      "border border-blue-500 text-blue-500 bg-transparent hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-400 hover:shadow-3xl px-8 py-3",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
