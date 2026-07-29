/* ==========================================================
   Xllent Foods ERP
   Dynamic Route Configuration
   ----------------------------------------------------------
   Single Source of Truth for all dashboard routes.
========================================================== */

import { lazy } from "react";

import ROLES from "@/app/constants/roles";

import { PERMISSIONS } from "@/app/constants/permissions";

/* ==========================================================
   Layouts
========================================================== */

export const LAYOUTS = Object.freeze({
  DASHBOARD: "dashboard",
  AUTH: "auth",
  PUBLIC: "public",
});

/* ==========================================================
   Lazy Loaded Pages
========================================================== */

/* Dashboard */

const Dashboard = lazy(() =>
  import("@/features/dashboard/pages/Dashboard")
);

/* Products */

const Products = lazy(() =>
  import("@/features/dashboard/products/pages/Products")
);

const ProductCreate = lazy(() =>
  import("@/features/dashboard/products/pages/ProductCreate")
);

const ProductEdit = lazy(() =>
  import("@/features/dashboard/products/pages/ProductEdit")
);

/* Categories */

const Categories = lazy(() =>
  import("@/features/dashboard/categories/pages/Categories")
);

/* Inventory */

const Inventory = lazy(() =>
  import("@/features/dashboard/inventory/pages/Inventory")
);

/* Orders */

const Orders = lazy(() =>
  import("@/features/dashboard/orders/pages/Orders")
);

const OrderCreate = lazy(() =>
  import("@/features/dashboard/orders/pages/OrderCreate")
);

const OrderDetails = lazy(() =>
  import("@/features/dashboard/orders/pages/OrderDetails")
);

/* Customers */

const Customers = lazy(() =>
  import("@/features/dashboard/customers/pages/Customers")
);

/* Users */

const Users = lazy(() =>
  import("@/features/dashboard/users/pages/Users")
);

/* Reports */

const Reports = lazy(() =>
  import("@/features/dashboard/reports/pages/Reports")
);

/* Finance */

const Finance = lazy(() =>
  import("@/features/dashboard/finance/pages/Finance")
);

/* Settings */

const Settings = lazy(() =>
  import("@/features/dashboard/settings/pages/Settings")
);

/* Notifications */

const Notifications = lazy(() =>
  import("@/features/dashboard/notifications/pages/Notifications")
);

/* ==========================================================
   Route Configuration
========================================================== */

