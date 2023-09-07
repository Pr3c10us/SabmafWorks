import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Menu = ({ openMenu, setOpenMenu }) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      {openMenu && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
          className="fixed inset-0 z-[60]  flex flex-col justify-end bg-black  px-2 pb-[10vh] md:hidden"
        >
          <div className="flex flex-col justify-end gap-2 text-7xl sm:text-8xl">
            <div className="group relative overflow-hidden text-white transition duration-300">
              <motion.div
                initial={{ opacity: 0, y: "125%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "125%" }}
                transition={{ duration: 0.6 }}
                className="group relative cursor-pointer font-semibold transition-all duration-200 hover:text-primary"
                href={{}}
                onClick={() => {
                  router.push("/");
                  setOpenMenu(false);
                }}
              >
                Home
              </motion.div>
            </div>{" "}
            <div className="group relative overflow-hidden text-white transition duration-300">
              <motion.div
                initial={{ opacity: 0, y: "125%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "125%" }}
                transition={{ duration: 0.6 }}
                className="group relative cursor-pointer font-semibold transition-all duration-200 hover:text-primary"
                href={{}}
                onClick={() => {
                  router.push("/works");
                  setOpenMenu(false);
                }}
              >
                Works
              </motion.div>
            </div>{" "}
            <div className="group relative overflow-hidden text-white transition duration-300">
              <motion.div
                initial={{ opacity: 0, y: "125%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "125%" }}
                transition={{ duration: 0.6 }}
                className="group relative cursor-pointer font-semibold transition-all duration-200 hover:text-primary"
                href={{}}
                onClick={() => {
                  router.push("/contacts");
                  setOpenMenu(false);
                }}
              >
                Contacts
              </motion.div>
            </div>
            {/* <Link
          className="relative group transition-all duration-200 font-semibold hover:text-primary"
          href={{}}
        >
          About
        <span className="h-[2px] w-0 bottom-0 group-hover:w-full transition-all duration-200 left-0 bg-primary absolute"></span>
        </Link> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
