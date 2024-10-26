"use client";
import { IProduct } from "@/Interface/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SlideContent: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Link href="/" passHref>
      <div className="h-[15rem] sm:h-[18rem] lg:h-[22rem] w-full border rounded flex flex-col lg:grid grid-cols-12 overflow-hidden">
        {/* Main Image */}
        <div className="col-span-7 overflow-hidden h-1/2 lg:h-full">
          <Image
            className="h-full w-full     object-center"
            src={product.photos.mainPhoto}
            width={1000}
            height={500}
            alt={`Main photo of ${product.model}`}
            priority
          />
        </div>

        {/* Secondary Images for large screens */}
        <div className="col-span-5 hidden lg:grid grid-cols-2 h-1/2 lg:h-full">
          {product.photos.others.slice(0, 4).map((photo, index) => (
            <div
              className="h-full overflow-hidden border-b-2 border-l-2 border-black" // Changed height to full for consistent scaling
              key={index}
            >
              <Image
                className="h-full w-full object-cover object-center" // Ensure proper scaling with object-cover
                src={photo}
                width={500}
                height={500}
                alt={`Detail image ${index + 1} of ${product.model}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Secondary Images for small screens */}
        <div className="col-span-5 grid grid-cols-2 h-1/2 lg:h-full lg:hidden">
          {product.photos.others.slice(0, 2).map((photo, index) => (
            <div
              className="h-full overflow-hidden border-b-2 border-l-2 border-t-2 border-black" // Adjusted height to full
              key={index}
            >
              <Image
                className="h-full w-full object-cover object-center" // Consistent scaling with object-cover
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
