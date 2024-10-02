"use client";
import cn from "@/lib/cn";
import Image from "next/image";
import React from "react";
import { FiUser } from "react-icons/fi";

const Avatar: React.FC<{ src?: string; className?: string }> = ({
  src,
  className,
}) => {
  return (
    <div
      className={cn(
        "text-2xl text-primary w-10 h-10 rounded-full border overflow-hidden",
        className,
      )}
    >
      {src ? (
        <Image
          className="w-full h-full rounded-full object-cover"
          src={src}
          width={400}
          height={400}
          alt="user profile avatar"
        />
      ) : (
        <span className="flex items-center justify-center w-full h-full">
          <FiUser />
        </span>
      )}
    </div>
  );
};

export default Avatar;
