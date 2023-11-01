import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/nav";
import { BsArrowUp } from "react-icons/bs";

const Layout = () => {
  const location = useLocation();

  return (
    <main>
      {/* <Nav /> */}

      <Outlet />
    </main>
  );
};

export default Layout;
