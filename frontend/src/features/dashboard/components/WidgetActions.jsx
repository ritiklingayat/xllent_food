import {
  RefreshCcw,
  Download,
  Maximize2,
  Minimize2,
  Move,
  MoreVertical,
} from "lucide-react";

export default function WidgetActions({
  fullscreen = false,
  draggable = false,
  allowRefresh = true,
  allowExport = true,
  allowFullscreen = true,
  onRefresh,
  onExport,
  onFullscreen,
}) {
  return (
    <div className="flex items-center gap-2">
      {draggable && (
        <button
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-slate-400
            transition
            hover:bg-orange-50
            hover:text-orange-600
            active:scale-95
            cursor-grab
          "
          title="Drag Widget"
        >
          <Move size={17} />
        </button>
      )}

      {allowRefresh && (
        <button
          onClick={onRefresh}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition
            hover:bg-blue-50
            hover:text-blue-600
            active:scale-95
          "
          title="Refresh"
        >
          <RefreshCcw size={17} />
        </button>
      )}

      {allowExport && (
        <button
          onClick={onExport}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition
            hover:bg-emerald-50
            hover:text-emerald-600
            active:scale-95
          "
          title="Export"
        >
          <Download size={17} />
        </button>
      )}

      {allowFullscreen && (
        <button
          onClick={onFullscreen}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition
            hover:bg-indigo-50
            hover:text-indigo-600
            active:scale-95
          "
          title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {fullscreen ? (
            <Minimize2 size={17} />
          ) : (
            <Maximize2 size={17} />
          )}
        </button>
      )}

      <button
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          text-slate-500
          transition
          hover:bg-slate-100
          active:scale-95
        "
        title="More"
      >
        <MoreVertical size={17} />
      </button>
    </div>
  );
}