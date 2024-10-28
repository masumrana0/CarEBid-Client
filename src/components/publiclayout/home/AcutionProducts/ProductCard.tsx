import { IProduct } from "@/Interface/product";
import Image from "next/image";
import React from "react";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className="h-[23rem] w-[22rem]  rounded-t-md overflow-hidden   gap-5 ">
      <div className="w-full h-[70%]  ">
        <Image
          width={500}
          height={500}
          className="h-full w-full"
          src={product?.photos.mainPhoto}
          alt={product?.title}
        />
      </div>
      <div className="h-[30%] w-full mt-2">
        <h4 className="text-base  ">{product?.title}</h4>
        <p>
          {product?.bodyStyle},{product?.engine},{product?.make},
          {product?.model},{product?.transmission},{product?.location?.city},
          {product?.location?.zipCode}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
