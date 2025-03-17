// import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }: { children: JSX.Element, roles: string[] }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated || isAuthenticated === "false" || !roles.includes(userRole!)) {
    return <Navigate to="/Login" />;
  }

  return children;
};

export default ProtectedRoute;