import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 5000,
  setCursorType,
}) => {
  const [curr, setCurr] = useState(0);
  const next = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  const prev = () => {
    setCurr((curr) => (curr >= slides.length - 1 ? 0 : curr + 1));
  };

  const divVariant = {
    initial: { y: "100px", opacity: 0 },
    animate: { y: "0px", opacity: 1 },
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(prev, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);
  return (
    <motion.div
      variants={divVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      onMouseEnter={() => {
        setCursorType("image");
      }}
      onMouseLeave={() => {
        setCursorType(null);
      }}
      className="relative mx-0 flex md:aspect-video h-96 md:h-full  overflow-hidden shadow-xl md:mx-4 lg:mx-[15%]"
    >
      <div
        className={`flex transition-all duration-500 ease-out`}
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      {slides.length > 1 && (
        <div>
          <button
            onMouseEnter={() => {
              setCursorType("left");
            }}
            onMouseLeave={() => {
              setCursorType("image");
            }}
            onClick={prev}
            className="absolute right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 transition-all duration-200 hover:scale-110 hover:bg-black/100 md:h-12 md:w-12"
          >
            <FiChevronRight className="text-2xl text-white" />
          </button>
          <button
            onMouseEnter={() => {
              setCursorType("right");
            }}
            onMouseLeave={() => {
              setCursorType("image");
            }}
            onClick={next}
            className="absolute left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 transition-all duration-200 hover:scale-110 hover:bg-black/100 md:h-12 md:w-12"
          >
            <FiChevronLeft className="text-2xl text-white" />
          </button>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 flex h-6 md:h-12">
        <div className="flex w-full items-center justify-center gap-x-2 bg-black/20">
          {slides.map((slide, index) => (
            <div
            key={index}
              //   onClick={setCurr(index)}
              className={`h-[2px] rounded-full  bg-white transition-all duration-300 md:h-1 ${
                curr === index ? " w-6" : "w-2"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Carousel;
