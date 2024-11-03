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
        <div className="hidden lg:flex items-center lg:space-x-3 xl:space-x-4">
          <AuctionDropdown />
          <Link
            href="/"
            className="text-sm md:text-md lg:text-[1rem] tracking-tighter   font-semibold text-gray-800 bg-green-400 2xl:py-2 py-1 px-3 2xl:px-4 rounded-full hover:bg-green-500 transition-colors duration-200"
          >
            Sell a Car
          </Link>
          <Link
            href="/community"
            className="text-sm md:text-md lg:text-[1rem] tracking-tighter  font-semibold text-gray-600 hover:text-black transition-colors duration-200"
          >
            Community
          </Link>
          <Link
            href="/about"
            className="text-sm md:text-md lg:text-[1rem] tracking-tighter font-semibold text-gray-600 hover:text-black transition-colors duration-200"
          >
            What&apos;s Cars & Bids?
          </Link>
        </div>

        {/* Search Bar */}
        <NavSearchBar />

        {/* Notification and Profile */}
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <NotificationDropdown />
              <ProfileDropdown />
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
