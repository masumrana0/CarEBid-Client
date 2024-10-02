"use client";
import FormSelect from "@/components/shared/inputs/FormSelect";
import PageLoader from "@/components/shared/spinners/PageLoader";
import { paginationPageOptions } from "@/content/pagination";
import { IJob } from "@/Interface/job";

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { generateJobQuery, setLimit } from "@/Redux/Slices/jobQuerySlice";
import { useEffect, useState } from "react";
import JobCardR from "./JobCardR";
import { useGetAllRejectJobQuery } from "@/Redux/api/jobApi";

const RejectJobComponentPage = () => {
  // State for pagination page selection
  const [page, setPage] = useState("show 10");

  // Redux hooks
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.jobqueryReducer.query);
  const { data, isLoading } = useGetAllRejectJobQuery(query);
  const meta = data?.data?.meta;
  const allJobs = data?.data?.data;

  // Update limit and generate job query whenever the page selection changes
  useEffect(() => {
    const limit = parseInt(page.split(" ")[1], 10);
    dispatch(setLimit(limit));
    dispatch(generateJobQuery());
  }, [page, dispatch]);

  return (
    <div className=" space-y-3  w-full container mx-auto">
      {/* Pagination page selection */}
      <div className="max-w-32 mt-5 md:mt-0">
        <FormSelect
          defaultValue="Show 10"
          dropdownOverlayStyle="max-h-96"
          placeholder="Show 10"
          optionStyle="py-1"
          setValue={setPage}
          options={paginationPageOptions}
        />
      </div>

      {/* Jobs section */}
      {isLoading ? (
        <PageLoader className="h-[calc(100vh-490px)] md:h-[calc(100vh-530px)] overflow-hidden" />
      ) : allJobs?.length === 0 ? (
        <div className="h-[calc(100vh-490px)] md:h-[calc(100vh-530px)] flex items-center justify-center">
          <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-center capitalize ">
            No Reject job available
          </h3>
        </div>
      ) : (
        <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5   ">
          {allJobs?.map((job: IJob) => <JobCardR job={job} key={job?._id} />)}
        </div>
      )}
    </div>
  );
};

export default RejectJobComponentPage;
