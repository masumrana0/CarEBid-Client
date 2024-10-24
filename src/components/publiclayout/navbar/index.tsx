/**
 * Title: 'Navar develop By Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 24-10-2024
 *
 */

"use client";
import Logo from "@/components/shared/logo";
import React from "react";
import AuctionDropdown from "./AuctionDropdown";
import Link from "next/link";
import NavSearchBar from "./NavSearchBar";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NavNotification";
import NavAuth from "./NavAuth";
import { useAppSelector } from "@/Redux/hooks";
import DeskTopNavbar from "./DeskTopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar: React.FC = () => {
  // checking is Loggedin
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);

  return (
    <header className="py-2 bg-white border-b w-full   ">
      <div className="hidden lg:block">
        <DeskTopNavbar />
      </div>
      <div className="lg:hidden w-full">
        <MobileNavbar />
      </div>
    </header>
  );
};

export default Navbar;
