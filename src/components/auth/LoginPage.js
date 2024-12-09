import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText || "Login failed. Please try again.");
                return;
            }
    
            const data = await response.json();
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userRole", data.role);
            localStorage.setItem("userID", data.userID); // Store userID
            console.log("Login response:", data);
             
    
    
            if (!data.RoleID) {
                setError("Invalid server response: Missing RoleID.");
                return;
            }
    
            setSuccess("Login successful!");
            setTimeout(() => {
                if (data.RoleID === 10) navigate("/admin", {replace: true});
                else if (data.RoleID === 20) navigate("/manager", {replace: true});
                else if (data.RoleID === 30) navigate("/lecturerprofile", {replace: true});
                else navigate("/login");
            }, 1000);
        } catch (err) {
            console.error("Login error:", err);
            setError("An unexpected error occurred. Please try again later.");
        }
    };
    return (
        <Container
            className="d-flex justify-content-center align-items-start vh-100"
            style={{
                backgroundColor: "#f8f9fa",
                minHeight: "100vh",
                paddingTop: "15vh", // Adjust this value for even higher positioning
            }}
        >
            <Row
                className="px-4 my-5 shadow"
                style={{
                    borderRadius: "10px",
                    backgroundColor: "#333333",
                    padding: "30px",
                    width: "100%",
                    maxWidth: "500px",
                }}
            >
                <Col>
                    <h3 className="text-center mb-4" style={{ color: "#3399ff" }}>
                        Login
                    </h3>
                    {error && (
                        <Alert variant="danger" style={{ fontSize: "0.9rem" }}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert variant="success" style={{ fontSize: "0.9rem" }}>
                            {success}
                        </Alert>
                    )}

                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label style={{ fontWeight: "bold", color: "#3399ff" }}>
                                Email address
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    border: "1px solid #ced4da",
                                    borderRadius: "5px",
                                    padding: "10px",
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label style={{ fontWeight: "bold", color: "#3399ff" }}>
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    border: "1px solid #ced4da",
                                    borderRadius: "5px",
                                    padding: "10px",
                                }}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            style={{
                                backgroundColor: "#007bff",
                                borderColor: "#007bff",
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
