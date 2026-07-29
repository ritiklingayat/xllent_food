import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import useRole from "@/features/auth/hooks/useRole";
import { canAccessWidget } from "../permissions/widgetPermissions";

import WidgetContainer from "./WidgetContainer";

import RevenueChart from "../analytics/RevenueChart";
import SalesTrend from "../analytics/SalesTrend";
import OrderStatusDonut from "../analytics/OrderStatusDonut";
import TopProducts from "../analytics/TopProducts";
import RecentOrdersTable from "../analytics/RecentOrdersTable";
import LowStockAlerts from "../analytics/LowStockAlerts";

import InventoryHealth from "./InventoryHealth";
import ActivityTimeline from "./ActivityTimeline";

const widgetMeta = {
  revenue: {
    title: "Revenue Analytics",
    subtitle: "Revenue overview for the selected period",
  },
  salesTrend: {
    title: "Sales Trend",
    subtitle: "Daily and monthly sales performance",
  },
  orderStatus: {
    title: "Order Status",
    subtitle: "Current order distribution",
  },
  topProducts: {
    title: "Top Products",
    subtitle: "Best selling products",
  },
  recentOrders: {
    title: "Recent Orders",
    subtitle: "Latest customer orders",
  },
  lowStock: {
    title: "Low Stock Alerts",
    subtitle: "Products requiring replenishment",
  },
  inventory: {
    title: "Inventory Health",
    subtitle: "Warehouse inventory overview",
  },
  activity: {
    title: "Recent Activity",
    subtitle: "Latest ERP activities",
  },
};

export default function WidgetRenderer({ widget }) {
  const role = useRole();

  const dashboardData = useSelector((state) => state.dashboard);

  const [loading, setLoading] = useState(false);

  if (
    !widget ||
    !widget.enabled ||
    !canAccessWidget(role, widget.id)
  ) {
    return null;
  }

  const refreshWidget = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const exportWidget = () => {
    alert(`${widgetMeta[widget.id]?.title} export will be available soon.`);
  };

  let content = null;

  switch (widget.id) {
    case "revenue":
      content = (
        <RevenueChart
          data={dashboardData.stats}
        />
      );
      break;

    case "salesTrend":
      content = (
        <SalesTrend
          data={dashboardData.salesTrend}
        />
      );
      break;

    case "orderStatus":
      content = (
        <OrderStatusDonut
          data={dashboardData.orderStatus}
        />
      );
      break;

    case "topProducts":
      content = (
        <TopProducts
          data={dashboardData.topProducts}
        />
      );
      break;

    case "recentOrders":
      content = (
        <RecentOrdersTable
          data={dashboardData.recentOrders}
        />
      );
      break;

    case "lowStock":
      content = (
        <LowStockAlerts
          data={dashboardData.lowStock}
        />
      );
      break;

    case "inventory":
      content = <InventoryHealth />;
      break;

    case "activity":
      content = <ActivityTimeline />;
      break;

    default:
      content = (
        <div className="py-16 text-center text-slate-500">
          Widget not available
        </div>
      );
  }

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <WidgetContainer
        title={widgetMeta[widget.id]?.title}
        subtitle={widgetMeta[widget.id]?.subtitle}
        loading={loading}
        onRefresh={refreshWidget}
        onExport={exportWidget}
        allowExport
        allowRefresh
        allowFullscreen
      >
        {content}
      </WidgetContainer>
    </motion.div>
  );
}