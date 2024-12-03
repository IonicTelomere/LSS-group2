import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Assuming you have a UserContext managing user state

const UserSessionTimeout = ({ timeoutDuration = 1800000 }) => { // Default: 10 minutes
  const [isIdle, setIsIdle] = useState(false);
  const navigate = useNavigate();
  const { logoutUser } = useUser(); // Use the logout function from your UserContext

  let timeoutId;

  const resetTimeout = () => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setIsIdle(true);
    }, timeoutDuration);
  };

  const handleUserActivity = () => {
    setIsIdle(false); // Reset idle state
    resetTimeout(); // Reset the timer
  };

  useEffect(() => {
    // Set up event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    // Initialize the timeout
    resetTimeout();

    return () => {
      // Clean up event listeners and timeout on unmount
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (isIdle) {
      // Take action on idle
      alert("Session timed out due to inactivity. You will be logged out.");
      logoutUser(); // Clear user session
      navigate("/login"); // Redirect to login
    }
  }, [isIdle, logoutUser, navigate]);

  return null; // This component doesn't render anything
};

export default UserSessionTimeout;
