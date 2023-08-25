import Image from "next/image";
import { useEffect, useRef } from "react";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { RxDoubleArrowRight } from "react-icons/rx";
import {
  HiOutlineArrowSmallRight,
  HiOutlineArrowSmallLeft,
} from "react-icons/hi2";

const Cursor = ({ cursorType, image }) => {
  const cursor = useRef(null);
  const changePosition = (e) => {
    cursor.current.animate(
      {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
      },
      { duration: 500, fill: "forwards" },
    );
  };
  useEffect(() => {
    document.addEventListener("mousemove", changePosition);
    return () => {
      document.removeEventListener("mousemove", changePosition);
    };
  }, []);
  
  return (
    <div
      className={`pointer-events-none fixed bottom-0 right-0 z-[60] hidden -translate-x-1/2  -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent transition-all duration-150 sm:flex  ${
        cursorType == "link" && " h-20 w-20 border-4 "
      }
      ${cursorType == "project" && " h-24 w-24 border-none  border-white"}  
      ${cursorType == "fill" && " h-6 w-6 border-none bg-accent"} 
      ${cursorType == "image" && " h-6 w-6 border-none bg-white"}
       ${cursorType == "form" && " h-6  w-6 opacity-0"}
      ${
        (cursorType == "left" || cursorType == "right") && "h-6 w-6 opacity-0 "
      } 
      ${!cursorType && "h-6 w-6 "} `}
      ref={cursor}
    >
      {cursorType == "link" && (
        <FiArrowUpRight className="h-full w-full text-accent" />
      )}
      {cursorType == "project" && (
        <FiArrowRight className="h-full w-full text-white" />
      )}
      {/* {cursorType == "image" && (
        <FiArrowRight className="h-full w-full text-white" />
      )} */}
      {/* {cursorType == "left" && (
        <HiOutlineArrowSmallLeft className="h-full w-full text-accent" />
      )}
      {cursorType == "right" && (
        <HiOutlineArrowSmallRight className="h-full w-full text-accent" />
      )} */}
    </div>
  );
};

export default Cursor;
