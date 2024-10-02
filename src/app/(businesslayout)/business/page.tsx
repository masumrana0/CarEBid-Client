import AdminBoardHome from "@/components/dashboardComponents/adminBoardHome/Page";
import AdminProtect from "@/components/shared/protectors/AdminProtect";
import BusinessAccountProtect from "@/components/shared/protectors/BusinessAccountProtect";
import React from "react";

const HomePage = () => {
  return (
    <BusinessAccountProtect>
      <AdminBoardHome />
    </BusinessAccountProtect>
  );
};

export default HomePage;
