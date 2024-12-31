import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Nav } from 'react-bootstrap';
import axios from 'axios';
import LogoutButton from '../auth/Logout';

function ManageLecturerPage() {
  // State variables to store lecturer details
  const [lecturerId, setLecturerId] = useState(''); // Stores the lecturer ID input
  const [email, setEmail] = useState(''); // Stores the lecturer email input
  const [password, setPassword] = useState(''); // Stores the new password input
  const [confirmPassword, setConfirmPassword] = useState(''); // Stores confirm password input
  const [firstName, setFirstName] = useState(''); // Stores the lecturer first name input
  const [lastName, setLastName] = useState(''); // Stores the lecturer last name input
  const [preference, setPreference] = useState(''); // Stores the lecturer's primary subject preference
  const [preference1, setPreference1] = useState(''); // Stores the lecturer's second subject preference
  const [preference2, setPreference2] = useState(''); // Stores the lecturer's third subject preference
  const [workload, setWorkload] = useState(''); // Stores the lecturer's workload input
  const [error, setError] = useState(''); // Stores error messages
  const [successMessage, setSuccessMessage] = useState(''); // Stores success messages

  // Function to fetch lecturer data based on lecturer ID
  const fetchLecturerData = async () => {
    if (!lecturerId) {
      setError('Lecturer ID is required!'); // Error if no lecturer ID is provided
      return;
    }
    try {
      // Fetch lecturer data from the backend API
      const response = await axios.get(`/api/lecturers/${lecturerId}`);
      const data = response.data;
      
      // Set the fetched data into state variables
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPreference(data.preference);
      setPreference1(data.preference1);
      setPreference2(data.preference2);
      setWorkload(data.workload);
    } catch (err) {
      // Handle error if data fetch fails
      setError(err.response?.data?.message || 'Failed to fetch lecturer data');
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page on submission
    if (password && password !== confirmPassword) {
      setError("Passwords don't match!"); // Error if passwords don't match
      return;
    }

    try {
      // Send a PUT request to update lecturer data
      const response = await axios.put(`/api/lecturers/${lecturerId}`, {
        firstName,
        lastName,
        email,
        preference,
        preference1,
        preference2,
        workload,
        password: password || undefined, // Only send password if provided
      });
      
      // Set success message if update is successful
      setSuccessMessage('Lecturer information updated successfully!');
      setError(''); // Clear any error messages
    } catch (err) {
      // Handle error if update fails
      setError(err.response?.data?.message || 'Failed to update lecturer information');
    }
  };

  // List of all available subjects for preference selection
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
    "Profesional Environment"
  ];

  return (
    <Container>
      <Row>
        <Col>
          <h1>Manage Lecturer Information</h1>
          
          {/* Sidebar for navigation */}
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Nav className="flex-column" style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '30px', marginRight: '20px', width: '250px' }}>
              <Nav.Link href="/admin" style={{ padding: '10px', borderRadius: '5px', backgroundColor: 'white', color: 'black', textAlign: 'center', marginBottom: '10px' }}>
                Admin Page
              </Nav.Link>
              <LogoutButton /> {/* Logout button */}
            </Nav>

            {/* Form to update lecturer details */}
            <div style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '30px', width: '600px' }}>
              <Form onSubmit={handleSubmit}>
                
                {/* Lecturer ID input */}
                <Form.Group className="mb-3">
                  <Form.Label>Lecturer ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={lecturerId}
                    onChange={(e) => setLecturerId(e.target.value)} // Update lecturerId state on change
                    required
                  />
                  <Button variant="secondary" onClick={fetchLecturerData} className="mt-2">Fetch Lecturer Data</Button> {/* Fetch data on button click */}
                </Form.Group>

                {/* Display error or success message */}
                {error && <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}

                {/* Form fields for lecturer details */}
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={50} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={50} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={50} required />
                </Form.Group>

                {/* Dropdown to select lecturer's preferences */}
                <Form.Group className="mb-3">
                  <Form.Label>Preference</Form.Label>
                  <Form.Select value={preference} onChange={(e) => setPreference(e.target.value)}>
                    <option value="">Select Subject</option>
                    {allSubjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Other preferences */}
                <Form.Group className="mb-3">
                  <Form.Label>Preference 1</Form.Label>
                  <Form.Select value={preference1} onChange={(e) => setPreference1(e.target.value)}>
                    <option value="">Select Subject</option>
                    {allSubjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Preference 2</Form.Label>
                  <Form.Select value={preference2} onChange={(e) => setPreference2(e.target.value)}>
                    <option value="">Select Subject</option>
                    {allSubjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Workload input */}
                <Form.Group className="mb-3">
                  <Form.Label>Workload</Form.Label>
                  <Form.Control type="text" value={workload} onChange={(e) => setWorkload(e.target.value)} />
                </Form.Group>

                {/* Password fields */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>New Password (Optional)</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    maxLength={32}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                {/* Submit button */}
                <Button variant="primary" type="submit">
                  Update Lecturer Info
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ManageLecturerPage;
