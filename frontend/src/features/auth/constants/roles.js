/**
 * =============================================================================
 * Roles
 * =============================================================================
 * Centralized Role Management
 *
 * Responsibilities:
 * - System role constants
 * - Role hierarchy
 * - Dashboard routes
 * - Display names
 * - Helper methods
 * =============================================================================
 */

/**
 * System Roles
 */
export const ROLES = Object.freeze({
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SUPER_STOCKIST: "SUPER_STOCKIST",
  DISTRIBUTOR: "DISTRIBUTOR",
  WHOLESALER: "WHOLESALER",
  RETAILER: "RETAILER",
  CUSTOMER: "CUSTOMER",
  GUEST: "GUEST"
});

/**
 * Display Names
 */
export const ROLE_LABELS = Object.freeze({
  [ROLES.SUPER_ADMIN]: "Super Admin",
  [ROLES.ADMIN]: "Admin",
  [ROLES.SUPER_STOCKIST]: "Super Stockist",
  [ROLES.DISTRIBUTOR]: "Distributor",
  [ROLES.WHOLESALER]: "Wholesaler",
  [ROLES.RETAILER]: "Retailer",
  [ROLES.CUSTOMER]: "Customer",
  [ROLES.GUEST]: "Guest"
});

/**
 * Role Hierarchy
 *
 * Higher number = Higher privilege
 */
export const ROLE_LEVELS = Object.freeze({
  [ROLES.GUEST]: 0,
  [ROLES.CUSTOMER]: 1,
  [ROLES.RETAILER]: 2,
  [ROLES.WHOLESALER]: 3,
  [ROLES.DISTRIBUTOR]: 4,
  [ROLES.SUPER_STOCKIST]: 5,
  [ROLES.ADMIN]: 6,
  [ROLES.SUPER_ADMIN]: 7
});

/**
 * Dashboard Landing Pages
 */
export const ROLE_HOME = Object.freeze({
  [ROLES.SUPER_ADMIN]: "/dashboard",
  [ROLES.ADMIN]: "/dashboard",
  [ROLES.SUPER_STOCKIST]: "/dashboard",
  [ROLES.DISTRIBUTOR]: "/dashboard",
  [ROLES.WHOLESALER]: "/dashboard",
  [ROLES.RETAILER]: "/dashboard",
  [ROLES.CUSTOMER]: "/",
  [ROLES.GUEST]: "/"
});

/**
 * Roles that can access the Admin Portal
 */
export const ADMIN_ROLES = Object.freeze([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN
]);

/**
 * Distribution Network Roles
 */
export const DISTRIBUTION_ROLES = Object.freeze([
  ROLES.SUPER_STOCKIST,
  ROLES.DISTRIBUTOR,
  ROLES.WHOLESALER,
  ROLES.RETAILER
]);

/**
 * Check if role exists
 *
 * @param {string} role
 * @returns {boolean}
 */
export const isValidRole = (role) => {
  return Object.values(ROLES).includes(role);
};

/**
 * Get readable role name
 *
 * @param {string} role
 * @returns {string}
 */
export const getRoleLabel = (role) => {
  return ROLE_LABELS[role] ?? "Unknown";
};

/**
 * Get role level
 *
 * @param {string} role
 * @returns {number}
 */
export const getRoleLevel = (role) => {
  return ROLE_LEVELS[role] ?? 0;
};

/**
 * Compare hierarchy
 *
 * Example:
 * canManage(SUPER_ADMIN, ADMIN) => true
 * canManage(DISTRIBUTOR, ADMIN) => false
 *
 * @param {string} currentRole
 * @param {string} targetRole
 * @returns {boolean}
 */
export const canManage = (currentRole, targetRole) => {
  return getRoleLevel(currentRole) > getRoleLevel(targetRole);
};

/**
 * Check if role belongs to Admin Portal
 *
 * @param {string} role
 * @returns {boolean}
 */
export const isAdminRole = (role) => {
  return ADMIN_ROLES.includes(role);
};

/**
 * Check if role belongs to Distribution Network
 *
 * @param {string} role
 * @returns {boolean}
 */
export const isDistributionRole = (role) => {
  return DISTRIBUTION_ROLES.includes(role);
};