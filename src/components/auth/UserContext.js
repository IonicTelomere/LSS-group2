import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    roleID: null, // RoleID: 10 for Admin, 20 for Manager, 30 for Lecturer
    email: '',
    // Other user data if needed
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser); // Set user from localStorage
    }
  }, []);

  const loginUser = (userData) => {
    setUser({
      ...userData,
      isLoggedIn: true,
    });
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
    localStorage.setItem("authToken"); // Example token
  };

  const logoutUser = () => {
    setUser({
      isLoggedIn: false,
      roleID: null,
      email: '',
    });
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
