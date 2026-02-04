import React, { useContext } from "react";

import { Carousel_003, Skiper49 } from "../components/ui/Skiper49";
import { DataContext } from "../context/DataProvider";




const Highlight = () => {

    const { images } = useContext(DataContext);

  return (
    <div className="max-w-6xl mx-auto my-10 text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center mt-15">
        Community{" "}
        <span className=" bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {" "}
          Highlights
        </span>{" "}
      </h1>

      <p className="text-gray-300 text-lg mb-10">
        Discover the moments that define our journey. From hackathons and
        workshops to mentorship sessions and collaborations, these highlights
        showcase the passion, innovation, and teamwork that drive the Nova
        Coders community forward.
      </p>
      <div className="max-w-5xl mx-auto text-center">
        <Carousel_003
          className={""}
          images={images}
          showPagination
          showNavigation
          autoplay
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        />
      </div>
    </div>
  );
};

export default Highlight;
