"use client";
import { Select } from "antd";
import React from "react";

const BodyStyleFilter = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <Select
        placeholder={<span className="text-gray-900">Body Style</span>}
        // defaultValue="all"
        style={{ width: 110 }}
        onChange={handleChange}
        options={[
          { value: "all", label: "All" },
          { value: "coupe", label: "Coupe" },
          { value: "convertible", label: "Convertible" },
          { value: "hatchback", label: "Hatchback" },
          { value: "sedan", label: "Sedan" },
          { value: "suv/crossover", label: "SUV/Crossover" },
          { value: "truck", label: "Truck" },
          { value: "van/minivan", label: "Van/Minivan" },
          { value: "wagon", label: "Wagon" },
        ]}
      />
    </div>
  );
};

export default BodyStyleFilter;
