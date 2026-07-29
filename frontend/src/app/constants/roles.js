/* ==========================================================
   Xllent Foods ERP
   Role Management System
   ----------------------------------------------------------
   Central place for all application roles.
   Every permission, menu, route and widget should use
   these constants instead of hardcoded strings.
========================================================== */

/* ==========================================================
   Role Constants
========================================================== */

export const ROLES = Object.freeze({
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SUPER_STOCKIEST: "SUPER_STOCKIEST",
  DISTRIBUTOR: "DISTRIBUTOR",
  ASM: "ASM",
  SO: "SO",
});

/* ==========================================================
   Role Hierarchy
   Higher number = Higher Authority
========================================================== */

export const ROLE_LEVEL = Object.freeze({
  SUPER_ADMIN: 100,
  ADMIN: 90,
  SUPER_STOCKIEST: 80,
  DISTRIBUTOR: 70,
  ASM: 60,
  SO: 50,
});

/* ==========================================================
   Ordered Hierarchy
========================================================== */

export const ROLE_HIERARCHY = Object.freeze([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.SUPER_STOCKIEST,
  ROLES.DISTRIBUTOR,
  ROLES.ASM,
  ROLES.SO,
]);

/* ==========================================================
   Role Labels
========================================================== */

export const ROLE_LABELS = Object.freeze({
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Administrator",
  SUPER_STOCKIEST: "Super Stockiest",
  DISTRIBUTOR: "Distributor",
  ASM: "Area Sales Manager",
  SO: "Sales Officer",
});

/* ==========================================================
   Role Colors
========================================================== */

export const ROLE_COLORS = Object.freeze({
  SUPER_ADMIN: "bg-red-100 text-red-700",
  ADMIN: "bg-orange-100 text-orange-700",
  SUPER_STOCKIEST: "bg-purple-100 text-purple-700",
  DISTRIBUTOR: "bg-blue-100 text-blue-700",
  ASM: "bg-green-100 text-green-700",
  SO: "bg-sky-100 text-sky-700",
});

/* ==========================================================
   Dashboard Routes
========================================================== */

export const ROLE_DASHBOARD = Object.freeze({
  SUPER_ADMIN: "/dashboard",
  ADMIN: "/dashboard",
  SUPER_STOCKIEST: "/dashboard",
  DISTRIBUTOR: "/dashboard",
  ASM: "/dashboard/asm",
  SO: "/dashboard/sales",
});

/* ==========================================================
   Role Groups
========================================================== */

export const ADMIN_ROLES = Object.freeze([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
]);

export const MANAGEMENT_ROLES = Object.freeze([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.SUPER_STOCKIEST,
]);

export const SALES_ROLES = Object.freeze([
  ROLES.ASM,
  ROLES.SO,
]);

export const DISTRIBUTION_ROLES = Object.freeze([
  ROLES.SUPER_STOCKIEST,
  ROLES.DISTRIBUTOR,
]);

/* ==========================================================
   Helper Functions
========================================================== */

export const isValidRole = (role) =>
  Object.values(ROLES).includes(role);

export const getRoleLevel = (role) =>
  ROLE_LEVEL[role] ?? 0;

export const getRoleLabel = (role) =>
  ROLE_LABELS[role] ?? "Unknown";

export const getRoleColor = (role) =>
  ROLE_COLORS[role] ??
  "bg-slate-100 text-slate-700";

export const getDashboardRoute = (role) =>
  ROLE_DASHBOARD[role] ?? "/login";

/* ==========================================================
   Role Check Helpers
========================================================== */

export const isSuperAdmin = (role) =>
  role === ROLES.SUPER_ADMIN;

export const isAdmin = (role) =>
  role === ROLES.ADMIN;

export const isSuperStockiest = (role) =>
  role === ROLES.SUPER_STOCKIEST;

export const isDistributor = (role) =>
  role === ROLES.DISTRIBUTOR;

export const isASM = (role) =>
  role === ROLES.ASM;

export const isSO = (role) =>
  role === ROLES.SO;

/* ==========================================================
   Group Helpers
========================================================== */

export const isAdminRole = (role) =>
  ADMIN_ROLES.includes(role);

export const isManagementRole = (role) =>
  MANAGEMENT_ROLES.includes(role);

export const isSalesRole = (role) =>
  SALES_ROLES.includes(role);

export const isDistributionRole = (role) =>
  DISTRIBUTION_ROLES.includes(role);

/* ==========================================================
   Hierarchy Helpers
========================================================== */

export const hasHigherRole = (
  currentRole,
  targetRole
) =>
  getRoleLevel(currentRole) >
  getRoleLevel(targetRole);

export const hasHigherOrEqualRole = (
  currentRole,
  targetRole
) =>
  getRoleLevel(currentRole) >=
  getRoleLevel(targetRole);

export const compareRoles = (
  roleA,
  roleB
) =>
  getRoleLevel(roleA) -
  getRoleLevel(roleB);

/* ==========================================================
   Default Export
========================================================== */

export default ROLES;