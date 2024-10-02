import RejectJobComponentPage from "@/components/dashboardComponents/job/rejectlJob/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CarEBid ||  Reject-Job ",
  description: "CarEBid Reject Job Page",
};
const RejectJobPage = () => {
  return (
    <>
      <RejectJobComponentPage />
    </>
  );
};

export default RejectJobPage;
