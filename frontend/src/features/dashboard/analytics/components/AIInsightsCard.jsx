import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  Bot,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Package,
  ShoppingCart,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

function InsightItem({
  icon: Icon,
  title,
  description,
  color,
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-white hover:shadow-md"
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={20} className="text-white" />
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-slate-800">
          {title}
        </h4>

        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AIInsightsCard() {
  const dashboard = useSelector((state) => state.dashboard);

  const insights = useMemo(() => {
    const stats = dashboard?.stats || {};

    const revenue = Number(stats.revenue || 0);
    const orders = Number(stats.orders || 0);
    const products = Number(stats.products || 0);

    const result = [];

    result.push({
      icon: revenue > 1000000 ? TrendingUp : TrendingDown,
      title: "Revenue Intelligence",
      color:
        revenue > 1000000
          ? "bg-emerald-500"
          : "bg-amber-500",
      description:
        revenue > 1000000
          ? "Revenue is performing above target. Continue current marketing campaigns."
          : "Revenue is below expected trend. Consider promotional campaigns.",
    });

    result.push({
      icon: ShoppingCart,
      title: "Orders Overview",
      color: "bg-blue-600",
      description: `${orders.toLocaleString()} total orders processed. Customer demand remains healthy.`,
    });

    result.push({
      icon: Package,
      title: "Inventory Status",
      color: "bg-orange-500",
      description:
        products < 100
          ? "Inventory is running low. Restocking is recommended."
          : "Inventory levels are healthy across products.",
    });

    result.push({
      icon: Lightbulb,
      title: "AI Recommendation",
      color: "bg-purple-600",
      description:
        "Bundle top-selling products and launch weekend offers to maximize revenue.",
    });

    return result;
  }, [dashboard]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
    >
      {/* Header */}

      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-md">
              <Bot size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                AI Business Insights
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                Smart ERP recommendations powered by AI
              </p>
            </div>
          </div>

          <div className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold shadow-lg">
            <CheckCircle2
              size={16}
              className="mr-2 inline"
            />
            98% Confidence
          </div>
        </div>
      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 border-b border-slate-100">
        <div className="p-5 text-center">
          <IndianRupee
            className="mx-auto mb-2 text-emerald-600"
            size={24}
          />

          <p className="text-2xl font-bold text-slate-800">
            ₹
            {Number(
              dashboard?.stats?.revenue || 0
            ).toLocaleString()}
          </p>

          <p className="text-sm text-slate-500">
            Revenue
          </p>
        </div>

        <div className="border-x border-slate-100 p-5 text-center">
          <ShoppingCart
            className="mx-auto mb-2 text-blue-600"
            size={24}
          />

          <p className="text-2xl font-bold text-slate-800">
            {dashboard?.stats?.orders || 0}
          </p>

          <p className="text-sm text-slate-500">
            Orders
          </p>
        </div>

        <div className="p-5 text-center">
          <AlertTriangle
            className="mx-auto mb-2 text-orange-500"
            size={24}
          />

          <p className="text-2xl font-bold text-slate-800">
            {dashboard?.lowStock?.length || 0}
          </p>

          <p className="text-sm text-slate-500">
            Low Stock
          </p>
        </div>
      </div>

      {/* Insights */}

      <div className="space-y-4 p-6">
        {insights.map((item) => (
          <InsightItem
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </motion.div>
  );
}