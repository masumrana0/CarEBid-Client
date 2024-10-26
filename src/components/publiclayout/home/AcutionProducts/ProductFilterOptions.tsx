import React from "react";
import TransmissionFilter from "./TransmissionFilter";
import BodyStyleFilter from "./BodyStyleFilter";

const ProductFilterOptions = () => {
  return (
    <div className="mt-5">
      <section className="flex items-center gap-5">
        <TransmissionFilter />
        <BodyStyleFilter />
      </section>
    </div>
  );
};

export default ProductFilterOptions;
