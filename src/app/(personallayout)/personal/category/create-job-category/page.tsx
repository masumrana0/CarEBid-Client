import React from "react";
import { Metadata } from "next";
import CreateJobCategoryComponentPage from "@/components/dashboardComponents/category/CreateJobCategoryPage";

export const metadata: Metadata = {
  title: "CarEBid || Create-job ",
  description: "CarEBid  Create Job Category Page",
};
const JobCategoyPage = () => {
  return (
    <>
      <CreateJobCategoryComponentPage />
    </>
  );
};

export default JobCategoyPage;
