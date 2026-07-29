import React, { useState } from "react";
import {
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
  RefreshCcw,
  Download,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WidgetContainer({
  title,
  subtitle = "",
  children,
  loading = false,
  empty = false,
  emptyMessage = "No data available",
  onRefresh,
  onExport,
  className = "",
  allowFullscreen = true,
  allowRefresh = true,
  allowExport = true,
}) {
  const [fullscreen, setFullscreen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;

    setRefreshing(true);

    try {
      await onRefresh();
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 600);
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/70
        bg-white/95
        backdrop-blur-xl
        shadow-lg
        transition-all
        duration-300
        hover:shadow-2xl

        ${
          fullscreen
            ? "fixed inset-6 z-[9999] flex flex-col"
            : ""
        }

        ${className}
      `}
    >
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-white via-slate-50 to-white px-6 py-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh */}
          {allowRefresh && (
            <button
              onClick={handleRefresh}
              className="rounded-xl p-2 transition hover:bg-slate-100"
            >
              <RefreshCcw
                size={18}
                className={
                  refreshing
                    ? "animate-spin text-orange-500"
                    : "text-slate-500"
                }
              />
            </button>
          )}

          {/* Export */}
          {allowExport && (
            <button
              onClick={onExport}
              className="rounded-xl p-2 transition hover:bg-slate-100 hover:text-emerald-600"
            >
              <Download size={18} />
            </button>
          )}

          {/* Collapse */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            {collapsed ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronUp size={18} />
            )}
          </button>

          {/* Fullscreen */}
          {allowFullscreen && (
            <button
              onClick={() =>
                setFullscreen(!fullscreen)
              }
              className="rounded-xl p-2 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              {fullscreen ? (
                <Minimize2 size={18} />
              ) : (
                <Maximize2 size={18} />
              )}
            </button>
          )}

          {/* Menu */}
          <button className="rounded-xl p-2 transition hover:bg-slate-100">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Body */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            layout
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative flex-1 overflow-auto p-6"
          >
            {loading ? (
              <div className="space-y-5 animate-pulse">
                <div className="h-6 w-40 rounded bg-slate-200" />
                <div className="h-60 rounded-2xl bg-slate-100" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-12 rounded-xl bg-slate-200" />
                  <div className="h-12 rounded-xl bg-slate-200" />
                  <div className="h-12 rounded-xl bg-slate-200" />
                </div>
              </div>
            ) : empty ? (
              <div className="flex h-64 items-center justify-center text-slate-400">
                {emptyMessage}
              </div>
            ) : (
              children
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}