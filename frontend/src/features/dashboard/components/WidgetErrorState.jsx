import { motion } from "framer-motion";
import {
  AlertTriangle,
  RefreshCcw,
  Bug,
} from "lucide-react";

export default function WidgetErrorState({
  title = "Something went wrong",
  description = "We couldn't load this widget. Please refresh or try again in a few moments.",
  error = "",
  onRetry,
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
        border
        border-red-200
        bg-gradient-to-br
        from-red-50
        via-white
        to-orange-50
        p-8
        text-center
      "
    >
      {/* Icon */}

      <motion.div
        animate={{
          rotate: [0, 6, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="
          mb-6
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-red-100
          shadow-lg
        "
      >
        <AlertTriangle
          size={42}
          className="text-red-500"
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
          text-slate-600
        "
      >
        {description}
      </p>

      {/* Error Details */}

      {error && (
        <div
          className="
            mt-6
            w-full
            max-w-lg
            rounded-2xl
            border
            border-red-200
            bg-red-100
            p-4
            text-left
          "
        >
          <div className="mb-2 flex items-center gap-2 text-red-700">
            <Bug size={18} />
            <span className="font-semibold">
              Error Details
            </span>
          </div>

          <pre
            className="
              whitespace-pre-wrap
              break-words
              text-xs
              text-red-800
            "
          >
            {error}
          </pre>
        </div>
      )}

      {/* Retry */}

      {onRetry && (
        <button
          onClick={onRetry}
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-red-500
            px-6
            py-3
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-red-600
            hover:shadow-xl
            active:scale-95
          "
        >
          <RefreshCcw size={18} />
          Retry Widget
        </button>
      )}

      {/* Footer */}

      <p
        className="
          mt-6
          text-xs
          text-slate-400
        "
      >
        Xllent Foods ERP • Widget Error Handler
      </p>
    </motion.div>
  );
}