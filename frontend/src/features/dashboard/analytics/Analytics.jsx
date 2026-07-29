import RevenueChart from "./RevenueChart";
import SalesTrend from "./SalesTrend";
import OrderStatusDonut from "./OrderStatusDonut";
import TopProducts from "./TopProducts";
import LowStockAlerts from "./LowStockAlerts";
import RecentOrdersTable from "./RecentOrdersTable";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <RevenueChart />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SalesTrend />
        <OrderStatusDonut />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TopProducts />
        <LowStockAlerts />
      </div>

      <RecentOrdersTable />
    </div>
  );
}