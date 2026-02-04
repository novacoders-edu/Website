import React from "react";
import { Link } from "react-router-dom";

const TeamCard = ({ name, role, avatar, socialLinks = [] }) => {
  return (
    <div className="relative group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105">
      {/* Avatar */}
      <div className="relative mb-4">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-cyan-400/30 group-hover:border-cyan-400 transition-all duration-300">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        {/* Online status indicator */}
        <div className="absolute bottom-2 right-1/2 transform translate-x-6 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
      </div>

      {/* Name and Role */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-gray-400 text-sm font-medium">
          {role}
        </p>
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex justify-center space-x-3">
          {socialLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={index}
                to={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              >
                <IconComponent className="w-4 h-4" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeamCard;
