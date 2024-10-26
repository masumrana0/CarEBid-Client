import React from "react";
import HomeSwiper from "./HomeSwiper/HomeSwiper";
import AuctionProducts from "./AcutionProducts";
import BodyStyleFilter from "./AcutionProducts/BodyStyleFilter";

const LandingHomePage = () => {
  return (
    <div>
      <HomeSwiper />
      <AuctionProducts />
    </div>
  );
};

export default LandingHomePage;
