import { motion } from "framer-motion";
import {
  Activity,
  IndianRupee,
  MapPin,
  ShoppingBag,
  Trophy,
} from "lucide-react";

const defaultRegionalData = [
  {
    id: 1,
    region: "Maharashtra",
    city: "Mumbai",
    revenue: 4250000,
    orders: 1240,
    growth: 24,
    score: 92,
  },
  {
    id: 2,
    region: "Maharashtra",
    city: "Pune",
    revenue: 3580000,
    orders: 980,
    growth: 19,
    score: 84,
  },
  {
    id: 3,
    region: "Telangana",
    city: "Hyderabad",
    revenue: 2840000,
    orders: 760,
    growth: 16,
    score: 72,
  },
  {
    id: 4,
    region: "Karnataka",
    city: "Bangalore",
    revenue: 2420000,
    orders: 650,
    growth: 14,
    score: 65,
  },
  {
    id: 5,
    region: "Delhi NCR",
    city: "Delhi",
    revenue: 2080000,
    orders: 520,
    growth: 11,
    score: 58,
  },
];

const gradients = [
  "from-blue-600 to-cyan-500",
  "from-purple-600 to-pink-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-500",
  "from-indigo-600 to-violet-500",
];

const formatCurrency = (value) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  }
  return `₹${(value / 100000).toFixed(1)}L`;
};

export default function RegionalSalesMap({ data = defaultRegionalData }) {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const avgGrowth = data.length
    ? (data.reduce((sum, item) => sum + item.growth, 0) / data.length).toFixed(1)
    : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Regional Sales Performance
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Geographical revenue intelligence
          </p>
        </div>

        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg">
          <MapPin size={24} />
        </div>
      </div>

      {/* Heat Map Visualization */}
      <div className="relative h-60 rounded-3xl overflow-hidden mb-6 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />

        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.15 }}
            style={{
              left: `${15 + index * 17}%`,
              top: `${30 + (index % 2) * 25}%`,
            }}
            className="absolute"
          >
            <div className="relative flex items-center justify-center">
              <div
                className={`h-12 w-12 rounded-full bg-gradient-to-br ${
                  gradients[index % gradients.length]
                } text-white flex items-center justify-center shadow-xl animate-pulse`}
              >
                <MapPin size={20} />
              </div>

              <div className="absolute h-20 w-20 rounded-full bg-blue-500/20 animate-ping" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ranking List */}
      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-xl bg-gradient-to-br ${
                    gradients[index % gradients.length]
                  } text-white flex items-center justify-center`}
                >
                  {index === 0 ? <Trophy size={20} /> : <MapPin size={20} />}
                </div>

                <div>
                  <h3 className="font-semibold dark:text-white">
                    {item.city}
                  </h3>
                  <p className="text-xs text-slate-500">{item.region}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold dark:text-white">
                  {formatCurrency(item.revenue)}
                </p>
                <p className="text-green-500 text-xs font-semibold">
                  +{item.growth}%
                </p>
              </div>
            </div>

            <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 1 }}
                className={`h-full rounded-full bg-gradient-to-r ${
                  gradients[index % gradients.length]
                }`}
              />
            </div>

            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>Orders {item.orders}</span>
              <span>Score {item.score}/100</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 flex gap-3 items-center">
          <IndianRupee className="text-green-600" />
          <div>
            <p className="text-xs text-slate-500">Regional Revenue</p>
            <p className="font-bold dark:text-white">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 flex gap-3 items-center">
          <ShoppingBag className="text-blue-600" />
          <div>
            <p className="text-xs text-slate-500">Orders</p>
            <p className="font-bold dark:text-white">
              {totalOrders.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-4 flex gap-3 items-center">
          <Activity className="text-purple-600" />
          <div>
            <p className="text-xs text-slate-500">Average Growth</p>
            <p className="font-bold dark:text-white">+{avgGrowth}%</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}