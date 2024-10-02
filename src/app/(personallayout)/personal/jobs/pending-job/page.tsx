import PendingJobComponentPage from "@/components/dashboardComponents/job/pendingJob/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CarEBid || Pending-Job ",
  description: "CarEBid Pending Job Page",
};
const PendingJobPage = () => {
  return (
    <>
      <PendingJobComponentPage />
    </>
  );
};

export default PendingJobPage;
