import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Nav } from 'react-bootstrap';
import axios from 'axios';
import LogoutButton from '../auth/Logout';

function ManageLecturerPage() {
  const [lecturerId, setLecturerId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preference, setPreference] = useState('');
  const [preference1, setPreference1] = useState('');
  const [preference2, setPreference2] = useState('');
  const [workload, setWorkload] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

    try {
      const response = await axios.put(`/api/lecturers/${lecturerId}`, {
        firstName,
        lastName,
        preference,
        preference1,
        preference2,
        workload,
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


  const fetchData = async () => {
          setLoading(true);
          setError(null);
  
          try {
              // Replace with your actual backend URL (adjust port if needed)
              const response = await axios.post('http://localhost:3000/lecturerdetails', {
                  // You can send data in the request body if needed
                  // For example:
                  // data: 'someData'
              });
  
              setData(response.data);  // Set the received data to state
          } catch (err) {
              setError('Error fetching data from the backend');
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
  

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
  <Form.Select
    value={workload}
    onChange={(e) => setWorkload(e.target.value)}
    required
  >
    <option value="">Select Workload</option>
    <option value="5 days per week">5 days per week</option>
    <option value="4 days per week">4 days per week</option>
    <option value="3 days per week">3 days per week</option>
    <option value="2 days per week">2 days per week</option>
    <option value="1 days per week">1 day per week</option>
  </Form.Select>
</Form.Group>

                <Button variant="primary" type="submit">
                  Update Lecturer Info
                </Button>
              </Form>
            </div>
          </div>

          <div className="App">
            <h1>Data from Backend</h1>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Data'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {/* Adjust the headers based on your data structure */}
                            {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, i) => (
                                    <td key={i}>{JSON.stringify(value)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ManageLecturerPage;
