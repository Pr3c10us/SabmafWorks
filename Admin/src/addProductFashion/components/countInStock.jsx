import React from "react";
import { IoAddOutline } from "react-icons/io5";

const CountInStock = ({ setCountInStock, countInStock }) => {
  const [option, setOption] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);

  const handleAddSize = () => {
    // check if option is not empty
    if (option && quantity > 0) {
      // check if option already exist
      const exist = countInStock.find((item) => item.option === option);

      if (exist) {
        // if exist update the quantity
        setCountInStock(
          countInStock.map((item) =>
            item.option === option ? { ...exist, quantity } : item,
          ),
        );
      } else {
        // if not exist add the option
        setCountInStock([...countInStock, { option, quantity }]);
      }
    }
  };

  return (
    <section className="flex w-full flex-col gap-y-3">
      <div className="flex w-full gap-x-12 text-sm">
        <div className="flex items-center gap-4">
          <label className="font-medium" htmlFor="option">
            Option:
          </label>
          <input
            className="w-32 rounded border border-asisDark/50 bg-transparent px-0 py-2 text-center"
            type="text"
            id="option"
            name="option"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="font-medium" htmlFor="quantity">
            Quantity:
          </label>
          <input
            className="w-16 rounded border border-asisDark/50 bg-transparent px-0 py-2 text-center"
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={handleAddSize}
        type="button"
        className="flex w-24 items-center justify-center gap-2 rounded-md border border-asisDark/50 py-2 text-xs"
      >
        <IoAddOutline className="h-4 w-4" /> Add Option
      </button>
    </section>
  );
};

export default CountInStock;
