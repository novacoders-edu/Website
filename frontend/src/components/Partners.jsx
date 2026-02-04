import { useContext } from "react";
import LogoLoop from "./LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { DataContext } from "../context/DataProvider";

export default function Partners() {
  const { partners } = useContext(DataContext);

  return (
    <div
      style={{ height:"300px", position: "relative", overflow: "hidden" }}
      className="my-20 text-center "
    >
      <h1 className="text-3xl md:text-4xl font-extrabold mb-20">
        Company & Community
        <span className=" bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ">
          {" "}
          Partners
        </span>
      </h1>
      <LogoLoop
        logos={partners}
        speed={80}
        direction="right"
        logoHeight={150}
        gap={50}
        pauseOnHover
        scaleOnHover
        fadeOut
      
        ariaLabel="Technology partners"
      />
    </div>
  );
}
