"use client";
import { useAppSelector } from "@/Redux/hooks";
import React from "react";

const ProductDetailsPage = ({ params }: any) => {
  const data = useAppSelector((state) => state.productReducer.selectedProduct);
  console.log(data);
  console.log(params.id);
  return <div></div>;
};

export default ProductDetailsPage;
