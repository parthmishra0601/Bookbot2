import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-72 p-6 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
