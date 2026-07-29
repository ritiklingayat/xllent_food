import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Maximize2,
} from "lucide-react";

export default function WidgetFullscreen({
  open,
  title = "Widget",
  children,
  onClose,
}) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent body scrolling
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="
          fixed
          inset-0
          z-[99999]
          flex
          items-center
          justify-center
          bg-slate-950/70
          backdrop-blur-md
          p-5
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 10,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(e) => e.stopPropagation()}
          className="
            flex
            h-[92vh]
            w-full
            max-w-[1700px]
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-2xl
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-200
              bg-gradient-to-r
              from-orange-500
              via-orange-600
              to-red-500
              px-8
              py-5
              text-white
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/20
                  backdrop-blur-md
                "
              >
                <Maximize2 size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {title}
                </h2>

                <p className="text-sm text-orange-100">
                  Full Screen Analytics View
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                rounded-2xl
                bg-white/20
                p-3
                transition
                hover:bg-white/30
              "
            >
              <X size={22} />
            </button>
          </div>

          {/* Content */}

          <div
            className="
              flex-1
              overflow-auto
              bg-slate-50
              p-8
            "
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}