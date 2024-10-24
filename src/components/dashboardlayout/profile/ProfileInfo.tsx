import React from "react";
import UpdateEmail from "./UpdateEmail";
import UpdateContactNo from "./UpdateContentNo";
import UpdateName from "./UpdateName";
import { IUser } from "@/Interface/user";
import { formatDate } from "@/components/shared/custom/FormatDate";

const ProfileInfo: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className=" px-5 sm:px-8 bg-white  w-full">
      <h2 className="text-xl    text-gray-800   font-bold mb-5">Info</h2>
      <div className="space-y-2 w-full">
        {/* user name  */}
        <div className="w-full flex items-center justify-between gap-5 border-y shadow-sm py-2 ">
          <h2 className="font-[500]  w-full text-xs sm:text-sm  md:text-md text-nowrap">
            Name :
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="font-bold  w-full  text-xs  sm:text-sm    text-nowrap ">
              {user?.name}
            </h3>
            <UpdateName />
          </div>
        </div>

        {/* user  Email  */}
        <div className="w-full flex items-center justify-between gap-5 border-y shadow-sm py-2 ">
          <h2 className="font-[500] w-full  text-xs  sm:text-sm  text-nowrap  ">
            E-mail :
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="font-bold  w-full  text-xs  sm:text-sm  text-nowrap ">
              {user?.email}
            </h3>
            <UpdateEmail />
          </div>
        </div>

        {/* user   Contact  */}
        <div className="w-full flex items-center justify-between gap-5 border-y shadow-sm py-2 ">
          <h2 className="font-[500]  w-full text-xs sm:text-sm    text-nowrap ">
            Contact :
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="font-bold  w-full  text-xs  sm:text-sm   text-nowrap ">
              {user?.contactNo}
            </h3>
            <UpdateContactNo />
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-5 border-y shadow-sm py-2 ">
          <h2 className="font-[500]  w-full text-xs sm:text-sm  md:text-md text-nowrap ">
            Role :
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="font-bold  w-full  text-xs  sm:text-sm    text-nowrap ">
              {user?.role}
            </h3>
          </div>
        </div>

        {user?.role == "customer" && (
          <div className="w-full flex items-center justify-between gap-5 border-y shadow-sm py-2 ">
            <h2 className="font-[500]  w-full text-xs sm:text-sm  md:text-md  text-nowrap ">
              AccountType :
            </h2>
            <div className="flex items-center gap-2">
              <h3 className="font-bold  w-full  text-xs  sm:text-sm  text-nowrap ">
                {user?.accountType}
              </h3>
            </div>
          </div>
        )}

        {/* user joiningDate  */}
        <div className="w-full flex items-center justify-between gap-5 border-y shadow-sm py-2 ">
          <h2 className="font-[500]  w-full text-xs sm:text-sm    text-nowrap ">
            Joining Date :
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="font-bold  w-full  text-xs  sm:text-sm     text-nowrap ">
              {formatDate(user?.updatedAt as string)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
