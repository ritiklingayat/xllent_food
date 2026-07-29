// ======================================================
// XLLENT FOODS ERP
// Permission Configuration
// ======================================================

import { ROLES } from "./roles";

// ======================================================
// PERMISSION CONSTANTS
// ======================================================

export const PERMISSIONS = Object.freeze({
  // Dashboard
  DASHBOARD_VIEW: "DASHBOARD_VIEW",

  // Products
  PRODUCT_VIEW: "PRODUCT_VIEW",
  PRODUCT_CREATE: "PRODUCT_CREATE",
  PRODUCT_UPDATE: "PRODUCT_UPDATE",
  PRODUCT_DELETE: "PRODUCT_DELETE",

  // Categories
  CATEGORY_VIEW: "CATEGORY_VIEW",
  CATEGORY_CREATE: "CATEGORY_CREATE",
  CATEGORY_UPDATE: "CATEGORY_UPDATE",
  CATEGORY_DELETE: "CATEGORY_DELETE",

  // Inventory
  INVENTORY_VIEW: "INVENTORY_VIEW",
  INVENTORY_CREATE: "INVENTORY_CREATE",
  INVENTORY_UPDATE: "INVENTORY_UPDATE",
  INVENTORY_DELETE: "INVENTORY_DELETE",

  // Orders
  ORDER_VIEW: "ORDER_VIEW",
  ORDER_CREATE: "ORDER_CREATE",
  ORDER_UPDATE: "ORDER_UPDATE",
  ORDER_DELETE: "ORDER_DELETE",
  ORDER_APPROVE: "ORDER_APPROVE",

  // Customers
  CUSTOMER_VIEW: "CUSTOMER_VIEW",
  CUSTOMER_CREATE: "CUSTOMER_CREATE",
  CUSTOMER_UPDATE: "CUSTOMER_UPDATE",
  CUSTOMER_DELETE: "CUSTOMER_DELETE",

  // Users
  USER_VIEW: "USER_VIEW",
  USER_CREATE: "USER_CREATE",
  USER_UPDATE: "USER_UPDATE",
  USER_DELETE: "USER_DELETE",

  // Reports
  REPORT_VIEW: "REPORT_VIEW",
  REPORT_EXPORT: "REPORT_EXPORT",

  // Analytics
  ANALYTICS_VIEW: "ANALYTICS_VIEW",

  // Settings
  SETTINGS_VIEW: "SETTINGS_VIEW",
  SETTINGS_UPDATE: "SETTINGS_UPDATE",

  // Company
  COMPANY_VIEW: "COMPANY_VIEW",
  COMPANY_UPDATE: "COMPANY_UPDATE",
});

// ======================================================
// ALL PERMISSIONS
// ======================================================

export const ALL_PERMISSIONS = Object.freeze(
  Object.values(PERMISSIONS)
);

// ======================================================
// ROLE → PERMISSION MAPPING
// ======================================================

export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.SUPER_ADMIN]: [...ALL_PERMISSIONS],

  [ROLES.ADMIN]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,
    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.PRODUCT_DELETE,

    PERMISSIONS.CATEGORY_VIEW,
    PERMISSIONS.CATEGORY_CREATE,
    PERMISSIONS.CATEGORY_UPDATE,
    PERMISSIONS.CATEGORY_DELETE,

    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.INVENTORY_CREATE,
    PERMISSIONS.INVENTORY_UPDATE,

    PERMISSIONS.ORDER_VIEW,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_UPDATE,

    PERMISSIONS.CUSTOMER_VIEW,
    PERMISSIONS.CUSTOMER_CREATE,
    PERMISSIONS.CUSTOMER_UPDATE,

    PERMISSIONS.USER_VIEW,

    PERMISSIONS.REPORT_VIEW,
    PERMISSIONS.REPORT_EXPORT,

    PERMISSIONS.ANALYTICS_VIEW,
  ],

  [ROLES.SUPER_STOCKIST]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,

    PERMISSIONS.CATEGORY_VIEW,

    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.INVENTORY_UPDATE,

    PERMISSIONS.ORDER_VIEW,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_UPDATE,

    PERMISSIONS.CUSTOMER_VIEW,

    PERMISSIONS.REPORT_VIEW,
  ],

  [ROLES.DISTRIBUTOR]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,

    PERMISSIONS.CATEGORY_VIEW,

    PERMISSIONS.ORDER_VIEW,
    PERMISSIONS.ORDER_CREATE,

    PERMISSIONS.CUSTOMER_VIEW,

    PERMISSIONS.REPORT_VIEW,
  ],

  [ROLES.WHOLESALER]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,

    PERMISSIONS.ORDER_VIEW,
    PERMISSIONS.ORDER_CREATE,

    PERMISSIONS.CUSTOMER_VIEW,
  ],

  [ROLES.ASM]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,

    PERMISSIONS.ORDER_VIEW,

    PERMISSIONS.CUSTOMER_VIEW,

    PERMISSIONS.REPORT_VIEW,

    PERMISSIONS.ANALYTICS_VIEW,
  ],

  [ROLES.SO]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,

    PERMISSIONS.ORDER_VIEW,
    PERMISSIONS.ORDER_CREATE,

    PERMISSIONS.CUSTOMER_VIEW,
  ],

  [ROLES.RETAILER]: [
    PERMISSIONS.DASHBOARD_VIEW,

    PERMISSIONS.PRODUCT_VIEW,

    PERMISSIONS.ORDER_VIEW,
    PERMISSIONS.ORDER_CREATE,
  ],
});

// ======================================================
// HELPERS
// ======================================================

export const getPermissionsByRole = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

export const hasPermission = (
  role,
  permission
) => {
  return getPermissionsByRole(role).includes(permission);
};

export const hasAnyPermission = (
  role,
  permissions = []
) => {
  const rolePermissions = getPermissionsByRole(role);

  return permissions.some((permission) =>
    rolePermissions.includes(permission)
  );
};

export const hasAllPermissions = (
  role,
  permissions = []
) => {
  const rolePermissions = getPermissionsByRole(role);

  return permissions.every((permission) =>
    rolePermissions.includes(permission)
  );
};

export default PERMISSIONS;