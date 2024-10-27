import React from "react";
import HomeSwiper from "./HomeSwiper/HomeSwiper";
import AuctionProducts from "./AcutionProducts";
import BodyStyleFilter from "./AcutionProducts/BodyStyleFilter";

const LandingHomePage = () => {
  return (
    <div className="container mx-auto">
      <HomeSwiper />
      <AuctionProducts />
    </div>
  );
};

export default LandingHomePage;
