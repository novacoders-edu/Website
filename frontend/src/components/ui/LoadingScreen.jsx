import React, { useState, useEffect } from "react";
import logo from "/logo.png";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  useEffect(() => {
    // Progress animation over 5 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2; // Increment by 2% every 100ms = 100% in 5 seconds
      });
    }, 100);

    // Loading text changes
    const textTimeouts = [
      setTimeout(() => setLoadingText("Booting up Nova Coders..."), 500),
      setTimeout(() => setLoadingText("Connecting innovators..."), 1500),
      setTimeout(() => setLoadingText("Welcome to Nova Coders!"), 2500),
    ];

    return () => {
      clearInterval(progressInterval);
      textTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.8); }
          50% { box-shadow: 0 0 25px rgba(0, 255, 255, 1), 0 0 35px rgba(0, 255, 255, 0.6); }
        }
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes text-fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .orbit-outer {
          animation: spin-slow 5s linear infinite, glow-pulse 2s ease-in-out infinite;
        }
        .orbit-inner {
          animation: spin-reverse 5s linear infinite;
        }
        .logo-pulse {
          animation: pulse-scale 2s ease-in-out infinite;
        }
        .progress-bar {
          animation: progress-fill 5s linear forwards;
        }
        .loading-text {
          animation: text-fade 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Orbit Ring */}
        <div className="absolute w-64 h-64 border-4 border-transparent border-t-cyan-400 border-l-cyan-400 rounded-full orbit-outer"></div>

        {/* Inner Orbit Ring */}
        <div
          className="absolute w-48 h-48 border-4 border-transparent border-b-cyan-500 border-r-cyan-500 rounded-full orbit-inner"
          style={{
            boxShadow: "0 0 10px rgba(0, 255, 255, 0.6)",
          }}
        ></div>

        {/* Center Logo */}
        <div className="w-40 logo-pulse flex items-center justify-center z-10">
          <img src={logo} alt="Logo" className="max-w-full max-h-full" />
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-16 flex flex-col items-center space-y-4">
        {/* Loading Text */}
        <div className="loading-text text-cyan-400 text-lg font-medium tracking-wide">
          {loadingText}
        </div>

        {/* Progress Bar Container */}
        <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/30">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="text-cyan-300 text-sm font-mono">{progress}%</div>
      </div>

      {/* Background Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `pulse-scale ${
                2 + Math.random() * 3
              }s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
