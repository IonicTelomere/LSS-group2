import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';

function RegisterPage() {
	  const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');
  	const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName] = useState('');
    const [proficiency, setProficiency] = useState('');
    const [preference, setPreference] = useState('');
  	const [error, setError] = useState('');
    const [selectedProficiency, setSelectedProficiency] = useState("");
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [role, setRole] = useState('');
    const [workload, setWorkload] = useState(""); // To capture selected workload

    

  	const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post('/api/register', {  
        firstName,
        lastName,
        role,
        proficiency,
        preference,
        workload,
        email,
        password, 
         });

      alert('Registration successful!');
    } catch (err) {
      setError(err.response.data.message || 'Something went wrong');
    }
  };

  const proficiencyToSubjects = {
    "Cloud Computing and Cloud-Based": [
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
    ],
    "Software Development and Programming": [
      "Intermediate Object Oriented Programming",
      "Internet Client Engineering",
      "Mobile Application Development",
      "Object Oriented Programming Fundamentals",
      "Programming Environments",
      "Web Development",
    ],
    "Cybersecurity and Network Engineering": [
      "Advanced Computer Networks",
      "Computer Networks",
      "Cybersecurity Fundamentals (Elective)",
      "Network Engineering Fundamentals",
      "Networks, Systems and Web Security (Elective)",
      "Wireless Network Engineering (Elective)",
    ],
    "Data Science, Machine Learning, and AI": [
      "Computational Intelligence for Data Analysis (Elective)",
      "Discrete Mathematics for Computer Science",
      "Machine Learning",
    ],
    "Information Systems and IT Infrastructure": [
      "Information System Infrastructure",
      "Information Systems",
      "Information Systems Development",
      "Information Technology Fundamentals",
    ],
    "Operating Systems and Administration": [
      "Operating Systems",
      "Operating Systems Administration",
    ],
    "Project Management and Industry Projects": [
      "Industry Project 3A",
      "Industry Project 3B",
      "Industry Project for Cloud Technology 3A",
      "Industry Project for Cloud Technology 3B",
      "Managing Projects in the Cloud",
      "Project Management",
    ],
    "IoT and Emerging Technologies": ["Internet of Things (Elective)", "Sustainability Practices"],
    "Professional and Career Development": ["Profesional Environment"],
  };


  const handleProficiencyChange = (event) => {
    const selected = event.target.value;
    setSelectedProficiency(selected);
    setFilteredSubjects(proficiencyToSubjects[selected] || []);
  };

  const handlePreferenceChange = (event) => {
    setPreference(event.target.value);
  };


  return (
    <Container>
      <Row className="justify-content-center my-5">
        {/* Slimmer Nav */}
        <Col sm={2}>
          <Nav
            defaultActiveKey="/home"
            className="flex-column"
            style={{
                backgroundColor: 'lightblue',
                padding: '20px 20px 540px',
                borderRadius: '30px',
                width: '130px', // Full width of the column
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
            {/* Add more links as needed */}
          </Nav>
        </Col>

        {/* Right Column for Form */}
        <Col sm={9}>
          <h1>Register</h1>
          <Form onSubmit={handleSubmit} >
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
            </Form.Group>

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
            </Form.Group>

            <Form.Group className="mb-3">
  <Form.Label>Role</Form.Label>
  <Form.Select
    value={role}
    onChange={(e) => setRole(e.target.value)} // Update the role state on change
    required
  >
    <option value="">Select Role</option>
    <option value="Lecturer">Lecturer</option>
    <option value="Manager">Manager</option>
    <option value="Administrator">Administrator</option>
  </Form.Select>
</Form.Group>

{role === "Lecturer" && (
  <>
    <Form.Group className="mb-3">
      <Form.Label>Proficiency</Form.Label>
      <Form.Select onChange={handleProficiencyChange} required>
        <option value="">Select Proficiency</option>
        {Object.keys(proficiencyToSubjects).map((proficiency) => (
          <option key={proficiency} value={proficiency}>
            {proficiency}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

        

    <Form.Group className="mb-3">
      <Form.Label>Preference</Form.Label>
      <Form.Select value={preference} onChange={handlePreferenceChange} required>
        <option value="">Select Subject</option>
        {filteredSubjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Preference</Form.Label>
      <Form.Select value={preference} onChange={handlePreferenceChange} required>
        <option value="">Select Subject</option>
        {filteredSubjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Label>Preference</Form.Label>
      <Form.Select value={preference} onChange={handlePreferenceChange} required>
        <option value="">Select Subject</option>
        {filteredSubjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

  </>
)}

<Form.Group className="mb-3">
  <Form.Label>Workload</Form.Label>
  <Form.Select
    value={workload}
    onChange={(e) => setWorkload(e.target.value)} // Update the role state on change
    required
  >
    <option value="">Select Role</option>
    <option value="Lecturer">Lecturer</option>
    <option value="Manager">Manager</option>
    <option value="Administrator">Administrator</option>
  </Form.Select>
</Form.Group>



            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={50}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button variant="primary" type="submit">
              Register &gt;&gt;
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;