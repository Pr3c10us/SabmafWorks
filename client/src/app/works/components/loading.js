import React from "react";

const Loading = () => {
  return (
    <section className="z-10 grid h-full w-full md:grid-cols-3 flex-col place-items-center items-center gap-6">
      <div className="md:col-span-2 flex h-[30rem] w-full max-w-4xl animate-pulse flex-col bg-gray-100">
        <div className={` w-full bg-gray-100 object-cover object-center `} />
        {/* <div className="flex w-full justify-between bg-gray-200 px-4 py-3 text-white md:px-8 md:py-6">
          <h2 className="flex h-4 w-32 items-center gap-x-1 bg-white text-sm md:h-6 md:w-64 md:gap-x-2 md:text-2xl"></h2>
          <button className="flex h-4 w-20 items-center justify-center gap-x-1 bg-white px-1 text-xs md:h-6 md:w-32 md:gap-x-2 md:text-base"></button>
        </div> */}
      </div>
      <div className="md:col-span-1 flex h-[30rem] w-full max-w-4xl animate-pulse flex-col bg-gray-100">
        <div className={` w-full bg-gray-100 object-cover object-center `} />
        {/* <div className="flex w-full justify-between bg-gray-200 px-4 py-3 text-white md:px-8 md:py-6">
          <h2 className="flex h-4 w-32 items-center gap-x-1 bg-white text-sm md:h-6 md:w-64 md:gap-x-2 md:text-2xl"></h2>
          <button className="flex h-4 w-20 items-center justify-center gap-x-1 bg-white px-1 text-xs md:h-6 md:w-32 md:gap-x-2 md:text-base"></button>
        </div> */}
      </div>
      <div className="md:col-span-1 flex h-[30rem] w-full max-w-4xl animate-pulse flex-col bg-gray-100">
        <div className={` w-full bg-gray-100 object-cover object-center `} />
        {/* <div className="flex w-full justify-between bg-gray-200 px-4 py-3 text-white md:px-8 md:py-6">
          <h2 className="flex h-4 w-32 items-center gap-x-1 bg-white text-sm md:h-6 md:w-64 md:gap-x-2 md:text-2xl"></h2>
          <button className="flex h-4 w-20 items-center justify-center gap-x-1 bg-white px-1 text-xs md:h-6 md:w-32 md:gap-x-2 md:text-base"></button>
        </div> */}
      </div>
      <div className="md:col-span-2 flex h-[30rem] w-full max-w-4xl animate-pulse flex-col bg-gray-100">
        <div className={` w-full bg-gray-100 object-cover object-center `} />
        {/* <div className="flex w-full justify-between bg-gray-200 px-4 py-3 text-white md:px-8 md:py-6">
          <h2 className="flex h-4 w-32 items-center gap-x-1 bg-white text-sm md:h-6 md:w-64 md:gap-x-2 md:text-2xl"></h2>
          <button className="flex h-4 w-20 items-center justify-center gap-x-1 bg-white px-1 text-xs md:h-6 md:w-32 md:gap-x-2 md:text-base"></button>
        </div> */}
      </div>
    </section>
  );
};

export default Loading;
// z-[100] flex items-center justify-center backdrop-blur-md
