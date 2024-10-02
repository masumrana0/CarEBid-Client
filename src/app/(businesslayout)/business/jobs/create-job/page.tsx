import dynamic from "next/dynamic";
import React from "react";
import { Metadata } from "next";
import BusinessAccountProtect from "@/components/shared/protectors/BusinessAccountProtect";
const CreateJobComponentPage = dynamic(
  () => import("../../../../../components/job/CreateJob"),
  { ssr: false },
);

export const metadata: Metadata = {
  title: "CarEBid || Create-job ",
  description: "CarEBid  Create Job Page",
};

const CreateJobPage = () => {
  return (
    <BusinessAccountProtect>
      <CreateJobComponentPage />
    </BusinessAccountProtect>
  );
};

export default CreateJobPage;
