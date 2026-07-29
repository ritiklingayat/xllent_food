import React from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  useAuth,
} from "@/auth/AuthProvider";

/* ==========================================
   Loading Screen
========================================== */

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">

        <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />

        <h2 className="mt-6 text-xl font-bold text-slate-800">
          Loading...
        </h2>

        <p className="mt-2 text-slate-500">
          Please wait while we verify your session.
        </p>

      </div>
    </div>
  );
}

/* ==========================================
   Unauthorized Screen
========================================== */

function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">

        <div className="w-20 h-20 rounded-full bg-red-100 mx-auto flex items-center justify-center">

          <span className="text-4xl">
            🚫
          </span>

        </div>

        <h1 className="text-3xl font-black mt-6">

          Access Denied

        </h1>

        <p className="mt-3 text-slate-500">

          You don't have permission to access this page.

        </p>

      </div>

    </div>
  );
}

/* ==========================================
   Protected Route
========================================== */

export default function ProtectedRoute({

  children,

  roles = [],

}) {

  const {

    user,

    loading,

    isAuthenticated,

  } = useAuth();

  const location = useLocation();

  /* ---------- Loading ---------- */

  if (loading) {
    return <LoadingScreen />;
  }

  /* ---------- Not Logged In ---------- */

  if (!isAuthenticated || !user) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );

  }

  /* ---------- Inactive User ---------- */

  if (
    user.status &&
    user.status !== "Active"
  ) {
    return <Unauthorized />;
  }

  /* ---------- Role Validation ---------- */

  if (
    roles.length > 0 &&
    !roles.includes(user.role)
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }

  /* ---------- Success ---------- */

  return children;

}