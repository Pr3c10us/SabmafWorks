import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Carousel from "./carousel";
import VowelItalicizer from "./vowelItalicizer";

const Projects = ({ projects, setCursorType }) => {
  const ref = useRef(null);
  const router = useRouter();
  return (
    <section className="relative z-10 flex snap-end flex-col items-center gap-[10vh] bg-white pt-28  md:gap-16 ">
      <div className="flex w-full items-center gap-4 px-6 md:px-14">
        <div className="h-[1px] flex-1 bg-primary"></div>
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[6vw] font-semibold uppercase text-text md:text-5xl"
        >
          <VowelItalicizer text={"Our Works"} />
        </motion.h1>
      </div>
      <Carousel setCursorType={setCursorType} autoSlide={true}>
        {projects.map((project, i) => (
          <Image
            onClick={() => {
              router.push(`/works/${project._id}`);
            }}
            key={project._id}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${project.displayImages}`}
            alt={project.name}
            width="6000"
            height="6000"
            className={`aspect-video h-full object-cover object-center  `}
            priority
          />
        ))}
      </Carousel>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="group flex items-center justify-center gap-4 gap-x-4 text-gray-400 "
      >
        <div
          onMouseEnter={() => {
            setCursorType("link");
          }}
          onMouseLeave={() => {
            setCursorType(null);
          }}
          onClick={() => {
            router.push("/works");
          }}
          className="cursor-none text-xl underline transition-all duration-200 hover:text-accent  md:text-3xl"
        >
          Explore more works
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
