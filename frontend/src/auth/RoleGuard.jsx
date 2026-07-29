import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

import useAuth from "@/auth/useAuth";

export default function RoleGuard({
  children,
  roles = [],
  redirectTo = "/dashboard",
}) {
  const { loading, role, isAuthenticated } = useAuth();

  const location = useLocation();

  // ======================================================
  // AUTH LOADING
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
  // NO ROLE RESTRICTION
  // ======================================================

  if (!roles.length) {
    return children;
  }

  // ======================================================
  // ROLE CHECK
  // ======================================================

  const allowed = roles.includes(role);

  if (!allowed) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-slate-100">
        <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200 p-10 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <ShieldAlert
              size={42}
              className="text-red-600"
            />
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-slate-900">
            Access Denied
          </h1>

          <p className="mt-4 text-slate-500">
            You don't have permission to access this page.
          </p>

          <div className="mt-8 rounded-2xl bg-slate-100 p-5 text-left">

            <div className="flex justify-between">
              <span className="font-semibold text-slate-500">
                Current Role
              </span>

              <span className="font-bold text-red-600">
                {role || "Unknown"}
              </span>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="font-semibold text-slate-500">
                Required
              </span>

              <span className="font-bold text-slate-800">
                {roles.join(", ")}
              </span>
            </div>

          </div>

          <div className="mt-8 flex justify-center gap-4">

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 transition"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

            <button
              onClick={() => (window.location.href = redirectTo)}
              className="rounded-xl bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition"
            >
              Dashboard
            </button>

          </div>

        </div>
      </div>
    );
  }

  // ======================================================
  // AUTHORIZED
  // ======================================================

  return children;
}