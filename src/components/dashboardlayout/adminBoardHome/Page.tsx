import Statistic from "../dashboardStatistic/AdminStatistic";
import RevenueAndSalesChart from "../dashboardStatistic/RevenueAndSalesChart";
import ProfitChart from "../dashboardStatistic/ProfitChart";
import VisitorsAnalytics from "../dashboardStatistic/VisitorsAnalytics";

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
