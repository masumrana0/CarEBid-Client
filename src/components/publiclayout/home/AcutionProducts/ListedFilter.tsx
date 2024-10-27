"use client";
import React, { useState } from "react";

const ListedFilter = () => {
  const [isEndingSoon, setIsEndingSoon] = useState(true);
  return (
    <div className="flex items-center gap-5">
      <button
        onClick={() => setIsEndingSoon(true)}
        className={`text-nowrap font-medium text-xs md:text-sm lg:text-base border border-gray-900 px-2 py-[1px] rounded-md hover:bg-gray-900 ${isEndingSoon && "bg-gray-900 text-white"} hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400  `}
      >
        Ending Soon
      </button>
      <button
        onClick={() => setIsEndingSoon(false)}
        className={`text-nowrap font-medium text-xs md:text-sm lg:text-base border border-gray-900 px-2 py-[1px] rounded-md hover:bg-gray-900 ${!isEndingSoon && "bg-gray-900 text-white"} hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400`}
      >
        Newly Listed
      </button>
    </div>
  );
};

export default ListedFilter;
