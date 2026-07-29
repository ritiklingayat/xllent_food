import React, { useState } from "react";
import { Search, Sparkles, X } from "lucide-react";

const suggestions = [
  "Revenue Report",
  "Today's Orders",
  "Inventory",
  "Customers",
  "Low Stock",
  "Products",
  "Sales Analytics",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filtered = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div
        className={`
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        px-5
        py-4
        transition-all
        duration-300
        ${
          focused
            ? "ring-2 ring-orange-400 border-orange-400"
            : ""
        }
      `}
      >
        <Search
          size={20}
          className="text-orange-300"
        />

        <input
          type="text"
          value={query}
          placeholder="Search dashboard, products, customers..."
          onFocus={() => setFocused(true)}
          onBlur={() =>
            setTimeout(() => setFocused(false), 150)
          }
          onChange={(e) => setQuery(e.target.value)}
          className="
            flex-1
            bg-transparent
            outline-none
            placeholder:text-slate-300
            text-white
          "
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-slate-300 hover:text-white"
          >
            <X size={18} />
          </button>
        )}

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-orange-500
            px-3
            py-2
            text-sm
            font-semibold
            shadow-lg
          "
        >
          <Sparkles size={16} />
          AI Search
        </div>
      </div>

      {focused && filtered.length > 0 && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            mt-2
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-2xl
            overflow-hidden
            z-50
          "
        >
          {filtered.map((item) => (
            <button
              key={item}
              onMouseDown={() => setQuery(item)}
              className="
                w-full
                px-5
                py-3
                text-left
                hover:bg-orange-50
                transition
              "
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}