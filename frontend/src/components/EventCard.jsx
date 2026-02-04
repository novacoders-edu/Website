import React from "react";

const EventCard = ({ title, date, description, image, status }) => {
   

  // Function to return color based on status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "upcoming":
        return "bg-yellow-400/20 text-yellow-300 border-yellow-400/50";
      case "ongoing":
        return "bg-blue-400/20 text-blue-300 border-blue-400/50";
      case "complete":
        return "bg-green-400/20 text-green-300 border-green-400/50";
      default:
        return "bg-gray-400/20 text-gray-300 border-gray-400/50";
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 flex-1 pr-2">
            {title}
          </h3>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full border flex-shrink-0 ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
        <p className="text-sm text-cyan-400 mb-3 font-medium">{date}</p>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;
