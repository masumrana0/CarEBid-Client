"use client";
import { productBodyStyle } from "@/content/product.constant";
import { useAppDispatch } from "@/Redux/hooks";
import { setBodyStyle } from "@/Redux/Slices/productQuerySlice";
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
        options={productBodyStyle}
      />
    </div>
  );
};

export default BodyStyleFilter;
