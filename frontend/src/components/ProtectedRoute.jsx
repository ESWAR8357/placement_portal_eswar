import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";
import Loader from "./Loader.jsx";

const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return <Loader label="Checking session" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles?.length && !roles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
