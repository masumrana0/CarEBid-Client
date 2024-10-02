import React from "react";
import RevenueAndSalesChart from "../dashboard/RevenueAndSalesChart";
import ProfitChart from "../dashboard/ProfitChart";
import BusinessAccountStatistic from "../dashboard/BusinessAccountStatistic";

const BusinessBoardHome = () => {
  return (
    <div>
      <section>
        <BusinessAccountStatistic />
      </section>
      <section className="mt-10  grid grid-cols-12 items-center gap-5 ">
        <RevenueAndSalesChart />
        <ProfitChart />
      </section>
    </div>
  );
};

export default BusinessBoardHome;
