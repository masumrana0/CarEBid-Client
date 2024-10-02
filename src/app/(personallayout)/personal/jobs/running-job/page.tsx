import RunningJobComponentPage from "@/components/dashboardComponents/job/runningJob/Page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CarEBid || Running-Job ",
  description: "CarEBid Running Job Page",
};
const RunningJobPage = () => {
  return (
    <>
      <RunningJobComponentPage />
    </>
  );
};

export default RunningJobPage;
