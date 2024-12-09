import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import LogoutButton from '../auth/Logout';

function LecturerNotification() {
  const [subjects, setSubjects] = useState([]); // State for subjects
  const userID = '3'; // Replace with dynamic userID if needed

  // Fetch subjects assigned to the lecturer by UserID
  useEffect(() => {
    const fetchAssignedSubjects = async () => {
        try {
            console.log('Fetching subjects for userID:', userID);
            const response = await axios.get(`http://localhost:3000/subjects?userId=${userID}`);
            console.log('API Response:', response.data);
            setSubjects(response.data);
            console.log('Received userID:', userID);
        } catch (error) {
            console.error('Error fetching assigned subjects:', error);
        }
    };

    if (userID) fetchAssignedSubjects(); // Fetch only if userID exists
}, [userID]);// Ensure the effect runs when userID changes

  
  

  return (
    <Container>
      <Row>
        <h1>Lecturer Page</h1>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <Nav
            defaultActiveKey="/home"
            className="flex-column"
            style={{
              backgroundColor: 'lightblue',
              padding: '20px 20px 610px',
              borderRadius: '30px',
              width: '250px',
            }}
          >
            <Nav.Link href="/home">Home Page</Nav.Link>
            <Nav.Link eventKey="link-1">Navigation2</Nav.Link>
            <LogoutButton />
          </Nav>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '20px' }}>
            <div
              style={{
                backgroundColor: 'lightblue',
                padding: '40px 50px 40px',
                borderRadius: '30px',
                textAlign: 'center',
              }}
            >
              <ToastContainer
                className="position-static"
                style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}
              >
                <Toast>
                  <Toast.Header>
                    <strong className="me-auto">Urgent</strong>
                    <small>1 min ago</small>
                  </Toast.Header>
                  <Toast.Body>You have a meeting today at 6:30pm for subject CSEXXX</Toast.Body>
                </Toast>
              </ToastContainer>
            </div>

            {/* Table for Assigned Subjects */}
            <div
              style={{
                backgroundColor: 'lightblue',
                padding: '20px',
                borderRadius: '30px',
              }}
            >
              <h3>Assigned Subjects</h3>
              <Table striped bordered hover>
  <thead>
    <tr>
      <th>Subject ID</th>
      <th>Subject Name</th>
      <th>Start Date</th>
      <th>End Date</th>
    </tr>
  </thead>
  <tbody>
{Array.isArray(subjects) && subjects.length > 0 ? (
    subjects.map((subject, index) => (
        <tr key={index}>
            <td>{subject.subjectID}</td>
            <td>{subject.subjectName}</td>
            <td>{subject.startDate}</td>
            <td>{subject.endDate}</td>
        </tr>
    ))
) : (
    <tr>
        <td colSpan="4">No subjects assigned</td>
    </tr>
)}
</tbody>
</Table>

            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default LecturerNotification;
