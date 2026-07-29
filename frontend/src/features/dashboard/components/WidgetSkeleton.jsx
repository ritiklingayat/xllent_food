import { motion } from "framer-motion";

export default function WidgetSkeleton({
  rows = 4,
  chart = true,
}) {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-5 w-40 rounded-full bg-slate-200" />
          <div className="mt-3 h-3 w-24 rounded-full bg-slate-100" />
        </div>

        <div className="flex gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-200" />
          <div className="h-9 w-9 rounded-xl bg-slate-200" />
          <div className="h-9 w-9 rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* Chart Placeholder */}
      {chart && (
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="
            mb-6
            h-56
            rounded-2xl
            bg-gradient-to-r
            from-slate-100
            via-slate-200
            to-slate-100
          "
        />
      )}

      {/* Table/List Placeholder */}
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-slate-200" />

              <div>
                <div className="h-4 w-36 rounded-full bg-slate-200" />
                <div className="mt-2 h-3 w-24 rounded-full bg-slate-100" />
              </div>
            </div>

            <div className="h-5 w-20 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}