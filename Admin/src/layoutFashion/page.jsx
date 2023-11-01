import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/nav";
import { BsArrowUp } from "react-icons/bs";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // redirect to /products page
    if (location.pathname === "/") {
      window.location.href = "/products";
    }
  }, []);
  return (
    <main>
      {/* <Nav /> */}
      {location.pathname === "/" ? (
        <div className="flex w-full items-center justify-center gap-2 py-12 text-center text-2xl underline ">
          {/* Select an Option <BsArrowUp className="animate-bounce" /> */}
        </div>
      ) : (
        <Outlet />
      )}
    </main>
  );
};

export default Layout;
