import Image from "next/image";
import React from "react";
import { MdArchitecture } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Project = ({ work, index, cols }) => {
  const router = useRouter();

  const divVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };
  return (
    <motion.div
      variants={divVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      onClick={() => router.push(`/works/${work._id}`)}
      className={`flex flex-col ${cols} group relative h-96 md:h-[30rem] cursor-pointer overflow-hidden`}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${
          work.displayImages || work.images[0]
        }`}
        alt={work.title}
        width={6000}
        height={6000}
        className={`h-full scale-125 object-cover object-center transition-all duration-200 group-hover:scale-[1.20] group-hover:brightness-75`}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-200 group-hover:opacity-100">
        <h2 className="flex items-center gap-x-1 text-3xl font-semibold text-white md:gap-x-2 lg:gap-x-1 ">
          <MdArchitecture />
          {work.name} 
          <FiArrowUpRight />
        </h2>
        {/* <button
          onClick={() => router.push(`/works/${work._id}`)}
          className="flex items-center justify-center gap-x-1 border-b border-b-white px-1 text-xs md:gap-x-2 md:text-base lg:gap-x-1 lg:text-sm"
        >
          View Project <FiArrowUpRight />
        </button> */}
      </div>
    </motion.div>
  );
};

export default Project;
