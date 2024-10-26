import React from "react";
import ProductFilter from "./ProductFilterOptions";

const AuctionProducts = () => {
  return (
    <div>
        <h3 className="font-bold text-xl md:text-2xl lg:text-3xl my-5" >Auctions</h3>
      <ProductFilter />
    </div>
  );
};

export default AuctionProducts;
