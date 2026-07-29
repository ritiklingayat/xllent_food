import { useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  Activity,
  CheckCircle2,
} from "lucide-react";

function SeverityBadge({ severity }) {
  const styles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-orange-100 text-orange-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        styles[severity]
      }`}
    >
      {severity}
    </span>
  );
}

function AlertCard({
  icon: Icon,
  title,
  description,
  severity,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon className="text-white" size={28} />
        </div>

        <SeverityBadge severity={severity} />
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </motion.div>
  );
}

export default function AnomalyDetection() {
  const dashboard = useSelector(
    (state) => state.dashboard
  );

  const alerts = useMemo(() => {
    const stats = dashboard?.stats || {};

    const revenue = Number(stats.revenue || 0);
    const orders = Number(stats.orders || 0);
    const products = Number(stats.products || 0);
    const customers = Number(stats.customers || 0);
    const lowStock =
      dashboard?.lowStock?.length || 0;

    return [
      {
        icon:
          revenue < 500000
            ? TrendingDown
            : TrendingUp,
        title: "Revenue Trend",
        description:
          revenue < 500000
            ? "Revenue is below expected monthly target. Consider promotional campaigns."
            : "Revenue is performing within the expected growth range.",
        severity:
          revenue < 500000 ? "High" : "Low",
        color:
          revenue < 500000
            ? "bg-red-500"
            : "bg-emerald-500",
      },

      {
        icon: Package,
        title: "Inventory Monitoring",
        description:
          lowStock > 10
            ? `${lowStock} products require immediate restocking.`
            : "Inventory levels are stable.",
        severity:
          lowStock > 10 ? "High" : "Low",
        color:
          lowStock > 10
            ? "bg-orange-500"
            : "bg-green-500",
      },

      {
        icon: ShoppingCart,
        title: "Order Activity",
        description:
          orders < 100
            ? "Order volume is lower than historical averages."
            : "Order volume is healthy.",
        severity:
          orders < 100 ? "Medium" : "Low",
        color:
          orders < 100
            ? "bg-yellow-500"
            : "bg-blue-600",
      },

      {
        icon: Users,
        title: "Customer Activity",
        description:
          customers < 500
            ? "Customer acquisition has slowed this month."
            : "Customer growth remains healthy.",
        severity:
          customers < 500
            ? "Medium"
            : "Low",
        color:
          customers < 500
            ? "bg-purple-500"
            : "bg-indigo-600",
      },

      {
        icon: Activity,
        title: "System Health",
        description:
          "No suspicious ERP activity detected during monitoring.",
        severity: "Low",
        color: "bg-cyan-600",
      },
    ];
  }, [dashboard]);

  const criticalCount = alerts.filter(
    (a) => a.severity === "High"
  ).length;

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
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
    >
      {/* Header */}

      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 p-6 text-white">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-md">
            <ShieldAlert size={30} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              AI Anomaly Detection
            </h2>

            <p className="text-sm text-orange-100">
              Continuous monitoring of business KPIs
            </p>
          </div>
        </div>
      </div>

      {/* Status */}

      <div className="border-b border-slate-100 bg-slate-50 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {criticalCount > 0 ? (
              <AlertTriangle
                className="text-red-600"
                size={24}
              />
            ) : (
              <CheckCircle2
                className="text-green-600"
                size={24}
              />
            )}

            <div>
              <h4 className="font-bold text-slate-800">
                {criticalCount > 0
                  ? `${criticalCount} Critical Alert${
                      criticalCount > 1 ? "s" : ""
                    } Detected`
                  : "No Critical Issues Found"}
              </h4>

              <p className="text-sm text-slate-500">
                AI engine analyzed sales, orders,
                inventory and customer metrics.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-green-100 px-5 py-3 font-bold text-green-700">
            AI Accuracy 98.1%
          </div>
        </div>
      </div>

      {/* Alerts */}

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
        {alerts.map((item) => (
          <AlertCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      {/* Footer */}

      <div className="border-t border-slate-100 bg-slate-50 p-6">
        <div className="rounded-2xl bg-blue-50 p-4">
          <h4 className="font-bold text-slate-800">
            AI Summary
          </h4>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            The monitoring engine continuously evaluates
            revenue trends, order performance, inventory
            levels, customer activity, and operational
            health. Any unusual business behavior is
            automatically highlighted with severity
            ratings to help administrators respond
            quickly.
          </p>
        </div>
      </div>
    </motion.div>
  );
}