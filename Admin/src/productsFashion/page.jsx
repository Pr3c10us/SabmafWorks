import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  return (
    <main className="pt-7">
      {location.pathname === "/" && <h1 className="font-semibold">Products</h1>}
      <Outlet />
    </main>
  );
};

export default Products;
