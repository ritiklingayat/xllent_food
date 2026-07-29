import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Package,
  ShoppingCart,
  TrendingUp,
  Truck,
} from "lucide-react";

import RoleDashboardLayout from "./components/RoleDashboardLayout";

const KPI_DATA = [
  {
    title: "Total Orders",
    value: "248",
    description: "Orders placed",
    icon: ShoppingCart,
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    title: "Pending Orders",
    value: "18",
    description: "Awaiting delivery",
    icon: Clock,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Delivered Orders",
    value: "214",
    description: "Completed deliveries",
    icon: CheckCircle,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    title: "Invoices",
    value: "156",
    description: "Available downloads",
    icon: FileText,
    gradient: "from-purple-600 to-pink-600",
  },
];

const RECENT_ORDERS = [
  {
    id: "#ORD-10245",
    status: "Delivered",
    amount: "₹18,500",
    date: "23 Jul 2026",
  },
  {
    id: "#ORD-10246",
    status: "In Transit",
    amount: "₹12,800",
    date: "22 Jul 2026",
  },
  {
    id: "#ORD-10247",
    status: "Pending",
    amount: "₹8,900",
    date: "21 Jul 2026",
  },
];

const STATUS_STYLES = {
  Delivered: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
  "In Transit": "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  Pending: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
};

export default function WholesalerDashboard() {
  return (
    <RoleDashboardLayout
      title="Wholesaler Dashboard"
      subtitle="Manage orders, deliveries, and product purchases"
    >
      {/* KPI SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {KPI_DATA.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-white/30 dark:border-slate-800 shadow-xl backdrop-blur-xl p-6"
            >
              <div
                className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg mb-5`}
              >
                <Icon size={26} />
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.title}
              </p>

              <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2">
                {item.value}
              </h2>

              <p className="text-xs text-slate-500 mt-2">{item.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* QUICK ACTIONS */}
        <div className="xl:col-span-2 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-white/30 dark:border-slate-800 shadow-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionCard
              icon={<ShoppingCart size={22} />}
              title="Place Order"
              text="Buy products"
            />
            <ActionCard
              icon={<Truck size={22} />}
              title="Track Delivery"
              text="Check shipment"
            />
            <ActionCard
              icon={<FileText size={22} />}
              title="Download Invoice"
              text="View invoices"
            />
          </div>
        </div>

        {/* STOCK ALERT */}
        <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <AlertCircle size={28} />
              <h2 className="text-xl font-bold">Stock Alert</h2>
            </div>

            <p className="mt-4 text-sm opacity-90 leading-relaxed">
              Some products are running low. Please reorder before stockout.
            </p>
          </div>

          <button className="mt-6 w-full py-3 rounded-xl bg-white text-orange-600 font-bold shadow-md hover:bg-orange-50 transition">
            View Inventory
          </button>
        </div>
      </div>

      {/* ORDER HISTORY */}
      <div className="mt-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-white/30 dark:border-slate-800 shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent Orders
          </h2>
          <TrendingUp className="text-green-600" size={22} />
        </div>

        <div className="space-y-4">
          {RECENT_ORDERS.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-2xl bg-slate-100 dark:bg-slate-800 p-4"
            >
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  {order.id}
                </p>
                <p className="text-sm text-slate-500">{order.date}</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-slate-900 dark:text-white">
                  {order.amount}
                </p>
                <span
                  className={`inline-block px-2.5 py-1 mt-1 rounded-lg text-xs font-semibold ${
                    STATUS_STYLES[order.status] || "bg-slate-200 text-slate-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleDashboardLayout>
  );
}

function ActionCard({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5 cursor-pointer hover:shadow-md transition"
    >
      <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md">
        {icon}
      </div>

      <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>

      <p className="text-sm text-slate-500 mt-1">{text}</p>
    </motion.div>
  );
}