const routeConfig = [

  /* ==========================================
     Dashboard
  ========================================== */

  {
    id: "dashboard",

    path: "/dashboard",

    element: Dashboard,

    layout: LAYOUTS.DASHBOARD,

    title: "Dashboard",

    breadcrumb: [
      "Dashboard"
    ],

    permission: PERMISSIONS.DASHBOARD_VIEW,

    roles: Object.values(ROLES),
  },

  /* ==========================================
     Products
  ========================================== */

  {
    id: "products",

    path: "/dashboard/products",

    element: Products,

    layout: LAYOUTS.DASHBOARD,

    title: "Products",

    breadcrumb: [
      "Catalog",
      "Products",
    ],

    permission: PERMISSIONS.PRODUCTS_VIEW,

    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },

  {
    id: "product-create",

    path: "/dashboard/products/create",

    element: ProductCreate,

    layout: LAYOUTS.DASHBOARD,

    title: "Create Product",

    breadcrumb: [
      "Catalog",
      "Products",
      "Create",
    ],

    permission: PERMISSIONS.PRODUCTS_CREATE,

    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },

  {
    id: "product-edit",

    path: "/dashboard/products/:id",

    element: ProductEdit,

    layout: LAYOUTS.DASHBOARD,

    title: "Edit Product",

    breadcrumb: [
      "Catalog",
      "Products",
      "Edit",
    ],

    permission: PERMISSIONS.PRODUCTS_UPDATE,

    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },

  /* ==========================================
     Categories
  ========================================== */

  {
    id: "categories",

    path: "/dashboard/categories",

    element: Categories,

    layout: LAYOUTS.DASHBOARD,

    title: "Categories",

    breadcrumb: [
      "Catalog",
      "Categories",
    ],

    permission: PERMISSIONS.CATEGORIES_VIEW,

    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },

  /* ==========================================
     Inventory
  ========================================== */

  {
    id: "inventory",

    path: "/dashboard/inventory",

    element: Inventory,

    layout: LAYOUTS.DASHBOARD,

    title: "Inventory",

    breadcrumb: [
      "Inventory"
    ],

    permission: PERMISSIONS.INVENTORY_VIEW,

    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.SUPER_STOCKIEST,
      ROLES.DISTRIBUTOR,
    ],
  },

  /* ==========================================
     Orders
  ========================================== */

  {
    id: "orders",

    path: "/dashboard/orders",

    element: Orders,

    layout: LAYOUTS.DASHBOARD,

    title: "Orders",

    breadcrumb: [
      "Orders"
    ],

    permission: PERMISSIONS.ORDERS_VIEW,

    roles: Object.values(ROLES),
  },

  {
    id: "order-create",

    path: "/dashboard/orders/create",

    element: OrderCreate,

    layout: LAYOUTS.DASHBOARD,

    title: "Create Order",

    breadcrumb: [
      "Orders",
      "Create",
    ],

    permission: PERMISSIONS.ORDERS_CREATE,

    roles: Object.values(ROLES),
  },

  {
    id: "order-details",

    path: "/dashboard/orders/:id",

    element: OrderDetails,

    layout: LAYOUTS.DASHBOARD,

    title: "Order Details",

    breadcrumb: [
      "Orders",
      "Details",
    ],

    permission: PERMISSIONS.ORDERS_VIEW,

    roles: Object.values(ROLES),
  },

  /* ==========================================
     Customers
  ========================================== */

  {
    id: "customers",

    path: "/dashboard/customers",

    element: Customers,

    layout: LAYOUTS.DASHBOARD,

    title: "Customers",

    breadcrumb: [
      "Customers"
    ],

    permission: PERMISSIONS.CUSTOMERS_VIEW,

    roles: Object.values(ROLES),
  },

  /* ==========================================
     Users
  ========================================== */

  {
    id: "users",

    path: "/dashboard/users",

    element: Users,

    layout: LAYOUTS.DASHBOARD,

    title: "Users",

    breadcrumb: [
      "Administration",
      "Users",
    ],

    permission: PERMISSIONS.USERS_VIEW,

    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },

  /* ==========================================
     Reports
  ========================================== */

  {
    id: "reports",

    path: "/dashboard/reports",

    element: Reports,

    layout: LAYOUTS.DASHBOARD,

    title: "Reports",

    breadcrumb: [
      "Reports"
    ],

    permission: PERMISSIONS.REPORTS_VIEW,

    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.SUPER_STOCKIEST,
      ROLES.DISTRIBUTOR,
      ROLES.ASM,
    ],
  },

  /* ==========================================
     Finance
  ========================================== */

  {
    id: "finance",

    path: "/dashboard/finance",

    element: Finance,

    layout: LAYOUTS.DASHBOARD,

    title: "Finance",

    breadcrumb: [
      "Finance"
    ],

    permission: PERMISSIONS.FINANCE_VIEW,

    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },

  /* ==========================================
     Notifications
  ========================================== */

  {
    id: "notifications",

    path: "/dashboard/notifications",

    element: Notifications,

    layout: LAYOUTS.DASHBOARD,

    title: "Notifications",

    breadcrumb: [
      "Notifications"
    ],

    permission: PERMISSIONS.NOTIFICATIONS_VIEW,

    roles: Object.values(ROLES),
  },

  /* ==========================================
     Settings
  ========================================== */

  {
    id: "settings",

    path: "/dashboard/settings",

    element: Settings,

    layout: LAYOUTS.DASHBOARD,

    title: "Settings",

    breadcrumb: [
      "Settings"
    ],

    permission: PERMISSIONS.SETTINGS_VIEW,

    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },

];

export default routeConfig;