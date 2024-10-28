"use client";
import React, { useEffect, useState } from "react";

import { IUser } from "@/Interface/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PageLoader from "@/components/shared/spinners/PageLoader";
import { useAppSelector } from "@/Redux/hooks";
import EmailVerificationAlert from "@/components/dashboardlayout/profile/EmailVerificationAlert";
import ProfilePictureUploader from "@/components/dashboardlayout/profile/ProfilePictureUploader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // State to handle client-side rendering
  const [isClient, setIsClient] = useState(false);
  // const { isLoading, profileInfo } = GetUserInfo();
  const profileInfo = useAppSelector((state) => state.authReducer.profile);
  const pathname = usePathname();

  // Set client-side flag after initial render
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null while client-side rendering flag is false
  if (!isClient) {
    return <PageLoader />;
  }

  return (
    <div className="bg-gray-100">
      {/* showing email verification warning  */}
      <div>{!profileInfo?.isEmailVerified && <EmailVerificationAlert />}</div>
      <div className="container mx-auto py-1">
        {/* Profile Header Section */}
        <section>
          <div className="bg-[#1b324c] w-full">
            <div className="flex flex-col items-center justify-center py-10">
              {/* Profile Avatar and Picture Uploader */}
              <ProfilePictureUploader user={profileInfo as IUser} />
              {/* Profile Name */}
              <h3 className="font-bold text-white mt-2">{profileInfo?.name}</h3>
              {/* Profile Role and Account Type */}
              <p className="text-sm text-gray-300">{profileInfo?.role}</p>
              {profileInfo?.accountType && (
                <p className="text-sm text-gray-300">
                  Type: {profileInfo?.accountType}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Balance Summary Section */}
        <section className="bg-dark text-white py-3 flex items-center justify-evenly">
          {/* Total Balance */}
          {/* <div className="text-center">
            <h2 className="font-bold text-xs">
             
            </h2>
            <p className="text-xs lg:text-sm font-semibold">Total Balance</p>
          </div> */}
          {/* Earning Balance */}
          {/* <div className="text-center">
            <h2 className="font-bold text-xs">
              {profileInfo?.earningBalance} &#x09F3;
            </h2>
            <p className="text-xs lg:text-sm font-semibold">Earning Balance</p>
          </div> */}
          {/* Total Tasks Completed */}
          {/* <div className="text-center">
            <h2 className="font-bold text-xs">0</h2>
            <p className="text-xs lg:text-sm font-semibold"> Tasks Completed</p>
          </div> */}
        </section>

        {/* Navigation and Profile Info Section */}
        <div className="grid grid-cols-12 mt-3 md:mt-10 md:gap-5">
          {/* Sidebar Navigation */}
          <div className="flex sm:flex-row flex-col items-center text-left justify-center md:block  col-span-12 md:col-span-3 border bg-white shadow-lg md:h-52">
            <Link href={"/admin/profile"}>
              <button
                className={`text-xs border-y w-full text-left  p-2 ${
                  pathname === "/admin/profile" && "bg-primary text-white"
                }`}
              >
                User Details / update
              </button>
            </Link>
            <Link href={"/admin/profile/account-history"}>
              <button
                className={`text-xs border-y w-full text-left  p-2 ${
                  pathname === "/admin/profile/account-history" &&
                  "bg-primary text-white"
                }`}
              >
                Account History
              </button>
            </Link>
            <Link href={"/admin/profile/deposit"}>
              <button
                className={`text-xs border-y w-full text-left  p-2 ${
                  pathname === "/admin/profile/deposit" &&
                  "bg-primary text-white"
                }`}
              >
                Deposit
              </button>
            </Link>
            <Link className="w-full" href={"/admin/profile/withdraw"}>
              <button
                className={`text-xs border-y w-full text-left  p-2 ${
                  pathname === "/admin/profile/withdraw" &&
                  "bg-primary text-white"
                }`}
              >
                Withdraw
              </button>
            </Link>
            <Link href={"/admin/profile/change-password"}>
              <button
                className={`text-xs border-y w-full text-left  p-2 ${
                  pathname === "/admin/profile/change-password" &&
                  "bg-primary text-white"
                }`}
              >
                Change Password
              </button>
            </Link>
          </div>

          {/* Profile Info Details */}
          <div className="col-span-12 md:col-span-9  ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
