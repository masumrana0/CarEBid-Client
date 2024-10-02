/* eslint-disable react/no-children-prop */
"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// icons
import { CgMenuLeft } from "react-icons/cg";
import { HiArrowLongLeft } from "react-icons/hi2";
// components
import Avatar from "@/components/shared/avatar";
import Logo from "@/components/shared/logo";
import { IDNavMenuItem } from "@/Interface/content";
import { getTokenInfo } from "@/service/auth.service";

// redux
import getProfileUrl from "@/content/getProfileUrl";
import { setLogOut } from "@/Redux/Slices/authSlice";
import { sidebarToggle } from "@/Redux/Slices/dashboardLayout/layoutSlice";
import { useRouter } from "next/navigation";
import { TbLogout } from "react-icons/tb";
import LeftSidebarDropdown from "./leftSidebarDropdown";

// sidebar props interface
interface ISidebarProps {
  title?: string;
  menuGroups: IDNavMenuItem[];
}

const LeftSidebar: React.FC<ISidebarProps> = ({ menuGroups, title }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  // redux
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(
    (state) => state.layoutReducer.isOpenSideBar,
  );
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  const tokenInfo = getTokenInfo();
  const handleLogOut = () => {
    dispatch(setLogOut());
    router.push("/auth/signin");
  };

  return (
    <aside
      className={`${
        isSidebarOpen
          ? "w-[14rem]"
          : "md:w-[5rem]  opacity-0  pointer-events-none   md:pointer-events-auto md:opacity-100     "
      } !transition-all !ease-in-out  !duration-300 h-full  absolute md:sticky top-0 left-0  z-[9999999999]  text-[1rem]  text-gray-300   bg-[#1d1e4b]  `}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center flex-col  justify-center gap-2   w-full">
        <div>
          {(tokenInfo?.role === "admin" ||
            tokenInfo?.role === "super_admin") && (
            <Link href="/">
              <Logo className={` ${isSidebarOpen ? "rounded-lg" : ""}`} />
            </Link>
          )}

          {tokenInfo?.role === "customer" && (
            <Link href={getProfileUrl(tokenInfo)}>
              <Avatar
                className={` ${isSidebarOpen ? "h-16 w-16" : "h-8 w-8"}  flex items-center justify-center mt-5 text-3xl bg-white `}
              />
            </Link>
          )}
        </div>
        <button
          className="  text-3xl top-4 lg:hidden p-5"
          onClick={() => dispatch(sidebarToggle())}
        >
          {isSidebarOpen ? (
            <span>
              <HiArrowLongLeft />
            </span>
          ) : (
            <span className="md:block hidden">
              <CgMenuLeft />
            </span>
          )}
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto h-[calc(100vh-130px)] duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <section className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/*  Sidebar Menu title  */}
          {!!title && isSidebarOpen && (
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">
              {title}
            </h3>
          )}

          {/* Sidebar Menu Nav  */}
          <nav className="space-y-4">
            {menuGroups?.map((group, groupIndex) => (
              <div key={groupIndex}>
                {group.children ? (
                  <LeftSidebarDropdown
                    isSidebarOpen={isSidebarOpen}
                    children={group.children as []}
                    icon={group.icon}
                    label={group.label}
                  />
                ) : (
                  <Link
                    className="flex items-center text-sm  text-nowrap gap-2 hover:text-white color-transition"
                    href={group.route || "/"}
                  >
                    <span className={`${!isSidebarOpen && "text-xl"}`}>
                      {group.icon && group.icon}
                    </span>
                    <span className={`${!isSidebarOpen && "hidden"}`}>
                      {group.label}
                    </span>
                  </Link>
                )}
              </div>
            ))}

            <button
              onClick={handleLogOut}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <span className={`${!isSidebarOpen ? "text-[22px]" : ""}`}>
                  <TbLogout />
                </span>
                <span
                  className={`${!isSidebarOpen ? "hidden" : "text-sm text-nowrap"}`}
                >
                  Logout
                </span>
              </div>
            </button>
          </nav>
        </section>
      </div>
    </aside>
  );
};

export default LeftSidebar;
