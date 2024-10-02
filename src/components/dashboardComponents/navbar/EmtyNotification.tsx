import Image from "next/image";
import React from "react";
import bell from "/public/assets/icons/bell.svg";

const EmtyNotifications = () => {
  return (
    <div className="flex flex-col justify-center items-center p-5  ">
      <Image src={bell} width={100} height={200} alt="bell symbol" />
      <h2 className="font-bold text-xl mt-2 text-center text-gray-600  ">
        Hey! You have no any notifications.
      </h2>
    </div>
  );
};

export default EmtyNotifications;
