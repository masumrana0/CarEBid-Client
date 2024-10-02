import RunningJobComponentPage from "@/components/dashboardComponents/job/runningJob/Page";
import AdminProtect from "@/components/shared/protectors/AdminProtect";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CarEBid || Running-Job ",
  description: "CarEBid Running Job Page",
};
const RunningJobPage = () => {
  return (
    <AdminProtect>
      <RunningJobComponentPage />
    </AdminProtect>
  );
};

export default RunningJobPage;
