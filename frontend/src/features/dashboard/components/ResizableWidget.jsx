import React, { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { ResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

export default function ResizableWidget({ children }) {
  const [fullscreen, setFullscreen] = useState(false);

  if (fullscreen) {
    return (
      <div
        className="
          fixed
          inset-6
          z-[9999]
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
          border
          border-slate-200
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
            px-5
            py-4
            bg-slate-50
          "
        >
          <h3 className="text-lg font-bold text-slate-800">
            Widget
          </h3>

          <button
            onClick={() => setFullscreen(false)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-orange-600
            "
          >
            <Minimize2 size={18} />
            Exit Fullscreen
          </button>
        </div>

        <div
          className="
            h-[calc(100%-72px)]
            overflow-auto
            p-5
          "
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Fullscreen Button */}
      <button
        onClick={() => setFullscreen(true)}
        className="
          absolute
          right-2
          top-2
          z-20
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-slate-100
          text-slate-600
          transition
          hover:bg-orange-500
          hover:text-white
        "
      >
        <Maximize2 size={16} />
      </button>

      <ResizableBox
        width={500}
        height={360}
        minConstraints={[320, 240]}
        maxConstraints={[1200, 900]}
        resizeHandles={["se"]}
        className="w-full"
      >
        <div
          className="
            h-full
            w-full
            overflow-auto
            rounded-2xl
            bg-white
          "
        >
          {children}
        </div>
      </ResizableBox>
    </div>
  );
}