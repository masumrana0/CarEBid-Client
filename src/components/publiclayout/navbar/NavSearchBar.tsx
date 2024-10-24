import { Dropdown, MenuProps } from "antd";
import Search from "antd/es/transfer/search";
import React, { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import SearchBar from "./SearchBar";

const NavSearchBar = () => {
  // const [isOpenMobileSearchBar, setOpenMobileSearchBar] = useState(false);
  // const toggleMobileSearchBar = () => {
  //   return setOpenMobileSearchBar(!isOpenMobileSearchBar);
  // };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <SearchBar />,
    },
  ];
  return (
    <div>
      <div className="text-sm 2xl:text-md hidden lg:block">
        <SearchBar />
      </div>
      <div className="lg:hidden">
        <Dropdown menu={{ items }} placement="bottomCenter">
          <button className="text-xl font-bold">
            <HiOutlineMagnifyingGlass />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavSearchBar;
