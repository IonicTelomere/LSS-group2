import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const PrivateRoute = ({ children, requiredRoleID }) => {
  const { user } = useUser();

  // If user is not logged in, redirect to login page
  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Match the required role ID
  if (user.roleID === requiredRoleID) {
    return children; // Render children (admin, manager, or lecturer page)
  }

  // Redirect to home if no matching role
  return <Navigate to="/login" />;
};

export default PrivateRoute;
