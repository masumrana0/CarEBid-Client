import React from 'react';
import { useSwiper } from 'swiper/react';
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

export const SwiperNavButtons = () => {
    const swiper = useSwiper();

    return (
        <div className=" bg-[#e5dfd9] w-12 h-8 space-x-1 absolute top-[93%] transform -translate-y-1/2   right-5 flex justify-center items-center     rounded z-10 ">
            <button className='font-bold text-xl hover:text-2xl transition-transform duration-300  text-gray-600 hover:text-gray-800' onClick={() => swiper.slidePrev()}> <AiOutlineLeft /></button>
            <button className='font-bold text-xl hover:text-2xl transition-transform duration-300  text-gray-600 hover:text-gray-800' onClick={() => swiper.slideNext()}> <AiOutlineRight /></button>
        </div>
    );
};
