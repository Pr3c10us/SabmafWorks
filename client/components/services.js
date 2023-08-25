"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import VowelItalicizer from "./vowelItalicizer";

const Services = ({ setCursorType, setImage }) => {
  const divVariant = {
    initial: { y: "100px", opacity: 0 },
    animate: { y: "0px", opacity: 1 },
  };
  const services = [
    {
      name: "Construction",
      image: "/construction1.jpg",
      desc: "Expert builders crafting structures with precision and quality",
      alt: "construction",
    },
    {
      name: "Interior Design",
      image: "/interior2.jpg",
      alt: "interior",
      desc: " Transforming spaces into captivating environments with creative flair",
    },
    {
      name: "Estate Management",
      image: "/estate.jpg",
      alt: "estate",
      desc: "Skillful oversight of properties, ensuring functionality and value",
    },
    {
      name: "Designs and Modelling",
      image: "/design.jpg",
      alt: "design",
      desc: "Crafting imaginative concepts and visualizing ideas with precision",
    },
  ];

  // const backgroundImage =
  return (
    <section className="relative z-10 flex snap-end flex-col gap-12 bg-white px-6 pt-20 md:px-14">
      <div className="flex items-center gap-4">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[6vw] uppercase text-text md:text-5xl "
        >
          <VowelItalicizer text={"Our Services"} />
        </motion.h1>
        <div className="h-[1px] flex-1 bg-primary"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 transition-all duration-100 md:grid-cols-">
        {services.map((service, index) => (
          <div
            key={service.name}
            className={` ${
              (index == 0 || index == 3) &&
              "md:grd md:col-pan-3 md:grid-ols-3 "
            } ${index == 2 && "md:gri md:col-pan-2 md:grid-ols-2"}`}
          >
            <motion.div
              onMouseEnter={() => {
                setCursorType("image");
                setImage(service.alt);
              }}
              onMouseLeave={() => {
                setCursorType(null);
              }}
              variants={divVariant}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              key={service.name}
              // onMouseEnter={() => {

              // }}
              className={` 
              // ${service.image} group  relative
                h-80 3xl:h-[30rem] cursor-pointer overflow-hidden bg-cover bg-center text-white ${
                   index == 0 && "col-end-4"
                 } ${index == 2 && "col-end-3"} ${index == 3 && "col-end-3"}`}
            >
              <Image
                src={service.image}
                alt={service.alt}
                width="6000"
                height="3000"
                className={`h-full object-cover object-center brightness-75 transition-all duration-500 sm:blur-[2px] sm:group-hover:scale-110 sm:group-hover:blur-none`}
                priority
              />
              <motion.div
                className={`absolute inset-0 flex flex-col items-center justify-center px-2 text-center lg:px-8`}
              >
                <h1 className="text-xl font-semibold sm:text-2xl lg:text-4xl">
                  {service.name}
                </h1>
                <p className="md:text-bas text-xs text-secondary sm:text-sm lg:text-xl">
                  {service.desc}
                </p>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default Services;
