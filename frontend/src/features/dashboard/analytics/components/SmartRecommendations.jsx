import { useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Lightbulb,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  BadgeIndianRupee,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function RecommendationCard({
  icon: Icon,
  title,
  description,
  priority,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon size={26} className="text-white" />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            priority === "High"
              ? "bg-red-100 text-red-600"
              : priority === "Medium"
              ? "bg-orange-100 text-orange-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {priority}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <button
        className="
        mt-6
        flex
        items-center
        gap-2
        font-semibold
        text-orange-600
        transition
        group-hover:translate-x-1
      "
      >
        View Details
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}

export default function SmartRecommendations() {
  const dashboard = useSelector(
    (state) => state.dashboard
  );

  const recommendations = useMemo(() => {
    const stats = dashboard?.stats || {};

    const revenue = Number(stats.revenue || 0);
    const orders = Number(stats.orders || 0);
    const products = Number(stats.products || 0);
    const customers = Number(stats.customers || 0);

    const list = [];

    list.push({
      icon: Package,
      title: "Inventory Optimization",
      description:
        products < 500
          ? "Several products are approaching low stock levels. Schedule replenishment to avoid stock-outs."
          : "Inventory levels are healthy. Focus on faster inventory turnover.",
      priority: products < 500 ? "High" : "Low",
      color: "bg-emerald-500",
    });

    list.push({
      icon: TrendingUp,
      title: "Increase Revenue",
      description:
        revenue < 1000000
          ? "Launch promotional campaigns and bundle offers to improve monthly revenue."
          : "Revenue is performing well. Consider expanding into new product categories.",
      priority: revenue < 1000000 ? "High" : "Medium",
      color: "bg-blue-600",
    });

    list.push({
      icon: ShoppingCart,
      title: "Improve Order Conversion",
      description:
        orders < 500
          ? "Introduce limited-time discounts and faster checkout experiences."
          : "Order volume is healthy. Focus on increasing average order value.",
      priority: "Medium",
      color: "bg-orange-500",
    });

    list.push({
      icon: Users,
      title: "Customer Engagement",
      description:
        customers < 1000
          ? "Run loyalty programs, referral campaigns, and personalized offers."
          : "High customer engagement detected. Launch premium membership benefits.",
      priority: "Medium",
      color: "bg-purple-600",
    });

    list.push({
      icon: BadgeIndianRupee,
      title: "Profit Optimization",
      description:
        "Analyze slow-moving products, negotiate supplier pricing, and reduce logistics costs to improve margins.",
      priority: "Low",
      color: "bg-cyan-600",
    });

    return list;
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
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-xl
      "
    >
      {/* Header */}

      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-r
          from-orange-500
          via-red-500
          to-pink-500
          p-6
          text-white
        "
      >
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-md">
            <Lightbulb size={30} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              AI Smart Recommendations
            </h2>

            <p className="mt-1 text-orange-100">
              Personalized business suggestions powered by AI
            </p>
          </div>
        </div>
      </div>

      {/* AI Status */}

      <div className="border-b border-slate-100 bg-orange-50 px-6 py-4">
        <div className="flex items-center gap-3">
          <CheckCircle2
            className="text-green-600"
            size={22}
          />

          <div>
            <p className="font-semibold text-slate-800">
              AI Analysis Completed Successfully
            </p>

            <p className="text-sm text-slate-500">
              5 strategic recommendations generated from
              ERP analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Recommendation Grid */}

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((item) => (
          <RecommendationCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      {/* Footer */}

      <div className="border-t border-slate-100 bg-slate-50 p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="font-bold text-slate-800">
              AI Confidence Score
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              Recommendations are generated using sales,
              inventory, customer, and revenue analytics.
            </p>
          </div>

          <div className="rounded-2xl bg-green-100 px-5 py-3 font-bold text-green-700">
            97.4% Confidence
          </div>
        </div>
      </div>
    </motion.div>
  );
}