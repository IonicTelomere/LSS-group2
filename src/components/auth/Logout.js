import React from "react";
import { useNavigate } from "react-router-dom";
import '../style/style.css';

function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        navigate("/login", { replace: true });
    };
    return <button onClick={handleLogout} style={{
        padding: '10px',
        borderRadius: '5px',
        color: 'black',
        textDecoration: 'none',
        backgroundColor: 'white',
        marginBottom: '10px',
    }}>Logout</button>;
}
export default LogoutButton;

