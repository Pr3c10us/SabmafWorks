import Image from "next/image";
import React from "react";
import Project from "./project";

const Projects = ({ works }) => {
  return (
    <section className="z-10 grid h-full w-full flex-col place-items-center items-center gap-8 md:gap-16 xl:grid-cols-2">
      {works.map((work, i) => (
        <Project work={work} key={work._id} />
      ))}
      {/* <div className="h-[2000px] bg-black"></div> */}
    </section>
  );
};

export default Projects;
