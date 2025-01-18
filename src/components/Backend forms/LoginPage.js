import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import logo from "../Img/LSS.png";

function LoginPage() {
    // State hooks for managing user inputs and feedback messages
    const [email, setEmail] = useState(""); // Stores the email entered by the user
    const [password, setPassword] = useState(""); // Stores the password entered by the user
    const [error, setError] = useState(""); // Stores error messages
    const [success, setSuccess] = useState(""); // Stores success messages

    const navigate = useNavigate(); // Hook to programmatically navigate between routes

    // Function to handle the login process
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Send a POST request to the backend API with email and password
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }), // Payload for the request
            });

            if (!response.ok) {
                // Handle non-200 responses from the server
                const errorText = await response.text();
                setError(errorText || "Login failed. Please try again.");
                return;
            }

            const data = await response.json(); // Parse the JSON response
            // Save authentication details in localStorage
            localStorage.setItem("authToken", data.token); // Token for future authenticated requests
            localStorage.setItem("userRole", data.role); // User role for authorization
            localStorage.setItem("userID", data.userID); // Store userID for reference
            console.log("Login response:", data);

            if (!data.RoleID) {
                // Ensure the response includes a valid RoleID
                setError("Invalid server response: Missing RoleID.");
                return;
            }

            setSuccess("Login successful!"); // Display success message
            setTimeout(() => {
                // Redirect the user to their respective dashboard based on RoleID
                if (data.RoleID === 10) navigate("/admin", { replace: true });
                else if (data.RoleID === 20) navigate("/manager", { replace: true });
                else if (data.RoleID === 30)
                    navigate("/lecturerprofile", { replace: true });
                else navigate("/login"); // Fallback to login page if RoleID is unrecognized
            }, 1000);
        } catch (err) {
            // Handle unexpected errors
            console.error("Login error:", err);
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-start vh-100" // Center content vertically and horizontally
            style={{
                backgroundColor: "#EBF2FA", // Light background color
                minHeight: "100vh", // Ensure full screen height
                paddingTop: "15vh", // Adjust top padding for positioning
            }}
        >
            <Row
                className="px-4 my-5 shadow" // Styling for the login box
                style={{
                    borderRadius: "10px", // Rounded corners
                    backgroundColor: "#ffffff", // Light background for the form
                    padding: "30px", // Inner spacing
                    width: "100%",
                    maxWidth: "500px", // Limit box width
                }}
            >
                {/* Logo Section */}
                <div className="text-center mb-4">
                    <img
                        src={logo}
                        alt="LSS Logo" // Accessibility
                        style={{
                            width: "100%", // Responsive width
                            height: "auto",
                            borderRadius: "10px", // Rounded logo
                        }}
                    />
                </div>
                <Col>
                    {/* Title */}
                    <h3 className="text-center mb-4" style={{ color: "#064789" }}>
                        Login
                    </h3>

                    {/* Error and Success Messages */}
                    {error && (
                        <Alert variant="danger" style={{ fontSize: "0.9rem" }}>
                            {error} {/* Display error message */}
                        </Alert>
                    )}
                    {success && (
                        <Alert variant="success" style={{ fontSize: "0.9rem" }}>
                            {success} {/* Display success message */}
                        </Alert>
                    )}

                    {/* Login Form */}
                    <Form onSubmit={handleLogin}>
                        {/* Email Input */}
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label style={{ fontWeight: "bold", color: "#064789" }}>
                                Email address
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email" // Placeholder text
                                value={email} // Bind input to email state
                                onChange={(e) => setEmail(e.target.value)} // Update email state
                                required // Make field mandatory
                                style={{
                                    border: "1px solid #ced4da",
                                    borderRadius: "5px",
                                    padding: "10px",
                                }}
                            />
                        </Form.Group>

                        {/* Password Input */}
                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label style={{ fontWeight: "bold", color: "#064789" }}>
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password} // Bind input to password state
                                onChange={(e) => setPassword(e.target.value)} // Update password state
                                required
                                style={{
                                    border: "1px solid #ced4da",
                                    borderRadius: "5px",
                                    padding: "10px",
                                }}
                            />
                        </Form.Group>

                        {/* Submit Button */}
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100" // Full-width button
                            style={{
                                backgroundColor: "#427AA1", // Updated button color
                                borderColor: "#427AA1",
                                padding: "10px",
                                fontSize: "1rem",
                                fontWeight: "bold",
                            }}
                        >
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;