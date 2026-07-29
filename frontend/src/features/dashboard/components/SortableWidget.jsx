import React from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ResizableWidget from "./ResizableWidget";

const sizeClasses = {
  small: "col-span-1",
  medium: "col-span-1 md:col-span-1",
  large: "col-span-1 md:col-span-2 xl:col-span-2",
  full: "col-span-1 md:col-span-2 xl:col-span-3",
};

export default function SortableWidget({
  id,
  children,
  size = "medium",
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      layout
      style={style}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
      }}
      className={sizeClasses[size] || sizeClasses.medium}
    >
      <div
        className={`
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:shadow-2xl
          ${
            isDragging
              ? "scale-[1.02] rotate-1 shadow-2xl ring-2 ring-orange-400 opacity-90 z-50"
              : ""
          }
        `}
      >
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-400/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />

        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          title="Drag Widget"
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-500
            shadow-sm
            transition
            hover:bg-orange-500
            hover:text-white
            active:cursor-grabbing
            touch-none
          "
        >
          <GripVertical size={18} />
        </button>

        {/* Widget Content */}
        <div className="relative">
          <ResizableWidget>
            {children}
          </ResizableWidget>
        </div>
      </div>
    </motion.div>
  );
}