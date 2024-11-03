import { IProduct } from "@/Interface/product";
import { useAppDispatch } from "@/Redux/hooks";
import { setSelectedProduct } from "@/Redux/Slices/productSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const dispatch = useAppDispatch();
  return (
    <Link href={`/product/${product?._id}`}>
      <div
        onClick={() => dispatch(setSelectedProduct(product))}
        className="h-[22rem] sm:w-[22rem] w-[19rem]  rounded  shadow-lg overflow-hidden   gap-5 "
      >
        <div className="w-full h-[70%]  ">
          <Image
            width={500}
            height={500}
            className="h-full w-full"
            src={product?.photos.mainPhoto}
            alt={product?.title}
          />
        </div>
        <div className="h-[30%] w-full mt-2 px-3">
          <h4 className="text-md font-bold text-gray-900 ">{product?.title}</h4>
          <p className="text-sm  text-gray-900">
            {product?.bodyStyle},{product?.engine},{product?.make},
            {product?.model},{product?.transmission},{product?.location?.city},
          </p>
          <p className="text-sm text-gray-500 mt-0.5 ">
            {product.make}, {product?.location?.zipCode}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
