import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./components/auth/UserContext";
import PrivateRoute from "./components/auth/PrivateRoute"; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SiteNav from './components/common/SiteNav';
import SiteFooter from './components/common/SiteFooter';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import AdminPage from './components/home/AdminPage';
import LecturerPage from './components/home/LecturerPage';
import ManagerPage from './components/home/ManagerPage';
import ManagerSummary from './components/common/ManagerSummary';
import DataBase from './components/home/DataBase';

function App() {
  const { user } = useUser();

  return (
    <UserProvider>  {/* Wrap the entire app with UserProvider */}
      <SiteNav />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/manager" element={<ManagerPage/>} />
          <Route path="/lecturer" element={<LecturerPage/>} />
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
            path="/lecturer"
            element={
              <PrivateRoute requiredRoleID={30}>
                <LecturerPage />
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
