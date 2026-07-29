import { useEffect, useRef } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Image,
  RefreshCcw,
  Copy,
  Pencil,
  Pin,
  Settings,
  Trash2,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    id: "refresh",
    label: "Refresh",
    icon: RefreshCcw,
    color: "text-blue-600",
  },
  {
    id: "export-csv",
    label: "Export CSV",
    icon: FileSpreadsheet,
    color: "text-emerald-600",
  },
  {
    id: "export-excel",
    label: "Export Excel",
    icon: Download,
    color: "text-green-600",
  },
  {
    id: "export-pdf",
    label: "Export PDF",
    icon: FileText,
    color: "text-red-600",
  },
  {
    id: "export-image",
    label: "Export Image",
    icon: Image,
    color: "text-purple-600",
  },
  {
    id: "duplicate",
    label: "Duplicate Widget",
    icon: Copy,
    color: "text-indigo-600",
  },
  {
    id: "rename",
    label: "Rename Widget",
    icon: Pencil,
    color: "text-amber-600",
  },
  {
    id: "pin",
    label: "Pin Widget",
    icon: Pin,
    color: "text-orange-600",
  },
  {
    id: "settings",
    label: "Widget Settings",
    icon: Settings,
    color: "text-slate-700",
  },
  {
    id: "delete",
    label: "Delete Widget",
    icon: Trash2,
    color: "text-red-600",
    danger: true,
  },
];

export default function WidgetMenu({
  open,
  onClose,
  onAction,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        onClose?.();
      }
    }

    if (open) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          initial={{
            opacity: 0,
            scale: 0.95,
            y: -10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: -10,
          }}
          transition={{
            duration: 0.18,
          }}
          className="
            absolute
            right-4
            top-14
            z-50
            w-72
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-2xl
            backdrop-blur-xl
          "
        >
          {/* Header */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
            <h3 className="font-bold text-slate-800">
              Widget Actions
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Manage this dashboard widget
            </p>
          </div>

          {/* Menu */}
          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onAction?.(item.id);
                    onClose?.();
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-4
                    px-5
                    py-3
                    text-sm
                    transition-all
                    duration-200

                    ${
                      item.danger
                        ? "hover:bg-red-50 hover:text-red-600"
                        : "hover:bg-slate-50"
                    }
                  `}
                >
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-100
                      ${item.color}
                    `}
                  >
                    <Icon size={18} />
                  </div>

                  <span className="font-medium">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">
            <p className="text-xs text-slate-500">
              Xllent ERP Dashboard • Widget Management
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}