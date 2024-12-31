import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    // Hook to programmatically navigate to different routes
    const navigate = useNavigate();

    // Function to handle user logout
    const handleLogout = () => {
        // Remove authentication details from local storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        
        // Navigate to the login page
        navigate("/login", { replace: true });
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                padding: '10px',
                borderRadius: '5px',
                color: 'black',
                textDecoration: 'none',
                backgroundColor: 'white',
                marginBottom: '10px',
            }}
        >
            Logout
        </button>
    );
}

export default LogoutButton;
