import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaUsers } from "react-icons/fa";
import LazyImage from "./ui/LazyImage";

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  category,
  teamSize,
  status = "completed",
}) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "in-progress":
        return "bg-yellow-400/20 text-yellow-300 border-yellow-400/50";
      case "completed":
        return "bg-green-400/20 text-green-300 border-green-400/50";
      case "planning":
        return "bg-blue-400/20 text-blue-300 border-blue-400/50";
      default:
        return "bg-gray-400/20 text-gray-300 border-gray-400/50";
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "web":
        return "bg-cyan-500/20 text-cyan-300";
      case "mobile":
        return "bg-purple-500/20 text-purple-300";
      case "ai/ml":
        return "bg-pink-500/20 text-pink-300";
      case "blockchain":
        return "bg-orange-500/20 text-orange-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-48">
        <LazyImage
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          placeholder="https://via.placeholder.com/400x200/1e293b/60a5fa?text=Loading..."
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Status and Category Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
          {category && (
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(
                category
              )}`}
            >
              {category}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 flex-1">
            {title}
          </h3>
          {teamSize && (
            <div className="flex items-center gap-1 text-gray-400 text-sm ml-2">
              <FaUsers className="w-3 h-3" />
              <span>{teamSize}</span>
            </div>
          )}
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FaCode className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-gray-400 font-medium">
                Technologies:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 4 && (
                <span className="text-xs px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full border border-gray-500/30">
                  +{technologies.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
