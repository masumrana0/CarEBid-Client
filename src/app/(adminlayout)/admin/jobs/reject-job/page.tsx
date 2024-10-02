import RejectJobComponentPage from "@/components/dashboardComponents/job/rejectlJob/Page";
import AdminProtect from "@/components/shared/protectors/AdminProtect";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CarEBid ||  Reject-Job ",
  description: "CarEBid Reject Job Page",
};
const RejectJobPage = () => {
  return (
    <AdminProtect>
      <RejectJobComponentPage />
    </AdminProtect>
  );
};

export default RejectJobPage;
