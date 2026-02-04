import React from "react";
import { Lightbulb, Target } from "lucide-react";

const MissionVision = () => {
  return (
    <section className=" py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 ">
          Our <span className=" bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Mission</span> & <span className=" bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Vision</span>
        </h2>
        <p className="text-gray-300 text-lg mb-12">
          At <span className="font-semibold bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-400 bg-clip-text text-transparent">Nova Coders</span>,
          we’re building a future where innovation meets learning. We empower
          students to grow as creators, innovators, and leaders in the tech
          world.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Mission Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.03] transition-all duration-300 border border-white/10">
          <div className="flex items-center justify-center mb-6">
            <Lightbulb className="w-12 h-12 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-300">
            Our Mission
          </h3>
          <p className="text-gray-200 leading-relaxed">
            To empower students and young developers through hands-on learning,
            real-world projects, and collaboration — bridging the gap between
            academic knowledge and industry skills.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-[1.03] transition-all duration-300 border border-white/10">
          <div className="flex items-center justify-center mb-6">
            <Target className="w-12 h-12 text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-purple-300">
            Our Vision
          </h3>
          <p className="text-gray-200 leading-relaxed">
            To become a leading tech community that inspires innovation, builds
            global connections, and shapes the next generation of tech leaders
            and problem-solvers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
