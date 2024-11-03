/**
 * Title: 'Navar develop By Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 24-10-2024
 *
 */

"use client";
import React from "react";
import DeskTopNavbar from "./DeskTopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar: React.FC = () => {
  return (
    <header className="py-2 bg-white border-b w-full   ">
      <div className="hidden lg:block">
        <DeskTopNavbar />
      </div>
      <div className="lg:hidden w-full px-3">
        <MobileNavbar />
      </div>
    </header>
  );
};

export default Navbar;
