import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    roleID: null, // RoleID: 10 for Admin, 20 for Manager, 30 for Lecturer
    email: '',
    // Other user data if needed
  });

  const loginUser = (userData) => {
    setUser({
      ...userData,
      isLoggedIn: true,
    });
  };

  const logoutUser = () => {
    setUser({
      isLoggedIn: false,
      roleID: null,
      email: '',
    });
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
