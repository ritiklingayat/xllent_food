import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ShieldCheck, Loader2 } from "lucide-react";

import useAuth from "@/auth/useAuth";

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}) {
  const { loading, isAuthenticated } = useAuth();

  const location = useLocation();

  // ======================================================
  // AUTH LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl">
            <ShieldCheck className="text-white" size={40} />
          </div>

          <Loader2
            size={34}
            className="mx-auto animate-spin text-orange-500"
          />

          <h2 className="mt-5 text-xl font-bold text-white">
            Restoring Session...
          </h2>

          <p className="mt-2 text-slate-400">
            Please wait while we verify your account.
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // NOT LOGGED IN
  // ======================================================

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // ======================================================
  // AUTHORIZED
  // ======================================================

  if (children) {
    return children;
  }

  return <Outlet />;
}