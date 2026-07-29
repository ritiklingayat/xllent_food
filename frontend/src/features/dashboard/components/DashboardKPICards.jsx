import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import CountUp from "react-countup";
console.log("CountUp =", CountUp);
import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

function ProgressBar({ value }) {
  return (
    <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/20">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1 }}
        className="h-full rounded-full bg-white"
      />
    </div>
  );
}

function MiniGraph() {
  return (
    <div className="mt-5 flex h-10 items-end gap-1">
      {[45, 70, 40, 90, 65, 100, 75].map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${v}%` }}
          transition={{
            delay: i * 0.08,
            duration: 0.5,
          }}
          className="flex-1 rounded-full bg-white/40"
        />
      ))}
    </div>
  );
}

export default function DashboardKPICards() {
  const { stats } = useSelector((state) => state.dashboard);

  const cards = [
    {
      title: "Revenue",
      value: stats.revenue,
      prefix: "₹",
      icon: IndianRupee,
      gradient: "from-indigo-600 via-blue-600 to-cyan-500",
      growth: 18.4,
      progress: 84,
    },
    {
      title: "Orders",
      value: stats.orders,
      icon: ShoppingCart,
      gradient: "from-orange-500 via-amber-500 to-yellow-400",
      growth: 11.8,
      progress: 72,
    },
    {
      title: "Products",
      value: stats.products,
      icon: Package,
      gradient: "from-emerald-600 via-green-500 to-lime-400",
      growth: 8.5,
      progress: 64,
    },
    {
      title: "Customers",
      value: stats.customers,
      icon: Users,
      gradient: "from-purple-700 via-fuchsia-600 to-pink-500",
      growth: -2.3,
      progress: 53,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-6 text-white shadow-2xl`}
          >
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-white/10 blur-xl" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-black tracking-tight">
                  {card.prefix}

                  {Number(card.value).toLocaleString()}
                </h2>
              </div>

              <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-md">
                <Icon size={30} />
              </div>
            </div>

            <MiniGraph />

            <ProgressBar value={card.progress} />

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                {card.growth >= 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}

                {card.growth > 0 ? "+" : ""}
                {card.growth}%
              </div>

              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                This Month
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}