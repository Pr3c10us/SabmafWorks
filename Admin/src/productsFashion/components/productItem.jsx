import React from "react";
import { Link } from "react-router-dom";
import PenIcon from "../../assets/pen.svg";
const ProductItem = ({ image, id, name }) => {
  return (
    <div key={id} className="flex flex-col gap-y-4">
      <img
        src={`${import.meta.env.VITE_BLOB_URL}${image}`}
        // src={`https://sabmaf2.blob.core.windows.net/sabmafimages/1698794404135-c8vaql.JPG`}
        alt={name}
        className="h-[25rem] w-full border border-asisDark object-cover object-top "
      />
      <Link
        className="flex items-center justify-center gap-2 rounded border border-asisDark py-2 text-sm font-medium capitalize"
        to={`/products/${id}`}
      >
        <img src={PenIcon} alt="edit" className="h-6" />
        Edit {name.substring(0, 12).concat(`. . .`)}
      </Link>
    </div>
  );
};

export default ProductItem;
