import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const PrivateRoute = ({ children, requiredRoleID }) => {
  const { user } = useUser();

  // Debug user state
  console.log("PrivateRoute: User Context", user);

  // Handle cases where user data isn't loaded yet
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to login if not logged in
  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  // Render the protected route
  return children;
};

export default PrivateRoute;
