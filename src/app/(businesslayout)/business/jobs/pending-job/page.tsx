import PendingJobComponentPage from "@/components/dashboardComponents/job/pendingJob/Page";
import BusinessAccountProtect from "@/components/shared/protectors/BusinessAccountProtect";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CarEBid || Pending-Job ",
  description: "CarEBid Pending Job Page",
};
const PendingJobPage = () => {
  return (
    <BusinessAccountProtect>
      <PendingJobComponentPage />
    </BusinessAccountProtect>
  );
};

export default PendingJobPage;
