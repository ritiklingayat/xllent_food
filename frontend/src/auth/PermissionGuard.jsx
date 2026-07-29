import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LockKeyhole, ArrowLeft } from "lucide-react";

import useAuth from "@/auth/useAuth";

export default function PermissionGuard({
  children,
  permissions = [],
  requireAll = false,
  redirectTo = "/dashboard",
}) {
  const {
    loading,
    isAuthenticated,
    user,
  } = useAuth();

  const location = useLocation();

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
      </div>
    );
  }

  // ======================================================
  // NOT LOGGED IN
  // ======================================================

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // ======================================================
  // NO PERMISSION REQUIRED
  // ======================================================

  if (!permissions.length) {
    return children;
  }

  const userPermissions = user?.permissions || [];

  const allowed = requireAll
    ? permissions.every((permission) =>
        userPermissions.includes(permission)
      )
    : permissions.some((permission) =>
        userPermissions.includes(permission)
      );

  // ======================================================
  // ACCESS DENIED
  // ======================================================

  if (!allowed) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-2xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <LockKeyhole
              size={42}
              className="text-orange-600"
            />
          </div>

          <h1 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            Permission Required
          </h1>

          <p className="mt-4 text-center text-slate-500">
            Your account doesn't have permission to access this feature.
          </p>

          <div className="mt-8 rounded-2xl bg-slate-100 p-5">

            <h3 className="mb-3 font-bold text-slate-800">
              Required Permission
            </h3>

            <div className="flex flex-wrap gap-2">
              {permissions.map((permission) => (
                <span
                  key={permission}
                  className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700"
                >
                  {permission}
                </span>
              ))}
            </div>

          </div>

          <div className="mt-6 rounded-2xl bg-slate-100 p-5">

            <h3 className="mb-3 font-bold text-slate-800">
              Your Permissions
            </h3>

            {userPermissions.length ? (
              <div className="flex flex-wrap gap-2">
                {userPermissions.map((permission) => (
                  <span
                    key={permission}
                    className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No permissions assigned.
              </p>
            )}

          </div>

          <div className="mt-8 flex justify-center gap-4">

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

            <button
              onClick={() => (window.location.href = redirectTo)}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Dashboard
            </button>

          </div>

        </div>
      </div>
    );
  }

  // ======================================================
  // ALLOWED
  // ======================================================

  return children;
}