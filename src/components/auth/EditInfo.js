import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Nav } from 'react-bootstrap';
import axios from 'axios';
import LogoutButton from '../auth/Logout';

function ManageLecturerPage() {
  const [lecturerId, setLecturerId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preference, setPreference] = useState('');
  const [preference1, setPreference1] = useState('');
  const [preference2, setPreference2] = useState('');
  const [workload, setWorkload] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchLecturerData = async () => {
    if (!lecturerId) {
      setError('Lecturer ID is required!');
      return;
    }
    try {
      const response = await axios.get(`/api/lecturers/${lecturerId}`);
      const data = response.data;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPreference(data.preference);
      setPreference1(data.preference1);
      setPreference2(data.preference2);
      setWorkload(data.workload);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch lecturer data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.put(`/api/lecturers/${lecturerId}`, {
        firstName,
        lastName,
        email,
        preference,
        preference1,
        preference2,
        workload,
        password: password || undefined,
      });
      setSuccessMessage('Lecturer information updated successfully!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update lecturer information');
    }
  };

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
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Nav className="flex-column" style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '30px', marginRight: '20px', width: '250px' }}>
              <Nav.Link href="/admin" style={{ padding: '10px', borderRadius: '5px', backgroundColor: 'white', color: 'black', textAlign: 'center', marginBottom: '10px' }}>
                Admin Page
              </Nav.Link>
              <LogoutButton />
            </Nav>

            <div style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '30px', width: '600px' }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Lecturer ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={lecturerId}
                    onChange={(e) => setLecturerId(e.target.value)}
                    required
                  />
                  <Button variant="secondary" onClick={fetchLecturerData} className="mt-2">Fetch Lecturer Data</Button>
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}

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

                <Form.Group className="mb-3">
                  <Form.Label>Preference</Form.Label>
                  <Form.Select
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}>
                    <option value="">Select Subject</option>
                    {allSubjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Preference 1</Form.Label>
                  <Form.Select
                    value={preference1}
                    onChange={(e) => setPreference1(e.target.value)}>
                    <option value="">Select Subject</option>
                    {allSubjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Preference 2</Form.Label>
                  <Form.Select
                    value={preference2}
                    onChange={(e) => setPreference2(e.target.value)}>
                    <option value="">Select Subject</option>
                    {allSubjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Workload</Form.Label>
                  <Form.Control type="text" value={workload} onChange={(e) => setWorkload(e.target.value)} />
                </Form.Group>

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
