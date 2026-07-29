import { useState } from "react";
import {
  CalendarDays,
  RefreshCcw,
  Download,
  BarChart3,
  LineChart,
  AreaChart,
  Filter,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

export default function WidgetChartToolbar({
  title = "Analytics",
  chartType = "line",
  onChartTypeChange,
  onRefresh,
  onExport,
  onFilter,
  loading = false,
}) {
  const [range, setRange] = useState("30D");

  const chartTypes = [
    {
      id: "line",
      icon: LineChart,
      label: "Line",
    },
    {
      id: "bar",
      icon: BarChart3,
      label: "Bar",
    },
    {
      id: "area",
      icon: AreaChart,
      label: "Area",
    },
  ];

  const ranges = [
    "7D",
    "30D",
    "90D",
    "6M",
    "1Y",
  ];

  return (
    <div
      className="
        mb-6
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white/80
        p-4
        backdrop-blur-xl
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Left */}

      <div>
        <h2 className="text-lg font-bold text-slate-800">
          {title}
        </h2>

        <p className="text-sm text-slate-500">
          Live Business Analytics
        </p>
      </div>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-3">
        {/* Date Range */}

        <div className="relative">
          <CalendarDays
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="
              appearance-none
              rounded-xl
              border
              border-slate-200
              bg-white
              py-2
              pl-10
              pr-8
              text-sm
              font-medium
              outline-none
              transition
              hover:border-orange-400
              focus:border-orange-500
            "
          >
            {ranges.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <ChevronDown
            size={15}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />
        </div>

        {/* Chart Type */}

        <div
          className="
            flex
            overflow-hidden
            rounded-xl
            border
            border-slate-200
          "
        >
          {chartTypes.map((item) => {
            const Icon = item.icon;

            const active =
              chartType === item.id;

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  onChartTypeChange?.(
                    item.id
                  )
                }
                className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  transition

                  ${
                    active
                      ? "bg-orange-500 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                <Icon size={16} />

                {item.label}
              </motion.button>
            );
          })}
        </div>

        {/* Filter */}

        <button
          onClick={onFilter}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            transition
            hover:bg-slate-100
          "
        >
          <Filter size={16} />

          Filter
        </button>

        {/* Refresh */}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onRefresh}
          disabled={loading}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:opacity-50
          "
        >
          <RefreshCcw
            size={16}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </motion.button>

        {/* Export */}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onExport}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-emerald-700
          "
        >
          <Download size={16} />

          Export
        </motion.button>
      </div>
    </div>
  );
}