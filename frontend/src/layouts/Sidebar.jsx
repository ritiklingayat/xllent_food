import React from "react";

import { NavLink } from "react-router-dom";

import { getAuthUser } from "@/features/auth/utils/authStorage";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    roles: ["SUPER_ADMIN", "ADMIN", "ASM", "SO"],
  },
  {
    name: "Products",
    path: "/dashboard/products",
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Inventory",
    path: "/dashboard/inventory",
    roles: ["SUPER_ADMIN", "ADMIN", "ASM"],
  },
  {
    name: "Customers",
    path: "/dashboard/customers",
    roles: ["SUPER_ADMIN", "ADMIN", "ASM", "SO"],
  },
  {
    name: "Orders",
    path: "/dashboard/orders",
    roles: ["SUPER_ADMIN", "ADMIN", "ASM", "SO"],
  },
  {
    name: "Users",
    path: "/dashboard/users",
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
];

export default function Sidebar() {
  const user = getAuthUser();

  const role = user?.role || "SO";

  const visibleMenu = menu.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col">

      {/* Logo */}

      <div className="p-6 border-b">

        <h1 className="text-2xl font-black text-orange-500">
          Xllent Foods
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Distribution ERP
        </p>

      </div>

      {/* User */}

      <div className="px-6 py-5 border-b">

        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <h3 className="mt-3 font-bold text-slate-800">
          {user?.name || "User"}
        </h3>

        <p className="text-sm text-slate-500">
          {role}
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">

        {visibleMenu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 font-medium transition ${
                isActive
                  ? "bg-orange-500 text-white shadow"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            {item.name}
          </NavLink>

        ))}

      </nav>

      {/* Footer */}

      <div className="border-t p-5">

        <div className="text-xs text-slate-400">
          Xllent Foods ERP
        </div>

        <div className="text-xs text-slate-400 mt-1">
          Version 1.0.0
        </div>

      </div>

    </aside>
  );
}