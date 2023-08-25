import Image from "next/image";
import React from "react";
import { MdArchitecture } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Project = ({ work }) => {
    const divVariant = {
      initial: {  opacity: 0 },
      animate: {  opacity: 1 },
    };
  return (
    <motion.div
      variants={divVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex w-full max-w-4xl flex-col border-2 border-primary"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${
          work.displayImages || work.images[0]
        }`}
        alt={work.title}
        width={6000}
        height={6000}
        className={`aspect-video w-full object-cover object-center `}
      />
      <div className="flex w-full justify-between bg-accent px-4 py-3 text-white md:px-8 md:py-6">
        <h2 className="flex items-center gap-x-1 text-sm md:gap-x-2 md:text-2xl">
          <MdArchitecture />
          {work.name}
        </h2>
        <button className="flex items-center justify-center gap-x-1 border-b border-b-white px-1 text-xs md:gap-x-2 md:text-base">
          View Project <FiArrowUpRight />
        </button>
      </div>
    </motion.div>
  );
};

export default Project;
