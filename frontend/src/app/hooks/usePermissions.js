/* ==========================================================
   Xllent Foods ERP
   Permission Hook
   ----------------------------------------------------------
   Central permission hook used throughout the application.
   Reads the logged-in user from AuthContext and exposes
   helper methods for permissions and roles.
========================================================== */

import { useMemo } from "react";

import { useAuth } from "@/auth/AuthProvider";

import ROLES, {
  isSuperAdmin,
  isAdmin,
  isSuperStockiest,
  isDistributor,
  isASM,
  isSO,
  isAdminRole,
  isManagementRole,
  isSalesRole,
  isDistributionRole,
  getRoleLabel,
  getRoleColor,
  getDashboardRoute,
} from "@/app/constants/roles";

import {
  getPermissions,
  hasPermission as checkPermission,
  hasAnyPermission as checkAnyPermission,
  hasAllPermissions as checkAllPermissions,
} from "@/app/constants/permissions";

/* ==========================================================
   Hook
========================================================== */

export default function usePermissions() {

  const { user } = useAuth();

  const role = user?.role ?? null;

  /* ========================================================
     Memoized Permission List
  ======================================================== */

  const permissions = useMemo(() => {

    if (!role) return [];

    return getPermissions(role);

  }, [role]);

  /* ========================================================
     Permission Helpers
  ======================================================== */

  const hasPermission = (permission) => {

    if (!role) return false;

    return checkPermission(role, permission);

  };

  const hasAnyPermission = (permissionList = []) => {

    if (!role) return false;

    return checkAnyPermission(
      role,
      permissionList
    );

  };

  const hasAllPermissions = (permissionList = []) => {

    if (!role) return false;

    return checkAllPermissions(
      role,
      permissionList
    );

  };

  /* ========================================================
     Role Helpers
  ======================================================== */

  const isSuperAdminUser = () =>
    isSuperAdmin(role);

  const isAdminUser = () =>
    isAdmin(role);

  const isSuperStockiestUser = () =>
    isSuperStockiest(role);

  const isDistributorUser = () =>
    isDistributor(role);

  const isASMUser = () =>
    isASM(role);

  const isSOUser = () =>
    isSO(role);

  const isAdminRoleUser = () =>
    isAdminRole(role);

  const isManagementRoleUser = () =>
    isManagementRole(role);

  const isSalesRoleUser = () =>
    isSalesRole(role);

  const isDistributionRoleUser = () =>
    isDistributionRole(role);

  /* ========================================================
     Metadata
  ======================================================== */

  const roleLabel = getRoleLabel(role);

  const roleColor = getRoleColor(role);

  const dashboardRoute =
    getDashboardRoute(role);

  /* ========================================================
     Return
  ======================================================== */

  return {

    /* User */

    user,

    role,

    permissions,

    /* Permission Methods */

    hasPermission,

    hasAnyPermission,

    hasAllPermissions,

    /* Role Methods */

    isSuperAdmin: isSuperAdminUser,

    isAdmin: isAdminUser,

    isSuperStockiest:
      isSuperStockiestUser,

    isDistributor:
      isDistributorUser,

    isASM: isASMUser,

    isSO: isSOUser,

    isAdminRole:
      isAdminRoleUser,

    isManagementRole:
      isManagementRoleUser,

    isSalesRole:
      isSalesRoleUser,

    isDistributionRole:
      isDistributionRoleUser,

    /* Metadata */

    roleLabel,

    roleColor,

    dashboardRoute,

    /* Direct Constants */

    ROLES,

  };

}