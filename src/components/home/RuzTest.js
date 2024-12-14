import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';
import LogoutButton from '../auth/Logout';

function LecturerNotification() {
  // State to hold LecturerSchedule data
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch LecturerSchedule data from the server
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('/api/lecturer-schedule');
        // Ensure the data is always an array
        if (Array.isArray(response.data)) {
          setSchedule(response.data);
        } else {
          setSchedule([]); // Default to empty array if not an array
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch LecturerSchedule data');
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <Container>
      <Row>
        <h1>Lecturer Page</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
          }}>
          {/* Nav Div */}
          <Nav
            defaultActiveKey="/home"
            className="flex-column"
            style={{
              backgroundColor: 'lightblue',
              padding: '20px 20px 610px',
              borderRadius: '30px',
              width: '250px',
            }}>
            <Nav.Link href="/home">Home Page</Nav.Link>
            <Nav.Link eventKey="link-1">Navigation2</Nav.Link>
            <LogoutButton />
          </Nav>
          {/* Notes and Schedule Divs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              gap: '20px',
            }}>
            {/* Notes Div */}
            <div
              style={{
                backgroundColor: 'lightblue',
                padding: '40px 50px 40px',
                borderRadius: '30px',
                textAlign: 'center',
              }}>
              <ToastContainer className="position-static" style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
                <Toast>
                  <Toast.Header>
                    <strong className="me-auto">Urgent</strong>
                    <small>1 min ago</small>
                  </Toast.Header>
                  <Toast.Body>You have a meeting today at 6:30pm for subject CSEXXX</Toast.Body>
                </Toast>
              </ToastContainer>
            </div>
            {/* Schedule Div */}
            <div style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '30px' }}>
              <h2>Lecturer Schedule</h2>
              {loading ? (
                <p>Loading schedule...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Subject ID</th>
                      <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Subject Name</th>
                      <th style={{ borderBottom: '1px solid black', padding: '8px' }}>User ID</th>
                      <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Start Date</th>
                      <th style={{ borderBottom: '1px solid black', padding: '8px' }}>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule && Array.isArray(schedule) && schedule.length > 0 ? (
                      schedule.map((item, index) => (
                        <tr key={index}>
                          <td style={{ padding: '8px' }}>{item.subjectID}</td>
                          <td style={{ padding: '8px' }}>{item.subjectname}</td>
                          <td style={{ padding: '8px' }}>{item.Userid}</td>
                          <td style={{ padding: '8px' }}>
                            {new Date(item.startdate).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '8px' }}>
                            {new Date(item.enddate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>
                          No schedule available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default LecturerNotification;
