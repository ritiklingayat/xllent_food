import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";


const PublicRoute = ({ children }) => {

  const { user, loading } = useAuth();


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }


  if (user) {
    return <Navigate to="/dashboard" replace />;
  }


  return children;
};


export default PublicRoute;