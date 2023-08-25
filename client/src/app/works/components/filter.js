import React, { useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

const Filter = ({ service, setService }) => {
  const [showOpt, setShowOpt] = useState(false);
  const [option, setOption] = useState(service);

  const options = [
    "Show All",
    "Designs and Modelling",
    "Construction",
    "Interior Design",
    "Estate Management",
  ];

  return (
    <section className="relative flex w-full flex-col gap-y-4">
      <div
        onClick={() => setShowOpt(!showOpt)}
        className={`flex w-full cursor-pointer items-center justify-between overflow-hidden rounded border-2 border-accent px-4 py-2 text-xl font-semibold capitalize text-accent transition-all duration-200 md:w-1/2 md:max-w-sm md:text-2xl lg:w-1/3 ${
          showOpt ? "text-opacity-50" : "text-opacity-100"
        }`}
      >
        {option || "Choose a service"}{" "}
        <BsFillCaretDownFill
          className={` text-accent transition-all duration-200 ${
            showOpt
              ? "translate-y-full opacity-0"
              : "-translate-y-0 opacity-100"
          }`}
        />
      </div>
      <div
        className={`absolute top-[120%] z-20 grid w-full rounded bg-white shadow-xl transition-all duration-200 md:w-1/2 md:max-w-sm lg:w-1/3 ${
          showOpt ? "grid-rows-[1fr] border" : "grid-rows-[0fr] border-0"
        } `}
      >
        <div className="overflow-hidden">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => {
                setOption(opt);
                setService(`${opt == "Show All" ? "" : opt}`);
                setShowOpt(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between overflow-hidden px-4 py-2 text-xl font-semibold capitalize text-accent transition-all duration-200 hover:bg-accent/20 md:text-2xl `}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Filter;
