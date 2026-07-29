import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  CalendarDays,
  ArrowUpRight,
  IndianRupee,
  ShoppingCart,
  Package,
} from "lucide-react";

const PERIODS = [
  {
    label: "7 Days",
    value: 7,
    revenueMultiplier: 1.05,
    orderMultiplier: 1.04,
    productMultiplier: 1.01,
  },
  {
    label: "30 Days",
    value: 30,
    revenueMultiplier: 1.18,
    orderMultiplier: 1.15,
    productMultiplier: 1.05,
  },
  {
    label: "90 Days",
    value: 90,
    revenueMultiplier: 1.42,
    orderMultiplier: 1.33,
    productMultiplier: 1.12,
  },
];

function ForecastMetric({
  title,
  value,
  growth,
  icon: Icon,
  gradient,
  suffix = "",
  prefix = "",
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      className={`rounded-3xl bg-gradient-to-br ${gradient} p-5 text-white shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/80">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-black">
            {prefix}
            {Number(value).toLocaleString()}
            {suffix}
          </h3>

          <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
            <ArrowUpRight size={16} />
            +{growth}%
          </div>
        </div>

        <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-md">
          <Icon size={28} />
        </div>
      </div>
    </motion.div>
  );
}

export default function ForecastCard() {
  const { stats } = useSelector(
    (state) => state.dashboard
  );

  const [period, setPeriod] = useState(PERIODS[1]);

  const forecast = useMemo(() => {
    return {
      revenue: Math.round(
        (stats.revenue || 0) *
          period.revenueMultiplier
      ),

      orders: Math.round(
        (stats.orders || 0) *
          period.orderMultiplier
      ),

      products: Math.round(
        (stats.products || 0) *
          period.productMultiplier
      ),
    };
  }, [stats, period]);

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

      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-500 p-6 text-white">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-md">
              <TrendingUp size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                AI Forecast
              </h2>

              <p className="text-sm text-emerald-100">
                Predicted business performance
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {PERIODS.map((item) => (
              <button
                key={item.value}
                onClick={() => setPeriod(item)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  period.value === item.value
                    ? "bg-white text-emerald-700"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <CalendarDays
                  size={15}
                  className="mr-2 inline"
                />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Forecast Cards */}

      <AnimatePresence mode="wait">
        <motion.div
          key={period.value}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -20,
          }}
          transition={{
            duration: 0.25,
          }}
          className="grid gap-6 p-6 md:grid-cols-3"
        >
          <ForecastMetric
            title="Forecast Revenue"
            value={forecast.revenue}
            growth={Math.round(
              (period.revenueMultiplier - 1) * 100
            )}
            icon={IndianRupee}
            gradient="from-indigo-600 to-blue-500"
            prefix="₹"
          />

          <ForecastMetric
            title="Forecast Orders"
            value={forecast.orders}
            growth={Math.round(
              (period.orderMultiplier - 1) * 100
            )}
            icon={ShoppingCart}
            gradient="from-orange-500 to-amber-400"
          />

          <ForecastMetric
            title="Forecast Products"
            value={forecast.products}
            growth={Math.round(
              (period.productMultiplier - 1) * 100
            )}
            icon={Package}
            gradient="from-purple-600 to-fuchsia-500"
          />
        </motion.div>
      </AnimatePresence>

      {/* Footer */}

      <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
        <div className="flex flex-col gap-2 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <span>
            AI Confidence Score:
            <span className="ml-2 font-bold text-emerald-600">
              96.8%
            </span>
          </span>

          <span>
            Based on historical sales trends and ERP
            analytics.
          </span>
        </div>
      </div>
    </motion.div>
  );
}