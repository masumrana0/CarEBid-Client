"use client";
import React from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";

// components
import { CiSettings } from "react-icons/ci";

import { IDNavMenuItem } from "@/Interface/content";
import { toggleLayoutSidebar } from "@/Redux/Slices/dashboardLayout/layoutSlice";
import { DAdminAccountNavigation } from "@/content/DNavigationMenu";
import LeftSidebar from "@/components/dashboard/sidebar/leftSidebar";
import DashBoardNav from "@/components/dashboard/navbar";
import RightSidebar from "@/components/dashboard/sidebar/rightSidebar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  // Redux
  const dispatch = useAppDispatch();
  const layoutState = useAppSelector(
    (state) => state.layoutReducer.layoutState,
  );

  return (
    <>
      <div className="flex h-screen  overflow-hidden relative">
        {/* sidebar  */}
        <aside className={`${layoutState && "md:hidden"}`}>
          <LeftSidebar
            menuGroups={DAdminAccountNavigation as unknown as IDNavMenuItem[]}
            title="Menu"
          />
        </aside>

        {/* Nav And Content */}
        <section className="w-full h-full overflow-hidden light-darkmode">
          {/* header  */}
          <header>
            <DashBoardNav />
          </header>

          <main className=" bg-gray-100 light-darkmode md:p-5    h-[calc(100vh-55px)]   overflow-y-auto ">
            <div className="  absolute bottom-10 right-10 bg-[#4396c7] h-12 w-12 rounded-full hidden md:flex items-center justify-center z-[999999999] ">
              <button
                onClick={() => dispatch(toggleLayoutSidebar(true))}
                className="text-white  text-3xl animate-spin  "
              >
                <CiSettings />
              </button>
            </div>
            {children}
          </main>
        </section>

        <aside className="overflow-hidden  hidden md:block  ">
          <RightSidebar />
        </aside>
      </div>
    </>
  );
};

export default DashBoardLayout;
