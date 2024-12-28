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
  const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
 
        try {
            // Replace with your actual backend URL (adjust port if needed)
            const response = await axios.post('http://localhost:3000/lecturer', {
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
        <h1>Notifications & Calendar</h1>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <Nav
            defaultActiveKey="/home"
            className="flex-column"
            style={{
              backgroundColor: 'lightblue',
              padding: '20px 20px 610px',
              borderRadius: '30px',
              width: '250px'}}>

            <Nav.Link href="/lecturerprofile"
                      style={{
                      padding: '10px',
                      borderRadius: '5px',
                      backgroundColor: 'white',
                      color: 'black',
                      textAlign: 'center',
                      marginBottom: '10px'
                          }}>Your Profile</Nav.Link>
            <LogoutButton />
          </Nav>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '20px' }}>
            <div style={{
                backgroundColor: 'lightblue',
                padding: '20px 20px 40px',
                borderRadius: '30px',
                textAlign: 'center', }}>
                <h3 style={{ textAlign: 'left', }}>Notifications</h3>
                <ToastContainer
                className="position-static"
                style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
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
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default LecturerNotification;
