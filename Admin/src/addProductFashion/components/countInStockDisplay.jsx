import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
const CountInStockDisplay = ({ setCountInStock, countInStock }) => {
  const removeSize = (option) => {
    setCountInStock(countInStock.filter((item) => item.option !== option));
  };
  return (
    <section className="flex w-full flex-wrap justify-center gap-x-5 font-medium md:justify-start">
      {countInStock.map((item, index) => (
        <div key={index} className="flex flex-col gap-2">
          <p className="flex min-w-[100px] items-center justify-center gap-2 rounded border border-asisDark/50 px-3 py-2 text-center text-[0.65rem] capitalize">
            <FaCircleCheck className="inline-block h-3 w-3 text-green-500" />
            {item.option}
          </p>
          <p className="flex min-w-[100px] items-center justify-center gap-2 rounded border border-asisDark/50 px-3 py-2 text-center text-[0.65rem] capitalize">
            QTY: {item.quantity}
          </p>
          <button
            type="button"
            onClick={() => removeSize(item.option)}
            className="flex min-w-[100px] items-center justify-center gap-2 rounded bg-red-500 px-3 py-2 text-center text-[0.65rem] capitalize text-white"
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

export default CountInStockDisplay;
