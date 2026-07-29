/* ==========================================================
   Xllent Foods ERP
   Permission Management System
========================================================== */

import ROLES from "./roles";

/* ==========================================================
   Permission Keys
========================================================== */

export const PERMISSIONS = Object.freeze({

  /* Dashboard */
  DASHBOARD_VIEW: "dashboard.view",

  /* Products */
  PRODUCTS_VIEW: "products.view",
  PRODUCTS_CREATE: "products.create",
  PRODUCTS_UPDATE: "products.update",
  PRODUCTS_DELETE: "products.delete",
  PRODUCTS_IMPORT: "products.import",
  PRODUCTS_EXPORT: "products.export",

  /* Categories */
  CATEGORIES_VIEW: "categories.view",
  CATEGORIES_CREATE: "categories.create",
  CATEGORIES_UPDATE: "categories.update",
  CATEGORIES_DELETE: "categories.delete",

  /* Brands */
  BRANDS_VIEW: "brands.view",
  BRANDS_CREATE: "brands.create",
  BRANDS_UPDATE: "brands.update",
  BRANDS_DELETE: "brands.delete",

  /* Inventory */
  INVENTORY_VIEW: "inventory.view",
  INVENTORY_STOCK_IN: "inventory.stockIn",
  INVENTORY_STOCK_OUT: "inventory.stockOut",
  INVENTORY_TRANSFER: "inventory.transfer",
  INVENTORY_PURCHASE: "inventory.purchase",
  INVENTORY_ADJUST: "inventory.adjust",

  /* Orders */
  ORDERS_VIEW: "orders.view",
  ORDERS_CREATE: "orders.create",
  ORDERS_UPDATE: "orders.update",
  ORDERS_DELETE: "orders.delete",
  ORDERS_APPROVE: "orders.approve",
  ORDERS_PRINT: "orders.print",
  ORDERS_EXPORT: "orders.export",

  /* Customers */
  CUSTOMERS_VIEW: "customers.view",
  CUSTOMERS_CREATE: "customers.create",
  CUSTOMERS_UPDATE: "customers.update",
  CUSTOMERS_DELETE: "customers.delete",
  CUSTOMERS_ASSIGN: "customers.assign",

  /* Users */
  USERS_VIEW: "users.view",
  USERS_CREATE: "users.create",
  USERS_UPDATE: "users.update",
  USERS_DELETE: "users.delete",
  USERS_RESET_PASSWORD: "users.resetPassword",

  /* Sales Team */
  SALES_VIEW: "sales.view",
  SALES_CREATE: "sales.create",
  SALES_UPDATE: "sales.update",
  SALES_DELETE: "sales.delete",

  /* Attendance */
  ATTENDANCE_VIEW: "attendance.view",
  ATTENDANCE_MARK: "attendance.mark",
  ATTENDANCE_APPROVE: "attendance.approve",

  /* Reports */
  REPORTS_VIEW: "reports.view",
  REPORTS_EXPORT: "reports.export",

  /* Finance */
  FINANCE_VIEW: "finance.view",
  FINANCE_PAYMENT: "finance.payment",

  /* Settings */
  SETTINGS_VIEW: "settings.view",
  SETTINGS_UPDATE: "settings.update",

  /* Notifications */
  NOTIFICATIONS_VIEW: "notifications.view",

});