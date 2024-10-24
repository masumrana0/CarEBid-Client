"use client";
import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import Logo from "@/components/shared/logo";
import { useAppSelector } from "@/Redux/hooks";
import ProfileDropdown from "./ProfileDropdown";
import NavAuth from "./NavAuth";
import { Drawer } from "antd";
import AuctionDropdown from "./AuctionDropdown";
import Link from "next/link";
import NotificationDropdown from "./NavNotification";
import NavSearchBar from "./NavSearchBar";

const MobileNavbar = () => {
  // Get the logged-in state from the Redux store
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);

  // State to manage the mobile menu visibility
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between w-full relative">
      {/* Logo */}
      <Logo />

      {/* Right-side navigation */}
      <div className="flex items-center gap-3">
        {/* Profile or Authentication links */}
        <NavSearchBar />
        {isLoggedIn ? (
          <>
            <NotificationDropdown />
            <ProfileDropdown />{" "}
          </>
        ) : (
          <NavAuth />
        )}

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="text-2xl hover:text-primary transition-colors duration-300"
          aria-label="Toggle mobile menu"
        >
          <CiMenuFries />
        </button>
      </div>

      <Drawer
        width={200}
        title={
          <h2 className="font-bold text-md ">
            <span className="border-l-8 rounded border-primary pl-1 ml-8  overflow-hidden"></span>{" "}
            <span>Menu</span>
          </h2>
        }
        onClose={toggleMenu}
        open={isMenuOpen}
      >
        <div className=" flex items-start gap-2 flex-col  ">
          <AuctionDropdown />
          <Link
            href="/"
            className="lg:text-md 2xl:text-lg font-semibold text-gray-800 bg-green-400 2xl:py-2 py-1 px-3 2xl:px-4 rounded-full hover:bg-green-500 transition-colors duration-200"
          >
            Sell a Car
          </Link>
          <Link
            href="/community"
            className="lg:text-md 2xl:text-lg font-semibold text-gray-600 hover:text-black transition-colors duration-200"
          >
            Community
          </Link>
          <Link
            href="/about"
            className="lg:text-md 2xl:text-lg font-semibold text-gray-600 hover:text-black transition-colors duration-200"
          >
            What&apos;s CarsEBids?
          </Link>
        </div>
      </Drawer>
    </nav>
  );
};

export default MobileNavbar;
