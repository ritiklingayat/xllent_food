import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import SortableWidget from "./SortableWidget";
import WidgetRenderer from "./WidgetRenderer";

import { reorderWidgets } from "../customization/dashboardLayoutSlice";

export default function DashboardGrid() {
  const dispatch = useDispatch();

  const widgets = useSelector(
    (state) => state.dashboardLayout.widgets
  );

  const visibleWidgets = widgets.filter(
    (widget) => widget.enabled
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = widgets.findIndex(
      (item) => item.id === active.id
    );

    const newIndex = widgets.findIndex(
      (item) => item.id === over.id
    );

    if (oldIndex === -1 || newIndex === -1) return;

    dispatch(
      reorderWidgets(
        arrayMove(widgets, oldIndex, newIndex)
      )
    );
  };

  if (visibleWidgets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          rounded-3xl
          border-2
          border-dashed
          border-slate-300
          bg-white
          py-24
          text-center
          shadow-sm
        "
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <LayoutDashboard
              size={38}
              className="text-orange-500"
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            No Widgets Enabled
          </h2>

          <p className="max-w-md text-slate-500">
            Enable dashboard widgets from Settings to
            personalize your ERP workspace.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={visibleWidgets.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        <motion.div
          layout
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
            auto-rows-max
          "
        >
          {visibleWidgets.map((widget) => (
            <SortableWidget
              key={widget.id}
              id={widget.id}
              size={widget.size}
            >
              <WidgetRenderer widget={widget} />
            </SortableWidget>
          ))}
        </motion.div>
      </SortableContext>
    </DndContext>
  );
}