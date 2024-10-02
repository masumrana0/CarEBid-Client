"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setOpenLeftSidebar } from "@/Redux/Slices/dashboardLayout/layoutSlice";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import NavProfile from "./DNavPrfile";
import NavNotification from "./NavNotification";
import ScreenMode from "./ScreenMode";
import { useEffect, useState } from "react";

const NavTopSection = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.layoutReducer.isOpenSideBar);
  const layoutState = useAppSelector(
    (state) => state.layoutReducer.layoutState,
  );

  return (
    <div
      className={`${
        layoutState && ""
      } w-full px-5 flex items-center justify-center lg:justify-between bg-blue-100 z-[999999]`}
    >
      {/* Left section  */}
      <section className="h-full flex items-center sm:gap-2 mr-2">
        <button
          className={`text-3xl sm:block md:hidden lg:block ${
            layoutState && "lg:hidden"
          }`}
          onClick={() => dispatch(setOpenLeftSidebar())}
        >
          {isOpen ? (
            <span className="text-gray-500">
              <CgMenuRight />
            </span>
          ) : (
            <span className="text-gray-500">
              <CgMenuLeft />
            </span>
          )}
        </button>
      </section>

      {/* Right Section */}
      <section className="flex items-center sm:gap-2">
        <NavNotification />
        <ScreenMode />
        <NavProfile />
      </section>
    </div>
  );
};

export default NavTopSection;
