import React, { useContext } from "react";
import ServiceCard from "../components/ServiceCard";
import { DataContext } from "../context/DataProvider";

const ServicesSection = () => {
  const { services } = useContext(DataContext);

  return (
    <section className="pt-10 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-12">
          Explore Our   <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent "> Services</span> 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
