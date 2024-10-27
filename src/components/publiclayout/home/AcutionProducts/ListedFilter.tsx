"use client";
import { useAppDispatch } from "@/Redux/hooks";
import { setSorting } from "@/Redux/Slices/productSlice";
import React, { useState } from "react";

const ListedFilter = () => {
  const [isEndingSoon, setIsEndingSoon] = useState(true);
  // redux
  const dispatch = useAppDispatch();
  const handleAddingSortingQuery = (query: "endingSoon" | "newlyListed") => {
    if (query == "endingSoon") {
      dispatch(setSorting(query));
      setIsEndingSoon(true);
    } else if (query == "newlyListed") {
      dispatch(setSorting(query));
      setIsEndingSoon(false);
    }
    return;
  };
  return (
    <div className="flex items-center gap-5">
      <button
        onClick={() => handleAddingSortingQuery("endingSoon")}
        className={`text-nowrap font-medium text-xs md:text-sm lg:text-base border border-gray-900 px-2 py-[1px] rounded-md hover:bg-gray-900 ${isEndingSoon && "bg-gray-900 text-white"} hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400  `}
      >
        Ending Soon
      </button>
      <button
        onClick={() => handleAddingSortingQuery("newlyListed")}
        className={`text-nowrap font-medium text-xs md:text-sm lg:text-base border border-gray-900 px-2 py-[1px] rounded-md hover:bg-gray-900 ${!isEndingSoon && "bg-gray-900 text-white"} hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400`}
      >
        Newly Listed
      </button>
    </div>
  );
};

export default ListedFilter;
