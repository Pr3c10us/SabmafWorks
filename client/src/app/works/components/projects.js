import Image from "next/image";
import React from "react";
import Project from "./project";

const Projects = ({ works }) => {
  return (
    <section className="z-10 grid h-full w-full md:grid-cols-3 flex-col place-items-center items-center gap-6">
      {works.map((work, i) => {
        const cols = `md:col-span-${
          i % 3 === 0 || (i + 1) % 3 === 1 ? "2" : "1"
        }`;
        return (
          <Project
            work={work}
            key={work._id}
            index={i}
            cols={(works.length - 1 == i && works.length % 2 != 0) ? "md:col-span-3" : cols}
          />
        );
      })}
      {/* <div className="h-[2000px] bg-black"></div> */}
    </section>
  );
};

export default Projects;
