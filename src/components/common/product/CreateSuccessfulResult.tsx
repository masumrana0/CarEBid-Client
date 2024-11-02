"use client";
import GetRoleBasisUrl from "@/content/getRole";
import { useAppDispatch } from "@/Redux/hooks";
import { setProductFormStep } from "@/Redux/Slices/productSlice";
import { Button, Result } from "antd";
import Link from "next/link";
import React from "react";

const CreateProductSuccessfulResult = () => {
  const dispatch = useAppDispatch();
  return (
    <Result
      status="success"
      title="Product Posted Successfully"
      subTitle="Your Product is currently pending. Our team is reviewing it, which typically takes 5-10 minutes. Please wait while we complete the necessary checks."
      extra={[
        <Link href={`${GetRoleBasisUrl()}/jobs/pending-job`} key="Pendingjob">
          <Button type="primary">Pending Job</Button>
        </Link>,
        <Button
          onClick={() => dispatch(setProductFormStep(0))}
          key="post-another"
        >
          Post Another Product
        </Button>,
      ]}
    />
  );
};

export default CreateProductSuccessfulResult;
