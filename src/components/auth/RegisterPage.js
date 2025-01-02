import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Axios for handling HTTP requests
import Nav from 'react-bootstrap/Nav'; // Bootstrap navigation component
import LogoutButton from '../auth/Logout'; // Custom logout button component
import logo from '../Img/LSS.png'; // Import the logo

function RegisterPage() {
    // State variables to capture form inputs and manage errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [preference, setPreference] = useState('');
    const [preference1, setPreference1] = useState('');
    const [preference2, setPreference2] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('');
    const [workload, setWorkload] = useState(''); // To capture selected workload

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match before submitting
        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        try {
            // Send form data to the backend
            const response = await axios.post('/api/register', {
                firstName,
                lastName,
                role,
                preference,
                preference1,
                preference2,
                workload,
                email,
                password,
            });

            // Notify user of successful registration
            alert('Registration successful!');
        } catch (err) {
            // Set error message returned from backend
            setError(err.response.data.message || 'Something went wrong');
        }
    };

    // List of subjects for lecturer preferences
    const allSubjects = [
        "Application Development in the Cloud",
        "Architecting on the Cloud",
        "Big Data Management on the Cloud (Elective)",
        "Big Data on the Cloud",
        "Cloud Foundations",
        "Database Fundamentals on the Cloud",
        "Managing Projects in the Cloud",
        "Private Cloud Solutions",
        "System Operations on the Cloud",
        "Virtualisation for the Cloud",
        "Intermediate Object Oriented Programming",
        "Internet Client Engineering",
        "Mobile Application Development",
        "Object Oriented Programming Fundamentals",
        "Programming Environments",
        "Web Development",
        "Advanced Computer Networks",
        "Computer Networks",
        "Cybersecurity Fundamentals (Elective)",
        "Network Engineering Fundamentals",
        "Networks, Systems and Web Security (Elective)",
        "Wireless Network Engineering (Elective)",
        "Computational Intelligence for Data Analysis (Elective)",
        "Discrete Mathematics for Computer Science",
        "Machine Learning",
        "Information System Infrastructure",
        "Information Systems",
        "Information Systems Development",
        "Information Technology Fundamentals",
        "Operating Systems",
        "Operating Systems Administration",
        "Industry Project 3A",
        "Industry Project 3B",
        "Industry Project for Cloud Technology 3A",
        "Industry Project for Cloud Technology 3B",
        "Managing Projects in the Cloud",
        "Project Management",
        "Internet of Things (Elective)",
        "Sustainability Practices",
        "Professional Environment"
    ];

    // Handlers for subject preference dropdowns
    const handlePreferenceChange = (event) => setPreference(event.target.value);
    const handlePreferenceChange1 = (event) => setPreference1(event.target.value);
    const handlePreferenceChange2 = (event) => setPreference2(event.target.value);

    return (
        <Container>
            <Row>
                <Col>
                    {/* Logo section */}
                    <div className="text-center mb-4" style={{ marginBottom: '30px' }}>
                        <img
                            src={logo}
                            alt="LSS Logo"
                            style={{
                                width: "250px", // Adjust width as necessary
                                height: "auto",
                                padding: '20px 0px 0px 0px',
                                borderRadius: "10px", // Rounded logo
                            }}
                        />
                    </div>
                    <h1 style={{ color: '#064789' }}>Register New Users</h1>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                        }}
                    >
                        {/* Navigation menu */}
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: '#EBF2FA',
                                padding: '20px',
                                borderRadius: '30px',
                                marginRight: '20px',
                                width: '250px',
                            }}
                        >
                            <Nav.Link
                                href="/admin"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    textAlign: 'center',
                                    marginBottom: '10px',
                                }}
                            >
                                Admin Page
                            </Nav.Link>
                            {/* Logout button */}
                            <LogoutButton />
                        </Nav>

                        {/* Form for user registration */}
                        <div
                            style={{
                                backgroundColor: '#EBF2FA',
                                padding: '20px',
                                borderRadius: '30px',
                                width: '600px',
                            }}
                        >
                            <Form onSubmit={handleSubmit}>
                                {/* Input for first name */}
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        placeholder="John"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        maxLength={50}
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        Please enter your first name.
                                    </Form.Text>
                                </Form.Group>

                                {/* Input for last name */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        placeholder="Smith"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        maxLength={50}
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        Please enter your last name.
                                    </Form.Text>
                                </Form.Group>

                                {/* Dropdown for user role */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="Lecturer">Lecturer</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Administrator">Administrator</option>
                                    </Form.Select>
                                    <Form.Text className="text-muted">
                                        Please select your role.
                                    </Form.Text>
                                </Form.Group>

                                {/* Subject preferences for lecturers */}
                                {role === 'Lecturer' && (
                                    <>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Preference 1</Form.Label>
                                            <Form.Select
                                                value={preference}
                                                onChange={handlePreferenceChange}
                                                required
                                            >
                                                <option value="">Select Subject</option>
                                                {allSubjects.map((subject) => (
                                                    <option key={subject} value={subject}>
                                                        {subject}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Text className="text-muted">
                                                Please select your first subject preference.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Preference 2</Form.Label>
                                            <Form.Select
                                                value={preference1}
                                                onChange={handlePreferenceChange1}
                                                required
                                            >
                                                <option value="">Select Subject</option>
                                                {allSubjects.map((subject) => (
                                                    <option key={subject} value={subject}>
                                                        {subject}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Text className="text-muted">
                                                Please select your second subject preference.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Preference 3</Form.Label>
                                            <Form.Select
                                                value={preference2}
                                                onChange={handlePreferenceChange2}
                                                required
                                            >
                                                <option value="">Select Subject</option>
                                                {allSubjects.map((subject) => (
                                                    <option key={subject} value={subject}>
                                                        {subject}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Text className="text-muted">
                                                Please select your third subject preference.
                                            </Form.Text>
                                        </Form.Group>
                                    </>
                                )}

                                {/* Input for email address */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        maxLength={50}
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        Please enter your email address. Example: test@gmail.com
                                    </Form.Text>
                                </Form.Group>

                                {/* Input for password */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        minLength={8}
                                        maxLength={32}
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        Password must be at least 8 characters long and not exceed 32 characters.
                                        Please use a combination of Capitals, lowercase, numbers and symbols.
                                    </Form.Text>
                                </Form.Group>

                                {/* Input for confirming password */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        Please confirm your password.
                                    </Form.Text>
                                </Form.Group>

                                {/* Display error messages */}
                                {error && <p className="text-danger">{error}</p>}

                                {/* Submit button */}
                                <Button variant="primary" type="submit" style={{ backgroundColor: '#427AA1', borderColor: '#427AA1' }}>
                                    Register &gt;&gt;
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage;
