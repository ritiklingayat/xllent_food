// ======================================================
// XLLENT FOODS ERP
// Role Configuration
// ======================================================

export const ROLES = Object.freeze({
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SUPER_STOCKIST: "SUPER_STOCKIST",
  DISTRIBUTOR: "DISTRIBUTOR",
  WHOLESALER: "WHOLESALER",
  ASM: "ASM",
  SO: "SO",
  RETAILER: "RETAILER",
});

// ======================================================
// ROLE LIST
// ======================================================

export const ROLE_LIST = Object.freeze([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.SUPER_STOCKIST,
  ROLES.DISTRIBUTOR,
  ROLES.WHOLESALER,
  ROLES.ASM,
  ROLES.SO,
  ROLES.RETAILER,
]);

// ======================================================
// ROLE LABELS
// ======================================================

export const ROLE_LABELS = Object.freeze({
  [ROLES.SUPER_ADMIN]: "Super Admin",
  [ROLES.ADMIN]: "Admin",
  [ROLES.SUPER_STOCKIST]: "Super Stockist",
  [ROLES.DISTRIBUTOR]: "Distributor",
  [ROLES.WHOLESALER]: "Wholesaler",
  [ROLES.ASM]: "Area Sales Manager",
  [ROLES.SO]: "Sales Officer",
  [ROLES.RETAILER]: "Retailer",
});

// ======================================================
// ROLE PRIORITY
// Higher number = Higher access
// ======================================================

export const ROLE_PRIORITY = Object.freeze({
  [ROLES.SUPER_ADMIN]: 100,
  [ROLES.ADMIN]: 90,
  [ROLES.SUPER_STOCKIST]: 80,
  [ROLES.DISTRIBUTOR]: 70,
  [ROLES.WHOLESALER]: 60,
  [ROLES.ASM]: 50,
  [ROLES.SO]: 40,
  [ROLES.RETAILER]: 30,
});

// ======================================================
// ROLE COLORS
// Used in badges & chips
// ======================================================

export const ROLE_COLORS = Object.freeze({
  [ROLES.SUPER_ADMIN]:
    "bg-red-100 text-red-700 border-red-200",

  [ROLES.ADMIN]:
    "bg-orange-100 text-orange-700 border-orange-200",

  [ROLES.SUPER_STOCKIST]:
    "bg-purple-100 text-purple-700 border-purple-200",

  [ROLES.DISTRIBUTOR]:
    "bg-blue-100 text-blue-700 border-blue-200",

  [ROLES.WHOLESALER]:
    "bg-cyan-100 text-cyan-700 border-cyan-200",

  [ROLES.ASM]:
    "bg-green-100 text-green-700 border-green-200",

  [ROLES.SO]:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  [ROLES.RETAILER]:
    "bg-slate-100 text-slate-700 border-slate-200",
});

// ======================================================
// ROLE DASHBOARD ROUTES
// ======================================================

export const ROLE_DASHBOARD = Object.freeze({
  [ROLES.SUPER_ADMIN]: "/dashboard/executive",
  [ROLES.ADMIN]: "/dashboard/admin",
  [ROLES.SUPER_STOCKIST]: "/dashboard/super-stockist",
  [ROLES.DISTRIBUTOR]: "/dashboard/distributor",
  [ROLES.WHOLESALER]: "/dashboard/wholesaler",
  [ROLES.ASM]: "/dashboard/asm",
  [ROLES.SO]: "/dashboard/sales",
  [ROLES.RETAILER]: "/dashboard/retailer",
});

// ======================================================
// HELPERS
// ======================================================

export const getRoleLabel = (role) =>
  ROLE_LABELS[role] || "Unknown";

export const getRoleColor = (role) =>
  ROLE_COLORS[role] ||
  "bg-slate-100 text-slate-700 border-slate-200";

export const getDashboardRoute = (role) =>
  ROLE_DASHBOARD[role] || "/dashboard";

export const hasMinimumRole = (
  currentRole,
  requiredRole
) => {
  return (
    (ROLE_PRIORITY[currentRole] || 0) >=
    (ROLE_PRIORITY[requiredRole] || 0)
  );
};

export default ROLES;