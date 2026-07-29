import React, { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

export default function LiveClock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-orange-500
          shadow-lg
        "
      >
        <Clock3
          size={22}
          className="text-white"
        />
      </div>

      <div>
        <p className="text-xs text-slate-300">
          Current Time
        </p>

        <h3 className="text-lg font-bold">
          {date.toLocaleTimeString("en-IN")}
        </h3>

        <p className="text-xs text-slate-400">
          {date.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}