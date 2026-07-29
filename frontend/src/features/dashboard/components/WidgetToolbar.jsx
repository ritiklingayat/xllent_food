import { useEffect, useRef, useState } from "react";
import {
  MoreVertical,
  RefreshCcw,
  Download,
  Maximize2,
  Minimize2,
  EyeOff,
  Pin,
  Settings,
  X,
} from "lucide-react";

export default function WidgetToolbar({
  fullscreen = false,
  pinned = false,
  onRefresh,
  onExport,
  onFullscreen,
  onPin,
  onHide,
  onSettings,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const Item = ({
    icon: Icon,
    label,
    danger = false,
    onClick,
  }) => (
    <button
      onClick={() => {
        setOpen(false);
        onClick?.();
      }}
      className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition
        text-sm
        font-medium
        ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : "text-slate-700 hover:bg-slate-100"
        }
      `}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div
      className="relative flex items-center gap-2"
      ref={menuRef}
    >
      {/* Refresh */}

      <button
        onClick={onRefresh}
        title="Refresh"
        className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-orange-600"
      >
        <RefreshCcw size={18} />
      </button>

      {/* Export */}

      <button
        onClick={onExport}
        title="Export"
        className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-emerald-600"
      >
        <Download size={18} />
      </button>

      {/* Fullscreen */}

      <button
        onClick={onFullscreen}
        title="Fullscreen"
        className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
      >
        {fullscreen ? (
          <Minimize2 size={18} />
        ) : (
          <Maximize2 size={18} />
        )}
      </button>

      {/* Menu */}

      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-12
            w-60
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-2xl
            p-2
            z-50
          "
        >
          <Item
            icon={RefreshCcw}
            label="Refresh Widget"
            onClick={onRefresh}
          />

          <Item
            icon={Download}
            label="Export Data"
            onClick={onExport}
          />

          <Item
            icon={fullscreen ? Minimize2 : Maximize2}
            label={
              fullscreen
                ? "Exit Fullscreen"
                : "Fullscreen"
            }
            onClick={onFullscreen}
          />

          <Item
            icon={Pin}
            label={
              pinned
                ? "Unpin Widget"
                : "Pin Widget"
            }
            onClick={onPin}
          />

          <Item
            icon={Settings}
            label="Widget Settings"
            onClick={onSettings}
          />

          <Item
            icon={EyeOff}
            label="Hide Widget"
            onClick={onHide}
          />

          <div className="my-2 border-t border-slate-200" />

          <Item
            icon={X}
            label="Close Menu"
            danger
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}