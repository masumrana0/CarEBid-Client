"use client";
import { useGetAllProductQuery } from "@/Redux/api/productApi";
import { useAppSelector } from "@/Redux/hooks";
import React from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/Interface/product";

const ProductsResult = () => {
  const query = useAppSelector((state) => state.productQueryReducer.query);
  const { data } = useGetAllProductQuery(query);
  const meta = data?.data?.meta;
  const products = data?.data?.data;
  console.log(products, meta);

  return (
    <div className="grid grid-cols-4 gap-6 mt-6">
      {products?.map((product: IProduct) => (
        <ProductCard key={product?._id} product={product} />
      ))}
    </div>
  );
};

export default ProductsResult;