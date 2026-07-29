import { useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Activity,
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
} from "lucide-react";

function CircularProgress({
  value,
  color = "#22c55e",
  size = 150,
  stroke = 12,
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={stroke}
          fill="none"
        />

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1.5,
          }}
        />
      </svg>

      <div className="absolute text-center">
        <h2 className="text-4xl font-black text-slate-800">
          {value}%
        </h2>

        <p className="text-sm text-slate-500">
          Overall
        </p>
      </div>
    </div>
  );
}

function ScoreCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-black text-slate-800">
            {value}%
          </h3>
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md"
          style={{ backgroundColor: color }}
        >
          <Icon size={26} />
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${value}%`,
          }}
          transition={{
            duration: 1,
          }}
          className="h-full rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function BusinessHealthCard() {
  const { stats } = useSelector(
    (state) => state.dashboard
  );

  const scores = useMemo(() => {
    const revenue = Number(stats?.revenue || 0);
    const orders = Number(stats?.orders || 0);
    const products = Number(stats?.products || 0);
    const customers = Number(stats?.customers || 0);

    const salesScore = Math.min(
      100,
      Math.round(revenue / 100000)
    );

    const orderScore = Math.min(
      100,
      Math.round(orders / 15)
    );

    const inventoryScore = Math.min(
      100,
      Math.round(products / 10)
    );

    const customerScore = Math.min(
      100,
      Math.round(customers / 10)
    );

    const overall = Math.round(
      (
        salesScore +
        orderScore +
        inventoryScore +
        customerScore
      ) / 4
    );

    return {
      salesScore,
      orderScore,
      inventoryScore,
      customerScore,
      overall,
    };
  }, [stats]);

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

      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 p-6 text-white">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-md">
            <Activity size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Business Health Score
            </h2>

            <p className="text-sm text-cyan-100">
              AI Powered ERP Performance Index
            </p>
          </div>
        </div>
      </div>

      {/* Overall */}

      <div className="flex justify-center py-10">
        <CircularProgress
          value={scores.overall}
          color="#2563EB"
        />
      </div>

      {/* Metrics */}

      <div className="grid gap-5 p-6 md:grid-cols-2">
        <ScoreCard
          title="Sales Health"
          value={scores.salesScore}
          icon={IndianRupee}
          color="#2563EB"
        />

        <ScoreCard
          title="Orders Health"
          value={scores.orderScore}
          icon={ShoppingCart}
          color="#F97316"
        />

        <ScoreCard
          title="Inventory Health"
          value={scores.inventoryScore}
          icon={Package}
          color="#10B981"
        />

        <ScoreCard
          title="Customer Health"
          value={scores.customerScore}
          icon={Users}
          color="#9333EA"
        />
      </div>

      {/* Footer */}

      <div className="border-t border-slate-100 bg-slate-50 p-6">
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">
          <TrendingUp
            className="text-emerald-600"
            size={24}
          />

          <div>
            <h4 className="font-bold text-slate-800">
              AI Recommendation
            </h4>

            <p className="mt-1 text-sm text-slate-600">
              Overall business health is{" "}
              <strong>{scores.overall}%</strong>.
              Continue optimizing inventory turnover and
              customer engagement to reach a score above
              95%.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}