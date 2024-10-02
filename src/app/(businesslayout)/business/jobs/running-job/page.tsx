import RunningJobComponentPage from "@/components/dashboardComponents/job/runningJob/Page";
import BusinessAccountProtect from "@/components/shared/protectors/BusinessAccountProtect";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CarEBid || Running-Job ",
  description: "CarEBid Running Job Page",
};
const RunningJobPage = () => {
  return (
    <BusinessAccountProtect>
      <RunningJobComponentPage />
    </BusinessAccountProtect>
  );
};

export default RunningJobPage;
