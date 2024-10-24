"use client";
import { IProduct } from "@/Interface/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SlideContent: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Link href="/" passHref>
      <div className="h-[26rem] w-full border rounded grid grid-cols-12  overflow-hidden">
        {/* Main Image */}
        <div className="col-span-7 overflow-hidden h-full">
          <Image
            className="h-full w-full bg-contain object-center"
            src={product.photos.mainPhoto}
            width={1000}
            height={500}
            alt={`Main photo of ${product.model}`}
            priority
          />
        </div>

        {/* Secondary Images */}
        <div className="col-span-5 grid grid-cols-2   h-full  ">
          {product.photos.others.slice(0, 4).map((photo, index) => (
            <div
              className="h-[13rem] overflow-hidden border-b-2 border-l-2  border-black"
              key={index}
            >
              <Image
                className="h-full w-full bg-contain object-center" // Fixes overflow and ensures image scaling
                src={photo}
                width={500}
                height={500}
                alt={`Detail image ${index + 1} of ${product.model}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default SlideContent;
