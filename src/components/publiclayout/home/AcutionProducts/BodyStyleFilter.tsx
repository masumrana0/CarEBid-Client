"use client";
import { useAppDispatch } from "@/Redux/hooks";
import {
  generateProductQuery,
  setBodyStyle,
} from "@/Redux/Slices/productSlice";
import { Select } from "antd";
import React from "react";

const BodyStyleFilter = () => {
  // redux
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(setBodyStyle(value));
  };
  return (
    <div>
      <Select
        placeholder={<span className="text-gray-900">Body Style</span>}
        // defaultValue="all"
        style={{ width: 150 }}
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
