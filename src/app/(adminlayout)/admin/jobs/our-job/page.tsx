import OurJobComponentPage from "@/components/dashboardComponents/job/ourJob/Page";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "CarEBid || our-job ",
  description: "CarEBid  Create Job Page",
};

const OurJobPage = () => {
  return (
    <>
      <OurJobComponentPage />
    </>
  );
};

export default OurJobPage;
