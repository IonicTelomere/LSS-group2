import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const PrivateRoute = ({ children, requiredRoleID }) => {
  const authToken = localStorage.getItem("authToken");
  const { user } = useUser();

  // Debug user state
  console.log("PrivateRoute: User Context", user);

  // Handle cases where user data isn't loaded yet
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to login if not logged in
  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (user !== requiredRoleID) {
    return <Navigate to="/login" replace />;
  }
  // Render the protected route
  return children;
};

export default PrivateRoute;
