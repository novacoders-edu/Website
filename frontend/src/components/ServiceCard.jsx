import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ imageSrc, title, description, buttonLink, icon }) => (
  <div
    className="relative group bg-gradient-to-br from-[#162636]/80 to-[#222c25]/80
                border border-teal-700/80 rounded-xl p-6 sm:p-8
                flex flex-col items-center text-center shadow-xl
                backdrop-blur-md transition-all duration-300
                hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
                hover:border-cyan-400/90 hover:bg-teal-900/90
                max-w-md mx-auto"
  >
    {/* Service Image/Icon */}
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 bg-[#112D2A] rounded-full
                  flex items-center justify-center -mt-10 mb-4 border-4 border-teal-900
                  overflow-hidden group-hover:border-cyan-500 transition-all"
    >
      {icon ? (
        (() => {
          const Icon = icon;
          return <Icon className="w-8 h-8 text-cyan-400" aria-hidden="true" />;
        })()
      ) : (
        <img
          src={imageSrc}
          alt={title}
          className="w-3/4 h-3/4 object-contain"
        />
      )}
    </div>

    {/* Service Title */}
    <h3
      className="text-xl sm:text-2xl font-extrabold text-teal-100
                 mb-3 group-hover:text-cyan-400 transition-colors duration-300"
    >
      {title}
    </h3>

    {/* Service Description Points */}
    <p className="text-gray-300/90 text-sm sm:text-base list-none space-y-2 mb-8 max-w-xs text-left">
      {description}
    </p>

    {/* Learn More Button */}
    <Link
      to={buttonLink}
      className="mt-auto px-6 py-2 sm:py-3 rounded-full
                 bg-gradient-to-r from-cyan-500 to-teal-500
                 text-teal-900 font-bold shadow-md
                 hover:from-cyan-400 hover:to-teal-400
                 hover:text-white transition-all duration-300 ease-in-out
                 flex items-center space-x-2 outline-none ring-0
                 group-hover:ring-2 group-hover:ring-cyan-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
    >
      <span>More Info</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
);

export default ServiceCard;
