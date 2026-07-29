import { Database, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function WidgetEmptyState({
  title = "No Data Available",
  description = "There is currently no data available for this widget. Try changing filters, refreshing the dashboard, or check back later.",
  buttonText = "Refresh",
  onRefresh,
  icon: Icon = Database,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        flex
        min-h-[320px]
        flex-col
        items-center
        justify-center
        rounded-3xl
        border-2
        border-dashed
        border-slate-200
        bg-gradient-to-br
        from-slate-50
        via-white
        to-orange-50
        p-8
        text-center
      "
    >
      {/* Illustration */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="
          mb-6
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-orange-100
          to-orange-200
          shadow-lg
        "
      >
        <Icon
          size={42}
          className="text-orange-500"
        />
      </motion.div>

      {/* Title */}
      <h3
        className="
          text-2xl
          font-bold
          text-slate-900
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          mt-3
          max-w-md
          text-sm
          leading-7
          text-slate-500
        "
      >
        {description}
      </p>

      {/* Action */}
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-orange-500
            px-6
            py-3
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-orange-600
            hover:shadow-xl
            active:scale-95
          "
        >
          <RefreshCcw size={18} />
          {buttonText}
        </button>
      )}

      {/* Footer Hint */}
      <p
        className="
          mt-6
          text-xs
          text-slate-400
        "
      >
        Xllent Foods ERP Analytics
      </p>
    </motion.div>
  );
}