import Statistic from "../dashboard/AdminStatistic";
import RevenueAndSalesChart from "../dashboard/RevenueAndSalesChart";
import ProfitChart from "../dashboard/ProfitChart";
import VisitorsAnalytics from "../dashboard/VisitorsAnalytics";

const AdminBoardHome = () => {
  return (
    <div>
      <section>
        <Statistic />
      </section>
      <section className="mt-10  grid grid-cols-12 items-center gap-5 ">
        <RevenueAndSalesChart />
        <ProfitChart />

        <VisitorsAnalytics />
      </section>
    </div>
  );
};

export default AdminBoardHome;
