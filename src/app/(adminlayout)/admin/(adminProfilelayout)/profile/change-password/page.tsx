import ChangePassword from "@/components/dashboardlayout/profile/ChangePassword";
import React from "react";

const ChanagePasswordPage = () => {
  return (
    <div className="col-span-9 bg-white shadow-lg">
      <div className="border-b-2 border-primary px-2 py-1 mb-3">
        <h3 className="font-semibold">Change Password</h3>
      </div>
      <div className="py-3 mb-5 w-full md:w-[50%]">
        <ChangePassword />
      </div>
    </div>
  );
};

export default ChanagePasswordPage;
