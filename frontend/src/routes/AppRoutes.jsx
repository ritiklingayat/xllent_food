import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/features/auth/Login";
import DashboardRoutes from "./dashboardRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard/*" element={<DashboardRoutes />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
