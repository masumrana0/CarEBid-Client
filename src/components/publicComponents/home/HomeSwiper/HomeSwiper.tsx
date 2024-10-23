"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

// Import required modules
import { EffectFade, Autoplay } from "swiper/modules";
import products from "../../../../../product.json";
import { IProduct } from "@/Interface/product";
import SlideContent from "./SlideContent";
// Import navigation buttons dynamically
const SwiperNavButtons = dynamic(
  () => import("./SwiperBtn").then((mod) => mod.SwiperNavButtons),
  { ssr: false },
);

const HomeSwiper = () => {
  console.log(products);
  return (
    <div className="container mx-auto mt-3 relative">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        className="mySwiper"
      >
        {products.map((product: any) => (
          <SwiperSlide key={product?._id}>
            <SlideContent product={product} />
          </SwiperSlide>
        ))}

        {/* 
        <SwiperSlide>
          <div className="h-[30rem] w-full border rounded bg-green-500"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[30rem] w-full border rounded bg-violet-500"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[30rem] w-full border rounded bg-blue-500"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[30rem] w-full border rounded bg-orange-500"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[30rem] w-full border rounded bg-yellow-500"></div>
        </SwiperSlide> */}

        {/* Navigation buttons */}
        <SwiperNavButtons />
      </Swiper>
    </div>
  );
};

export default HomeSwiper;
