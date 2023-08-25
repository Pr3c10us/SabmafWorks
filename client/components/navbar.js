"use client";
import React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [previousScroll, setPreviousScroll] = React.useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log("Page scroll: ", latest);
    setPreviousScroll(latest);
    if (latest > previousScroll) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const variants = {
    /** this is the "visible" key and it's correlating styles **/
    visible: { opacity: 1, y: 0 },
    /** this is the "hidden" key and it's correlating styles **/
    hidden: { opacity: 0, y: -25 },
  };

  return (
    <motion.nav
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between bg-white bg-opacity-5 px-4 py-1 backdrop-blur shadow-md md:px-10 md:py-2"
    >
      <Link href="/" className="flex items-center md:flex-col ">
        <Image
          src={"/logo.png"}
          className="object-fit aspect-square w-10 md:w-10"
          width={50}
          height={50}
          alt="logo"
        />
        <h2 className="text- font-semibold">
          <span className="text-primary">Sab</span>Mafworks
        </h2>
      </Link>
      <div className=" hidden gap-x-10 text-2xl mix-blend-difference md:flex">
        <Link
          className="relative group transition-all duration-200 font-semibold hover:text-primary"
          href="/works"
        >
          Works
        <span className="h-[2px] w-0 bottom-0 group-hover:w-full transition-all duration-200 left-0 bg-primary absolute"></span>
        </Link>
        <Link
          className="relative group transition-all duration-200 font-semibold hover:text-primary"
          href="/contacts"
        >
          Contacts
        <span className="h-[2px] w-0 bottom-0 group-hover:w-full transition-all duration-200 left-0 bg-primary absolute"></span>
        </Link>
        <Link
          className="relative group transition-all duration-200 font-semibold hover:text-primary"
          href={{}}
        >
          About
        <span className="h-[2px] w-0 bottom-0 group-hover:w-full transition-all duration-200 left-0 bg-primary absolute"></span>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
