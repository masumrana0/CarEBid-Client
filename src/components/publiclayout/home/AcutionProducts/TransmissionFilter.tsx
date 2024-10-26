"use client";
import { Select } from "antd";
import React from "react";

const TransmissionFilter = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
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
