import { IJob } from "@/Interface/job";
import { useDeleteRejectJobMutation } from "@/Redux/api/jobApi";
import { useAppSelector } from "@/Redux/hooks";
import { getTokenInfo } from "@/service/auth.service";
import {
  Button,
  Dropdown,
  Flex,
  MenuProps,
  message,
  Popconfirm,
  Progress,
} from "antd";
import Link from "next/link";
import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { GiLevelEndFlag } from "react-icons/gi";
import { TbWorld } from "react-icons/tb";

interface JobCardRProps {
  job: IJob;
}

const JobCardRun: React.FC<JobCardRProps> = ({ job }) => {
  const tokenInfo = getTokenInfo();
  const isLoggedin = useAppSelector((state) => state.authReducer.isLoggedIn);

  const [deleteJob, { isLoading: isDeleteLoading }] =
    useDeleteRejectJobMutation();

  const completedJob = parseInt(job?.completedJob as any);
  const totalJob = parseInt(job?.workerNeeded as any);
  const workProgress = (completedJob / totalJob) * 100;
  const jobId = job?._id as string;

  const handleDelete = async () => {
    try {
      await deleteJob(jobId).unwrap();
      message.success("Job deleted successfully.");
    } catch (error) {
      message.error("Failed to delete the job.");
    }
  };

  return (
    <div className="max-w-[30rem] shadow-lg rounded-lg shadow-blue-100 bg-white relative">
      <Link
        className="block mx-1 md:mx-0 py-3 md:px-5 px-2 border relative w-full"
        href="/"
      >
        <section className="flex items-center gap-3">
          {job?.showInterval && (
            <h3 className="text-white text-sm bg-[#ef7403] inline-block px-2 py-0.5 rounded-xl">
              Featured
            </h3>
          )}
          <h3 className="text-white text-sm py-0.5 bg-primary inline-block px-2 rounded-xl">
            {job?.category?.title}
          </h3>
        </section>

        <section className="flex items-center justify-between w-full mt-2">
          <h2 className="text-sm md:text-base lg:text-lg text-gray-800 px-2 py-1 rounded-lg">
            {job?.jobTitle}
          </h2>
          <h2 className="font-bold text-md">&#2547; {job?.workerEarn}</h2>
        </section>

        <section className="flex flex-col justify-start w-[80%] mt-2">
          <h3 className="text-xs sm:text-sm md:text-md text-center">
            {job?.completedJob} of {job?.workerNeeded} done
          </h3>
          <Flex gap="small" vertical>
            <Progress percent={workProgress} />
          </Flex>
        </section>

        <section className="flex items-center gap-3 mt-5">
          <h4 className="flex items-center text-xs md:text-md lg:text-base gap-1">
            <TbWorld className="text-primary text-sm md:text-lg lg:text-xl" />
            {job?.region}
          </h4>
          <h4 className="flex items-center text-xs md:text-md lg:text-base gap-1">
            <GiLevelEndFlag className="text-primary text-sm md:text-lg lg:text-xl" />
            <span>Level - Free</span>
          </h4>
        </section>
      </Link>

      {/* <section className="w-full flex items-center justify-center space-x-4 mt-2">
        <Popconfirm
          title="Cancel the job"
          description="Are you sure you want to cancel this job?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleDelete}
        >
          <Button
            danger
            type="primary"
            disabled={isDeleteLoading}
            className="text-sm font-semibold text-gray-700 w-full bg-white hover:bg-red-500 hover:text-white py-2 rounded-md"
          >
            Delete
          </Button>
        </Popconfirm>
      </section> */}
    </div>
  );
};

export default JobCardRun;
