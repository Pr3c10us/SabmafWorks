import React, { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

const FullImage = ({
  images,
  autoSlide = false,
  autoSlideInterval = 5000,
  setShowImage,
  currImage,
}) => {
  const [curr, setCurr] = useState(currImage);
  const next = () => {
    setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  };
  const prev = () => {
    setCurr((curr) => (curr >= images.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(prev, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);
  return (
    <section className="fixed inset-0 z-[70] grid place-content-center bg-black/50 px-4 py-8 backdrop-blur">
      <div className="flex h-full items-stretch overflow-hidden md:mx-[5%]">
        <div
          className={`flex transition-all duration-500 ease-out`}
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {images.map((image) => (
            <Image
              key={image}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${image}`}
              alt={image}
              width="3000"
              height="3000"
              className={`w-full object-contain`}
              priority
            />
          ))}
        </div>

        <div
          onClick={() => setShowImage(false)}
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center text-white"
        >
          <RxCross2 className="h-full w-full" />
        </div>
        {images.length > 1 && (
          <div>
            <button
              onClick={prev}
              className="absolute right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 transition-all duration-200 hover:scale-110 hover:bg-black/100 md:h-12 md:w-12"
            >
              <FiChevronRight className="text-2xl text-white" />
            </button>
            <button
              onClick={next}
              className="absolute left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 transition-all duration-200 hover:scale-110 hover:bg-black/100 md:h-12 md:w-12"
            >
              <FiChevronLeft className="text-2xl text-white" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FullImage;
