import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/features/auth/Login";
import DashboardRoutes from "./dashboardRoutes";
import LandingPage from "@/landing-page/LandingPage";
import PublicProducts from "@/landing-page/PublicProducts";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route path="/catalogue" element={<PublicProducts />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard/*" element={<DashboardRoutes />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
