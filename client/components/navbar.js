"use client";
import React from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Menu from "./menu";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [previousScroll, setPreviousScroll] = React.useState(0);

  const pathname = usePathname();
  const router = useRouter();

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
    <>
      <motion.nav
        variants={variants}
        animate={hidden ? "hidden" : "visible"}
        transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
        className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between bg-white bg-opacity-5 px-4 py-3 shadow-md backdrop-blur md:px-10 md:py-2"
      >
        <Link href="/" className="z-20 flex items-center md:flex-col">
          <Image
            src={"/logo.png"}
            className="object-fit hidden aspect-square w-10 md:flex md:w-10"
            width={50}
            height={50}
            alt="logo"
          />
          <h2
            className={`text-2xl font-bold transition-all duration-300 md:text-base md:font-semibold ${
              openMenu ? "text-white" : "text-black"
            }`}
          >
            <span className="text-primary">Sab</span>Mafworks
          </h2>
        </Link>

        <div className=" hidden gap-x-10 text-2xl mix-blend-difference md:flex">
          <Link
            className="group relative font-semibold transition-all duration-200 hover:text-primary"
            href="/works"
          >
            Works
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <div
            className="group relative cursor-pointer font-semibold transition-all duration-200 hover:text-primary"
            href={{}}
            onClick={() => {
              if (pathname == "/") {
                window?.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: "smooth",
                });
              } else {
                router.push("/contacts");
              }
            }}
          >
            Contacts
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-full"></span>
          </div>
          {/* <Link
          className="relative group transition-all duration-200 font-semibold hover:text-primary"
          href={{}}
        >
          About
        <span className="h-[2px] w-0 bottom-0 group-hover:w-full transition-all duration-200 left-0 bg-primary absolute"></span>
        </Link> */}
        </div>
        <button
          className="z-20 ml-auto space-y-1 md:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <div
            className={
              openMenu
                ? "h-[3px] w-7 translate-y-[7px] rotate-45 rounded-xl bg-white transition-all duration-300"
                : "h-[3px] w-7 rounded-xl bg-black transition-all duration-300"
            }
          ></div>
          <div
            className={
              openMenu
                ? "h-[3px] w-7 rounded-xl bg-white opacity-0 transition-all duration-300 "
                : "h-[3px] w-7 rounded-xl bg-black transition-all duration-300"
            }
          ></div>
          <div
            className={
              openMenu
                ? "m-0 h-[3px] w-7 -translate-y-[7px] -rotate-45 rounded-xl bg-white transition-all duration-300"
                : "h-[3px] w-7 rounded-xl bg-black transition-all duration-300"
            }
          ></div>
        </button>
      </motion.nav>{" "}
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  );
};

export default Navbar;
