/**
 * =============================================================================
 * Permission Constants
 * =============================================================================
 *
 * Action-based RBAC Permissions
 *
 * Naming Convention:
 * resource:action
 *
 * Examples:
 * products:view
 * products:create
 * users:update
 * orders:approve
 *
 * =============================================================================
 */

export const PERMISSIONS = Object.freeze({
  /*
  |--------------------------------------------------------------------------
  | Dashboard
  |--------------------------------------------------------------------------
  */

  DASHBOARD_VIEW: "dashboard:view",

  /*
  |--------------------------------------------------------------------------
  | Users
  |--------------------------------------------------------------------------
  */

  USERS_VIEW: "users:view",
  USERS_CREATE: "users:create",
  USERS_UPDATE: "users:update",
  USERS_DELETE: "users:delete",

  /*
  |--------------------------------------------------------------------------
  | Roles
  |--------------------------------------------------------------------------
  */

  ROLES_VIEW: "roles:view",
  ROLES_CREATE: "roles:create",
  ROLES_UPDATE: "roles:update",
  ROLES_DELETE: "roles:delete",

  /*
  |--------------------------------------------------------------------------
  | Permissions
  |--------------------------------------------------------------------------
  */

  PERMISSIONS_VIEW: "permissions:view",
  PERMISSIONS_ASSIGN: "permissions:assign",

  /*
  |--------------------------------------------------------------------------
  | Categories
  |--------------------------------------------------------------------------
  */

  CATEGORIES_VIEW: "categories:view",
  CATEGORIES_CREATE: "categories:create",
  CATEGORIES_UPDATE: "categories:update",
  CATEGORIES_DELETE: "categories:delete",

  /*
  |--------------------------------------------------------------------------
  | Products
  |--------------------------------------------------------------------------
  */

  PRODUCTS_VIEW: "products:view",
  PRODUCTS_CREATE: "products:create",
  PRODUCTS_UPDATE: "products:update",
  PRODUCTS_DELETE: "products:delete",

  /*
  |--------------------------------------------------------------------------
  | Inventory
  |--------------------------------------------------------------------------
  */

  INVENTORY_VIEW: "inventory:view",
  INVENTORY_CREATE: "inventory:create",
  INVENTORY_UPDATE: "inventory:update",
  INVENTORY_DELETE: "inventory:delete",
  INVENTORY_TRANSFER: "inventory:transfer",
  INVENTORY_ADJUST: "inventory:adjust",

  /*
  |--------------------------------------------------------------------------
  | Orders
  |--------------------------------------------------------------------------
  */

  ORDERS_VIEW: "orders:view",
  ORDERS_CREATE: "orders:create",
  ORDERS_UPDATE: "orders:update",
  ORDERS_DELETE: "orders:delete",
  ORDERS_APPROVE: "orders:approve",
  ORDERS_REJECT: "orders:reject",
  ORDERS_DISPATCH: "orders:dispatch",

  /*
  |--------------------------------------------------------------------------
  | Reports
  |--------------------------------------------------------------------------
  */

  REPORTS_VIEW: "reports:view",
  REPORTS_EXPORT: "reports:export",

  /*
  |--------------------------------------------------------------------------
  | Notifications
  |--------------------------------------------------------------------------
  */

  NOTIFICATIONS_VIEW: "notifications:view",
  NOTIFICATIONS_SEND: "notifications:send",

  /*
  |--------------------------------------------------------------------------
  | Settings
  |--------------------------------------------------------------------------
  */

  SETTINGS_VIEW: "settings:view",
  SETTINGS_UPDATE: "settings:update",

  /*
  |--------------------------------------------------------------------------
  | Profile
  |--------------------------------------------------------------------------
  */

  PROFILE_VIEW: "profile:view",
  PROFILE_UPDATE: "profile:update"
});

/**
 * =============================================================================
 * Permission Groups
 * =============================================================================
 */

export const PERMISSION_GROUPS = Object.freeze({
  DASHBOARD: [
    PERMISSIONS.DASHBOARD_VIEW
  ],

  USERS: [
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.USERS_CREATE,
    PERMISSIONS.USERS_UPDATE,
    PERMISSIONS.USERS_DELETE
  ],

  CATEGORIES: [
    PERMISSIONS.CATEGORIES_VIEW,
    PERMISSIONS.CATEGORIES_CREATE,
    PERMISSIONS.CATEGORIES_UPDATE,
    PERMISSIONS.CATEGORIES_DELETE
  ],

  PRODUCTS: [
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.PRODUCTS_CREATE,
    PERMISSIONS.PRODUCTS_UPDATE,
    PERMISSIONS.PRODUCTS_DELETE
  ],

  INVENTORY: [
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.INVENTORY_CREATE,
    PERMISSIONS.INVENTORY_UPDATE,
    PERMISSIONS.INVENTORY_DELETE,
    PERMISSIONS.INVENTORY_TRANSFER,
    PERMISSIONS.INVENTORY_ADJUST
  ],

  ORDERS: [
    PERMISSIONS.ORDERS_VIEW,
    PERMISSIONS.ORDERS_CREATE,
    PERMISSIONS.ORDERS_UPDATE,
    PERMISSIONS.ORDERS_DELETE,
    PERMISSIONS.ORDERS_APPROVE,
    PERMISSIONS.ORDERS_REJECT,
    PERMISSIONS.ORDERS_DISPATCH
  ],

  REPORTS: [
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT
  ],

  NOTIFICATIONS: [
    PERMISSIONS.NOTIFICATIONS_VIEW,
    PERMISSIONS.NOTIFICATIONS_SEND
  ],

  SETTINGS: [
    PERMISSIONS.SETTINGS_VIEW,
    PERMISSIONS.SETTINGS_UPDATE
  ],

  PROFILE: [
    PERMISSIONS.PROFILE_VIEW,
    PERMISSIONS.PROFILE_UPDATE
  ]
});

/**
 * Check if a permission is valid.
 *
 * @param {string} permission
 * @returns {boolean}
 */
export const isValidPermission = (permission) => {
  return Object.values(PERMISSIONS).includes(permission);
};

/**
 * Check if a user has a specific permission.
 *
 * @param {string[]} userPermissions
 * @param {string} permission
 * @returns {boolean}
 */
export const hasPermission = (userPermissions = [], permission) => {
  return userPermissions.includes(permission);
};

/**
 * Check if a user has all required permissions.
 *
 * @param {string[]} userPermissions
 * @param {string[]} requiredPermissions
 * @returns {boolean}
 */
export const hasAllPermissions = (
  userPermissions = [],
  requiredPermissions = []
) => {
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );
};

/**
 * Check if a user has at least one required permission.
 *
 * @param {string[]} userPermissions
 * @param {string[]} requiredPermissions
 * @returns {boolean}
 */
export const hasAnyPermission = (
  userPermissions = [],
  requiredPermissions = []
) => {
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};