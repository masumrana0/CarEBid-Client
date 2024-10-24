import React from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const NavSearchBar = () => {
  return (
    <div className="text-sm 2xl:text-md flex items-center gap-1 2xl:gap-3 w-full lg:w-[320px] 2xl:w-[500px] 2xl:py-4 py-3 px-3 bg-gray-200 rounded   text-gray-950">
      <HiOutlineMagnifyingGlass className="text-xl 2xl:text-2xl" />
      <input
        className="outline-none border-none bg-inherit w-full text-inherit text-black"
        type="text"
        placeholder="Search for cars (ex, BMW, Audi, Ford)"
      />
    </div>
  );
};

export default NavSearchBar;
