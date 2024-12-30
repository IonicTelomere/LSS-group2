import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./components/auth/UserContext";
import PrivateRoute from "./components/auth/PrivateRoute"; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SiteFooter from './components/common/SiteFooter';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import AdminPage from './components/home/AdminPage';
import LecturerNotification from './components/home/LecturerNotification';
import ManagerPage from './components/home/ManagerPage';
import ManagerSummary from './components/common/ManagerSummary';
import LecturerProfile from "./components/home/LecturerProfile";
import ManagerSchedule from "./components/home/ManagerSchedule";
import EditLecturer from "./components/auth/EditInfo";
import EditInfo from "./components/auth/EditInfo";


function App() {
  const { user } = useUser();

  return (
    <UserProvider>  {/* Wrap the entire app with UserProvider */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/manager" element={<ManagerPage/>} />
          <Route path="/lecturerprofile" element={<LecturerProfile />} />
          <Route path="/managersummary" element={<ManagerSummary />} />
          <Route path="/lecturernotification" element={<LecturerNotification />} />
          <Route path="/managerschedule" element={<ManagerSchedule />} />
          <Route path="/editlecturer" element={<EditInfo />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRoleID={10}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <PrivateRoute requiredRoleID={20}>
                <ManagerPage />
              </PrivateRoute>
              
            }
          />
            <Route
            path="/managersummary"
            element={
              <PrivateRoute requiredRoleID={20}>
                <ManagerSummary />
              </PrivateRoute>
              
            }
          />
          <Route
            path="/lecturerprofile"
            element={
              <PrivateRoute requiredRoleID={30}>
                <LecturerProfile />
              </PrivateRoute>
            }
          />
             <Route
            path="/lecturernotification"
            element={
              <PrivateRoute requiredRoleID={30}>
                <LecturerNotification />
              </PrivateRoute>
            }
          />

          <Route
            path="/managerschedule"
            element={
              <PrivateRoute requiredRoleID={20}>
                <ManagerSchedule />
              </PrivateRoute>
              
            }
          />

          <Route
            path="/editlecturer"
            element={
              <PrivateRoute requiredRoleID={20}>
                <EditInfo />
              </PrivateRoute>
              
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <SiteFooter />
    </UserProvider>
  );
}


export default App;
