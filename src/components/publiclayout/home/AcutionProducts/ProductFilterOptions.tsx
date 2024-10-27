import React from "react";
import TransmissionFilter from "./TransmissionFilter";
import BodyStyleFilter from "./BodyStyleFilter";
import ListedFilter from "./ListedFilter";

const ProductFilterOptions = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 bg-white w-full">
      {/* Header and Filters Section */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-6">
        {/* Title */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          Auctions
        </h3>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 lg:gap-6 w-full">
          <div className="flex  flex-row  gap-4 w-full   ">
            <TransmissionFilter />
            <BodyStyleFilter />
          </div>

          {/* Listed Filter Positioned Right on Larger Screens */}
          <div className="flex justify-start sm:justify-end w-full sm:w-auto">
            <ListedFilter />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductFilterOptions;
