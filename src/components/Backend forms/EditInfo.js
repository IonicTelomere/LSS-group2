import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Nav } from 'react-bootstrap';
import axios from 'axios';
import LogoutButton from '../auth/Logout';
import logo from "../Img/LSS.png";

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
          <h1 style={{ textAlign: 'left', color: '#064789' }}>Manage Lecturer Information</h1>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Nav className="flex-column" style={{
                          backgroundColor: '#EBF2FA', // Light Background Color
                          padding: '20px',
                          borderRadius: '30px',
                          marginRight: '20px',
                          width: '250px',
                      }}
                      >
                          <Nav.Link href="/manager" style={{
                              padding: '10px',
                              borderRadius: '5px',
                              color: 'white', // Text color for contrast
                              textAlign: 'center',
                              backgroundColor: '#427AA1', // Button background color
                              marginBottom: '10px',
                          }}>
                                Manager Home
                          </Nav.Link>
                          <Nav.Link href="/managersummary" style={{
                              padding: '10px',
                              borderRadius: '5px',
                              color: 'white', // Text color for contrast
                              textAlign: 'center',
                              backgroundColor: '#427AA1', // Button background color
                              marginBottom: '10px',
                          }}>
                              Subject Summary
                          </Nav.Link>
                          <Nav.Link href="/managerschedule" style={{
                              padding: '10px',
                              borderRadius: '5px',
                              color: 'white', // Text color for contrast
                              textAlign: 'center',
                              backgroundColor: '#427AA1', // Button background color
                              marginBottom: '10px',
                          }}>
                              Lecturer Assignment
                          </Nav.Link>
              <LogoutButton />
            </Nav>

                      <div style={{ backgroundColor: '#EBF2FA', padding: '20px', borderRadius: '30px', width: '600px', marginBottom: '20px', }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Lecturer ID</Form.Label>
                    <Form.Control
                    placeholder="00"
                    type="text"
                    value={lecturerId}
                    onChange={(e) => setLecturerId(e.target.value)}
                    required
                  />
                      <Button variant="secondary" onClick={fetchLecturerData} className="mt-2" style={{ backgroundColor: '#427AA1', borderColor: '#427AA1' }}>Fetch Lecturer Data</Button>
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}

                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                                  <Form.Control placeholder="John" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={50} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control placeholder="Smith" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={50} required />
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

                              <Button variant="primary" type="submit" style={{ backgroundColor: '#427AA1', borderColor: '#427AA1' }}>
                  Update Lecturer Info
                </Button>
              </Form>
            </div>
          </div>

                  <div style={{
                      backgroundColor: '#EBF2FA', // Light Background
                      padding: '20px',
                      borderRadius: '30px',
                      marginRight: '20px',
                      flex: 1
                  }}>
            <h1>Data from Backend</h1>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Data'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {data.length > 0 ? (
                          <table style={{
                              width: '100%',
                              borderCollapse: 'collapse',
                              backgroundColor: 'white',
                          }}>
                    <thead>
                        <tr>
                            {/* Adjust the headers based on your data structure */}
                            {Object.keys(data[0]).map((key) => (
                                <th key={key} style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    textAlign: 'left',
                                }}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, i) => (
                                    <td key={i} style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                    }}>{JSON.stringify(value)}</td>
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
