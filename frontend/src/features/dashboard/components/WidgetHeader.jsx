import { useState } from "react";
import {
  Activity,
  Star,
  RefreshCcw,
  Download,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Pin,
} from "lucide-react";

import { motion } from "framer-motion";

export default function WidgetHeader({
  title,
  subtitle = "",
  icon: Icon = Activity,

  live = true,

  lastUpdated = "Just now",

  collapsed = false,
  fullscreen = false,
  pinned = false,
  favorite = false,

  onCollapse,
  onFullscreen,
  onRefresh,
  onExport,
  onFavorite,
  onPin,
  onMenu,
}) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;

    setRefreshing(true);

    try {
      await onRefresh();
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 700);
    }
  };

  return (
    <div
      className="
      relative
      flex
      items-center
      justify-between
      gap-4
      border-b
      border-slate-200
      bg-gradient-to-r
      from-white
      via-slate-50
      to-white
      px-6
      py-5
    "
    >
      {/* Glow */}
      <div className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Left */}
      <div className="relative flex items-center gap-4">
        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-orange-500
          to-red-500
          text-white
          shadow-lg
        "
        >
          <Icon size={22} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {title}
          </h3>

          <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
            {subtitle && <span>{subtitle}</span>}

            {live && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            )}

            <span>
              Updated {lastUpdated}
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-2">
        {/* Refresh */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleRefresh}
          className="
            rounded-xl
            p-2
            transition
            hover:bg-slate-100
          "
        >
          <RefreshCcw
            size={18}
            className={
              refreshing
                ? "animate-spin text-orange-500"
                : "text-slate-600"
            }
          />
        </motion.button>

        {/* Export */}
        <button
          onClick={onExport}
          className="
            rounded-xl
            p-2
            transition
            hover:bg-slate-100
            hover:text-emerald-600
          "
        >
          <Download size={18} />
        </button>

        {/* Favorite */}
        <button
          onClick={onFavorite}
          className={`
            rounded-xl
            p-2
            transition

            ${
              favorite
                ? "bg-yellow-100 text-yellow-600"
                : "hover:bg-slate-100"
            }
          `}
        >
          <Star
            size={18}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>

        {/* Pin */}
        <button
          onClick={onPin}
          className={`
            rounded-xl
            p-2
            transition

            ${
              pinned
                ? "bg-indigo-100 text-indigo-600"
                : "hover:bg-slate-100"
            }
          `}
        >
          <Pin size={18} />
        </button>

        {/* Collapse */}
        <button
          onClick={onCollapse}
          className="
            rounded-xl
            p-2
            transition
            hover:bg-slate-100
          "
        >
          {collapsed ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronUp size={18} />
          )}
        </button>

        {/* Fullscreen */}
        <button
          onClick={onFullscreen}
          className="
            rounded-xl
            p-2
            transition
            hover:bg-slate-100
            hover:text-indigo-600
          "
        >
          {fullscreen ? (
            <Minimize2 size={18} />
          ) : (
            <Maximize2 size={18} />
          )}
        </button>

        {/* Menu */}
        <button
          onClick={onMenu}
          className="
            rounded-xl
            p-2
            transition
            hover:bg-slate-100
          "
        >
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}