import dynamic from "next/dynamic";
import React from "react";
import { Metadata } from "next";
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
    <>
      <CreateJobComponentPage />
    </>
  );
};

export default CreateJobPage;
