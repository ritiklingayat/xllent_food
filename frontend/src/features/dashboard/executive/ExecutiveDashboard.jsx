import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  fetchExecutiveDashboard,
  clearExecutiveError,
} from "./executiveSlice";

// Components
import ExecutiveHeader from "./components/ExecutiveHeader";
import ExecutiveKPICards from "./components/ExecutiveKPICards";
import RevenueTargetChart from "./components/RevenueTargetChart";
import SalesFunnel from "./components/SalesFunnel";
import RegionalSalesMap from "./components/RegionalSalesMap";
import CustomerSegmentation from "./components/CustomerSegmentation";
import AIExecutiveSummary from "./components/AIExecutiveSummary";
import CashFlowWidget from "./components/CashFlowWidget";
import TopProductsWidget from "./components/TopProductsWidget";
import LiveActivityFeed from "./components/LiveActivityFeed";
import ExecutiveCopilot from "./components/aiCopilot/ExecutiveCopilot";
import ExecutiveDashboardSkeleton from "./components/ExecutiveDashboardSkeleton";
import ExecutiveBackground from "./components/ExecutiveBackground";

export default function ExecutiveDashboard() {
  const dispatch = useDispatch();

  const executive = useSelector((state) => state.executive || {});
  const { dashboard = null, loading = false, error = null } = executive;

  useEffect(() => {
    dispatch(fetchExecutiveDashboard());
  }, [dispatch]);

  const refreshDashboard = () => {
    dispatch(clearExecutiveError());
    dispatch(fetchExecutiveDashboard());
  };

  if (loading && !dashboard) {
    return (
      <div className="p-6">
        <ExecutiveDashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 p-4 md:p-6 space-y-8">
      {/* Dynamic Background Effects */}
      <ExecutiveBackground />

      <div className="relative z-10 space-y-8">
        {/* Header Navigation */}
        <ExecutiveHeader onRefresh={refreshDashboard} loading={loading} />

        {/* Error Alert Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 p-5 border border-red-200 dark:border-red-800"
          >
            <AlertCircle size={22} />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Hero Quick Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
        >
          <MiniCard
            title="Revenue Growth"
            value="+24.5%"
            icon={<TrendingUp size={24} />}
            gradient="from-green-500 to-emerald-600"
          />
          <MiniCard
            title="Monthly Revenue"
            value="₹42.5L"
            icon={<DollarSign size={24} />}
            gradient="from-blue-500 to-indigo-600"
          />
          <MiniCard
            title="Customers"
            value="8,540"
            icon={<Users size={24} />}
            gradient="from-purple-500 to-pink-600"
          />
          <MiniCard
            title="Business Health"
            value="94%"
            icon={<Activity size={24} />}
            gradient="from-orange-500 to-red-600"
          />
        </motion.div>

        {/* Executive KPI Cards Grid */}
        <ExecutiveKPICards data={dashboard?.kpis} />

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
          <div className="2xl:col-span-2">
            <RevenueTargetChart data={dashboard?.revenueChart} />
          </div>
          <AIExecutiveSummary insights={dashboard?.aiInsights} />
        </div>

        {/* Sales & Customer Intelligence */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SalesFunnel data={dashboard?.salesFunnel} />
          <CustomerSegmentation data={dashboard?.customers} />
        </div>

        {/* Regional Performance Map */}
        <RegionalSalesMap data={dashboard?.regions} />

        {/* Financial, Product, and Feed Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <CashFlowWidget data={dashboard?.cashFlow} />
          <TopProductsWidget data={dashboard?.topProducts} />
          <LiveActivityFeed data={dashboard?.activities} />
        </div>

        {/* Interactive AI Assistant */}
        <ExecutiveCopilot />
      </div>
    </div>
  );
}

// Mini KPI Component
function MiniCard({ title, value, icon, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-3xl p-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/30 dark:border-slate-800 shadow-xl"
    >
      <div
        className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg mb-4`}
      >
        {icon}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
        {value}
      </h3>
    </motion.div>
  );
}