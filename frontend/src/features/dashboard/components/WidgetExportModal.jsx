import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileSpreadsheet,
  FileText,
  FileImage,
  Printer,
  Download,
} from "lucide-react";

const EXPORT_OPTIONS = [
  {
    id: "excel",
    title: "Excel",
    description: "Export as Microsoft Excel (.xlsx)",
    icon: FileSpreadsheet,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "csv",
    title: "CSV",
    description: "Export raw comma-separated data",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "pdf",
    title: "PDF",
    description: "Generate printable report",
    icon: FileText,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "png",
    title: "PNG",
    description: "Save widget as image",
    icon: FileImage,
    color: "bg-violet-100 text-violet-600",
  },
  {
    id: "print",
    title: "Print",
    description: "Print this widget",
    icon: Printer,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function WidgetExportModal({
  open,
  title = "Export Widget",
  onClose,
  onExport,
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed
          inset-0
          z-[9999]
          flex
          items-center
          justify-center
          bg-black/50
          backdrop-blur-sm
          p-4
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.95,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            w-full
            max-w-2xl
            rounded-3xl
            bg-white
            shadow-2xl
            overflow-hidden
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
              px-7
              py-5
            "
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose an export format
              </p>
            </div>

            <button
              onClick={onClose}
              className="
                rounded-xl
                p-2
                transition
                hover:bg-slate-100
              "
            >
              <X size={20} />
            </button>
          </div>

          {/* Options */}

          <div className="grid gap-5 p-7 md:grid-cols-2">
            {EXPORT_OPTIONS.map((item) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() => {
                    onExport?.(item.id);
                    onClose?.();
                  }}
                  className="
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                    text-left
                    transition
                    hover:border-orange-300
                    hover:shadow-lg
                  "
                >
                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      ${item.color}
                    `}
                  >
                    <Icon size={26} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <Download
                    size={18}
                    className="text-slate-400"
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Footer */}

          <div
            className="
              border-t
              border-slate-200
              bg-slate-50
              px-7
              py-4
              text-right
            "
          >
            <button
              onClick={onClose}
              className="
                rounded-xl
                bg-slate-800
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-slate-900
              "
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}