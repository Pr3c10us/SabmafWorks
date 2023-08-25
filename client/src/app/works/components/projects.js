import Image from "next/image";
import React from "react";
import Project from "./project";

const Projects = ({ works }) => {
  return (
    <section className="z-10 flex h-full w-full flex-col gap-y-8 md:gap-y-16 items-center">
      {works.map((work, i) => (
        <Project work={work} key={work._id} />
      ))}
      {/* <div className="h-[2000px] bg-black"></div> */}
    </section>
  );
};

export default Projects;
