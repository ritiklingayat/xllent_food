import {
  LayoutDashboard,
  Package,
  Layers3,
  Warehouse,
  ShoppingCart,
  Users,
  Truck,
  Building2,
  BarChart3,
  FileText,
  Settings,
  Shield,
  Boxes,
} from "lucide-react";

import { ROLES } from "./roles";
import { PERMISSIONS } from "./permissions";

// ======================================================
// SIDEBAR CONFIG
// ======================================================

export const sidebarConfig = [
  // ======================================================
  // DASHBOARD
  // ======================================================

  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    permission: PERMISSIONS.DASHBOARD_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.SUPER_STOCKIST,
      ROLES.DISTRIBUTOR,
      ROLES.WHOLESALER,
      ROLES.ASM,
      ROLES.SO,
      ROLES.RETAILER,
    ],
  },

  // ======================================================
  // PRODUCTS
  // ======================================================

  {
    id: "products",
    label: "Products",
    path: "/dashboard/products",
    icon: Package,
    permission: PERMISSIONS.PRODUCT_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.SUPER_STOCKIST,
      ROLES.DISTRIBUTOR,
      ROLES.WHOLESALER,
      ROLES.ASM,
      ROLES.SO,
      ROLES.RETAILER,
    ],
  },

  {
    id: "categories",
    label: "Categories",
    path: "/dashboard/categories",
    icon: Layers3,
    permission: PERMISSIONS.CATEGORY_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.SUPER_STOCKIST,
      ROLES.DISTRIBUTOR,
    ],
  },

  // ======================================================
  // INVENTORY
  // ======================================================

  {
    id: "inventory",
    label: "Inventory",
    path: "/dashboard/inventory",
    icon: Warehouse,
    permission: PERMISSIONS.INVENTORY_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.SUPER_STOCKIST,
    ],
  },

  // ======================================================
  // ORDERS
  // ======================================================

  {
    id: "orders",
    label: "Orders",
    path: "/dashboard/orders",
    icon: ShoppingCart,
    permission: PERMISSIONS.ORDER_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.SUPER_STOCKIST,
      ROLES.DISTRIBUTOR,
      ROLES.WHOLESALER,
      ROLES.ASM,
      ROLES.SO,
      ROLES.RETAILER,
    ],
  },

  // ======================================================
  // CUSTOMERS
  // ======================================================

  {
    id: "customers",
    label: "Customers",
    path: "/dashboard/customers",
    icon: Users,
    permission: PERMISSIONS.CUSTOMER_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.SUPER_STOCKIST,
      ROLES.DISTRIBUTOR,
      ROLES.WHOLESALER,
      ROLES.ASM,
      ROLES.SO,
    ],
  },

  // ======================================================
  // DISTRIBUTORS
  // ======================================================

  {
    id: "distributors",
    label: "Distributors",
    path: "/dashboard/distributors",
    icon: Truck,
    permission: PERMISSIONS.CUSTOMER_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },

  // ======================================================
  // WHOLESALERS
  // ======================================================

  {
    id: "wholesalers",
    label: "Wholesalers",
    path: "/dashboard/wholesalers",
    icon: Building2,
    permission: PERMISSIONS.CUSTOMER_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },

  // ======================================================
  // USERS
  // ======================================================

  {
    id: "users",
    label: "Users",
    path: "/dashboard/users",
    icon: Shield,
    permission: PERMISSIONS.USER_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },

  // ======================================================
  // REPORTS
  // ======================================================

  {
    id: "reports",
    label: "Reports",
    path: "/dashboard/reports",
    icon: FileText,
    permission: PERMISSIONS.REPORT_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.SUPER_STOCKIST,
      ROLES.ASM,
    ],
  },

  // ======================================================
  // ANALYTICS
  // ======================================================

  {
    id: "analytics",
    label: "Analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
    permission: PERMISSIONS.ANALYTICS_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.ASM,
    ],
  },

  // ======================================================
  // STOCK
  // ======================================================

  {
    id: "stock",
    label: "Stock Movement",
    path: "/dashboard/stock",
    icon: Boxes,
    permission: PERMISSIONS.INVENTORY_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
      ROLES.SUPER_STOCKIST,
    ],
  },

  // ======================================================
  // SETTINGS
  // ======================================================

  {
    id: "settings",
    label: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
    permission: PERMISSIONS.SETTINGS_VIEW,
    roles: [
      ROLES.SUPER_ADMIN,
      ROLES.ADMIN,
    ],
  },
];

// ======================================================
// HELPERS
// ======================================================

export const getSidebarByRole = (role) => {
  return sidebarConfig.filter((item) =>
    item.roles.includes(role)
  );
};

export const getSidebarByPermission = (permissions = []) => {
  return sidebarConfig.filter((item) =>
    permissions.includes(item.permission)
  );
};

export default sidebarConfig;