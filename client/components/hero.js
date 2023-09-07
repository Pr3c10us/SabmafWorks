"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const [screenHeight, setScreenHeight] = useState(0);
  useEffect(() => {
    const screenHeight = window?.innerHeight;
    setScreenHeight(screenHeight);
  }, []);
  // Calculate the animation range based on screen height
  const minY = 0;
  const maxY = screenHeight;

  const { scrollY, scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [minY, -maxY]);
  const opacity = useTransform(scrollY, [minY, maxY / 1.25, maxY], [1, 0, 0], {
    clamp: false,
  });

  return (
    <motion.section
      // style={{ opacity }}
      className="sticky inset-0  flex h-screen cursor-default flex-col items-center justify-center overflow-hidden bg-[url(/hero2.jpg)] bg-cover bg-no-repeat lg:items-end lg:justify-start lg:pr-8 lg:pt-28"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ translateY: y }}
        className=" text-[10vw] font-semibold text-black lg:text-8xl"
      >
        <span className="text-[#B56748] ">Sab</span>
        Mafworks
      </motion.h1>
    </motion.section>
  );
};

export default Hero;
