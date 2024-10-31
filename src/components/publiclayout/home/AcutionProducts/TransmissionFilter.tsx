"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  generateProductQuery,
  setTransmission,
} from "@/Redux/Slices/productQuerySlice";
import { Select } from "antd";
import React from "react";

const TransmissionFilter = () => {
  const dispatch = useAppDispatch();
  // redux  update product query value

  const handleChange = (value: string) => {
    dispatch(setTransmission(value));
  };

  const query = useAppSelector((state) => state.productQueryReducer.query);
  console.log(query);
  return (
    <div>
      <Select
        placeholder={<span className="text-gray-900">Transmission</span>}
        // defaultValue="all"
        style={{ width: 130 }}
        onChange={handleChange}
        options={[
          { value: "all", label: "All" },
          { value: "autometic", label: "Autometic" },
          { value: "manual", label: "Manual" },
        ]}
      />
    </div>
  );
};

export default TransmissionFilter;
