import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Importing routing components for navigation
import { UserProvider, useUser } from "./components/auth/UserContext"; // Importing user context to manage user data
import PrivateRoute from "./components/auth/PrivateRoute"; // Importing a custom route component to protect private routes
import "./App.css"; // Importing custom styles
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS for styling

// Importing the components used in the app
import SiteFooter from "./components/common/SiteFooter";
import LoginPage from "./components/Backend forms/LoginPage";
import RegisterPage from "./components/Backend forms/RegisterPage";
import AdminPage from "./components/Administrator pages/AdminPage";
import LecturerNotification from "./components/Lecturer pages/LecturerNotification";
import ManagerPage from "./components/Manager pages/ManagerPage";
import ManagerSummary from "./components/Manager pages/ManagerSummary";
import LecturerProfile from "./components/Lecturer pages/LecturerProfile";
import ManagerSchedule from "./components/Manager pages/ManagerSchedule";
import EditInfo from "./components/Backend forms/EditInfo";

function App() {
  const { user } = useUser(); // Accessing user information from context

  return (
    <UserProvider>
      {/* Wrapping the entire app in the UserProvider to make user data available throughout the app */}
      <Routes>
        {/* Define all routes in the app */}
        <Route path="/" element={<LoginPage />} />{" "}
        {/* Route for the login page */}
        <Route path="/register" element={<RegisterPage />} />{" "}
        {/* Route for the registration page */}
        <Route path="/admin" element={<AdminPage />} />{" "}
        {/* Route for the admin page */}
        <Route path="/manager" element={<ManagerPage />} />{" "}
        {/* Route for the manager page */}
        <Route path="/lecturerprofile" element={<LecturerProfile />} />{" "}
        {/* Route for the lecturer profile page */}
        <Route path="/managersummary" element={<ManagerSummary />} />{" "}
        {/* Route for the manager summary page */}
        <Route
          path="/lecturernotification"
          element={<LecturerNotification />}
        />{" "}
        {/* Route for lecturer notifications */}
        <Route path="/managerschedule" element={<ManagerSchedule />} />{" "}
        {/* Route for the manager schedule page */}
        <Route path="/editlecturer" element={<EditInfo />} />{" "}
        {/* Route for editing lecturer information */}
        {/* Protected routes using PrivateRoute component for role-based access */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRoleID={10}>
              <AdminPage />
            </PrivateRoute>
          }
        />{" "}
        {/* Admin route, only accessible by users with role ID 10 */}
        <Route
          path="/manager"
          element={
            <PrivateRoute requiredRoleID={20}>
              <ManagerPage />
            </PrivateRoute>
          }
        />{" "}
        {/* Manager route, only accessible by users with role ID 20 */}
        <Route
          path="/managersummary"
          element={
            <PrivateRoute requiredRoleID={20}>
              <ManagerSummary />
            </PrivateRoute>
          }
        />{" "}
        {/* Manager Summary route, only accessible by users with role ID 20 */}
        <Route
          path="/lecturerprofile"
          element={
            <PrivateRoute requiredRoleID={30}>
              <LecturerProfile />
            </PrivateRoute>
          }
        />{" "}
        {/* Lecturer Profile route, only accessible by users with role ID 30 */}
        <Route
          path="/lecturernotification"
          element={
            <PrivateRoute requiredRoleID={30}>
              <LecturerNotification />
            </PrivateRoute>
          }
        />{" "}
        {/* Lecturer Notification route, only accessible by users with role ID 30 */}
        <Route
          path="/managerschedule"
          element={
            <PrivateRoute requiredRoleID={20}>
              <ManagerSchedule />
            </PrivateRoute>
          }
        />{" "}
        {/* Manager Schedule route, only accessible by users with role ID 20 */}
        <Route
          path="/editlecturer"
          element={
            <PrivateRoute requiredRoleID={20}>
              <EditInfo />
            </PrivateRoute>
          }
        />{" "}
        {/* Edit Lecturer route, only accessible by users with role ID 20 */}
        <Route path="*" element={<Navigate to="/" />} />{" "}
        {/* Catch-all route for unknown paths, redirects to login page */}
      </Routes>
      <SiteFooter /> {/* Footer component for the site */}
    </UserProvider>
  );
}

export default App; // Exporting the App component to be used elsewhere
