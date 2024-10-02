"use client";
import React from "react";
import ProductCard from "@/components/publicComponents/home/shop/ProductCard";
import LoadingSpinner from "@/components/shared/spinners/loadingSpinner";
import { useGetAllProductsQuery } from "@/Redux/api/productApi";
import { IProduct } from "@/Interface/product";

const ProductComponentPage = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  const products: IProduct[] = data?.data || [];

  return (
    <div>
      <h3 className="font-bold text-2xl mb-3">All Products</h3>

      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div className="flex items-center justify-center h-screen">
          <h3 className="font-bold">Error loading products</h3>
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <h3 className="font-bold">Products not found</h3>
        </div>
      ) : (
        <div className="container grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          {products?.map((product) => (
            <div key={product?._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductComponentPage;
