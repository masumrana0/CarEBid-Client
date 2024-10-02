"use client";
import React from "react";
import { Table, Button, Image, Progress } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useGetSpecificUserJobOfWorkQuery } from "@/Redux/api/workOfJobApi";
import { IJob } from "@/Interface/job";

const WorkReviewComponentPage = () => {
  const { data, isLoading } = useGetSpecificUserJobOfWorkQuery();
  const allData = data?.data || [];

  // Table columns definition
  const columns: ColumnsType<any> = [
    {
      title: "Job Title",
      dataIndex: ["job", "jobTitle"],
      key: "jobTitle",
    },
    {
      title: "Category",
      dataIndex: ["job", "category", "title"],
      key: "category",
    },
    {
      title: "Price",
      dataIndex: ["job", "workerEarn"],
      key: "workerEarn",
      render: (price: number) => `${price}`,
    },
    {
      title: "Completed",
      key: "completed",
      render: (_: any, record: any) => {
        const completedJob = parseInt(record.job?.completedJob);
        const totalJob = parseInt(record.job?.workerNeeded);
        const workProgress = (completedJob / totalJob) * 100;
        return (
          <section className="flex flex-col justify-start w-[40%]">
            <h3 className="text-xs sm:text-sm md:text-md text-center">
              {completedJob} of {totalJob} done
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "200px",
              }}
            >
              <Progress percent={workProgress} />
            </div>
          </section>
        );
      },
    },
  ];

  // Expanded row render function to show work proofs and actions
  const expandedRowRender = (record: any) => {
    const workItems = record.works || [];
    return (
      <Table
        dataSource={workItems}
        pagination={false}
        columns={[
          {
            title: "Proof Title",
            dataIndex: ["proofs", "title"],
            key: "proofTitle",
            render: (text: any, workRecord: any) =>
              workRecord.proofs.map((proof: any) => (
                <div key={proof._id}>
                  <strong>{proof.title}</strong>
                </div>
              )),
          },
          {
            title: "Proof Type",
            dataIndex: ["proofs", "type"],
            key: "proofType",
            render: (text: any, workRecord: any) =>
              workRecord.proofs.map((proof: any) => (
                <div key={proof._id}>
                  <span>{proof.type}</span>
                </div>
              )),
          },
          {
            title: "Proof",
            dataIndex: ["proofs", "value"],
            key: "proofValue",
            render: (text: any, workRecord: any) =>
              workRecord.proofs.map((proof: any) => (
                <div key={proof._id}>
                  {proof.type === "screenshot proof" ? (
                    <div className="max-h-[2rem] max-w-[3rem] my-2 block">
                      <Image
                        width={100}
                        src={proof?.value}
                        alt="screen short img"
                      />
                    </div>
                  ) : (
                    <h2 className="!block">{proof?.value}</h2>
                  )}
                </div>
              )),
          },
          {
            title: "Actions",
            key: "actions",
            render: (_: any, workRecord: any) => (
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  type="primary"
                  onClick={() => handleSatisfy(workRecord, record)}
                >
                  Satisfy
                </Button>
                <Button danger onClick={() => handleReject(workRecord)}>
                  Reject
                </Button>
              </div>
            ),
          },
        ]}
        rowKey={(workItem) => workItem._id}
      />
    );
  };

  // Handlers for actions
  const handleSatisfy = (workRecord: any, job:IJob) => {
    
    // Handle satisfy action
    console.log("Satisfy work:", job, workRecord);
  };

  const handleReject = (workRecord: any) => {
    // Handle reject action
    console.log("Reject work:", workRecord);
  };

  return (
    <div>
      <h2>Work Review</h2>
      <Table
        columns={columns}
        dataSource={allData}
        loading={isLoading}
        expandable={{ expandedRowRender }}
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default WorkReviewComponentPage;
