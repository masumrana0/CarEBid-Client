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

const Navbar: React.FC = () => {
  // checking is Loggedin
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);

  return (
    <header className="py-2 bg-white border-b  ">
      <nav className="container mx-auto flex items-center justify-between w-full">
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <AuctionDropdown />
          <Link
            href="/"
            className="text-lg font-semibold text-gray-800 bg-green-400 py-2 px-4 rounded-full hover:bg-green-500 transition-colors duration-200"
          >
            Sell a Car
          </Link>
          <Link
            href="/community"
            className="text-lg font-semibold text-gray-600 hover:text-black transition-colors duration-200"
          >
            Community
          </Link>
          <Link
            href="/about"
            className="text-lg font-semibold text-gray-600 hover:text-black transition-colors duration-200"
          >
            What&apos;s Cars & Bids?
          </Link>
        </div>

        {/* Search Bar */}
        <NavSearchBar />

        {/* Notification and Profile */}
        <div className="flex items-center gap-8">
          <NotificationDropdown />
          {isLoggedIn ? <ProfileDropdown /> : <NavAuth />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
