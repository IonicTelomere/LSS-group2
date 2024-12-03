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
                setError(await response.text() || "Login Failed.");
                return;
            }
    
            const data = await response.json();
            setSuccess("Login successful!");
            console.log("User role:", data.RoleID); // Debug: Check RoleID
    
            // Redirect based on role
            if (data.RoleID === 10) {
                console.log("Navigating to /admin");
                navigate("/admin");
            } else if (data.RoleID === 20) {
                console.log("Navigating to /manager");
                navigate("/manager");
            } else if (data.RoleID === 30) {
                console.log("Navigating to /lecturer");
                navigate("/lecturer");
            } else {
                setError("Invalid role or data.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An error occurred. Please try again.");
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
