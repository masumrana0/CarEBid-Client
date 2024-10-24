import Logo from "@/components/shared/logo";
import React from "react";
import AuctionDropdown from "./AuctionDropdown";
import Link from "next/link";
import NavSearchBar from "./NavSearchBar";
import NotificationDropdown from "./NavNotification";
import ProfileDropdown from "./ProfileDropdown";
import NavAuth from "./NavAuth";
import { useAppSelector } from "@/Redux/hooks";

const DeskTopNavbar = () => {
  // checking is Loggedin
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  return (
    <div>
      <nav className="container mx-auto flex items-center justify-between w-full">
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center lg:space-x-3 2xl:space-x-6">
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
            What&apos;s Cars & Bids?
          </Link>
        </div>

        {/* Search Bar */}
        <NavSearchBar />

        {/* Notification and Profile */}
        <div className="flex items-center gap-8">
          {isLoggedIn ? (
            <>
              <NotificationDropdown />
              <ProfileDropdown />{" "}
            </>
          ) : (
            <NavAuth />
          )}
        </div>
      </nav>
    </div>
  );
};

export default DeskTopNavbar;
