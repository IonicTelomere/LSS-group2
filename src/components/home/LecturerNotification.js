import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import LogoutButton from '../auth/Logout';

function LecturerNotification() {
  // State hooks for storing data, loading state, and error state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from the backend
  const fetchData = async () => {
    setLoading(true);  // Set loading state to true before fetching
    setError(null);  // Reset error state

    try {
      // Make a POST request to the backend API (localhost)
      const response = await axios.post('http://localhost:3000/lecturer');
      setData(response.data);  // Set the received data to the state
    } catch (err) {
      setError('Error fetching data from the backend');  // Handle any errors during data fetching
      console.error(err);  // Log the error for debugging purposes
    } finally {
      setLoading(false);  // Set loading state to false after fetching is complete
    }
  };

  return (
    <Container>
      <Row>
        {/* Main title for the page */}
        <h1>Notifications & Calendar</h1>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          
          {/* Navigation Menu */}
          <Nav
            defaultActiveKey="/home"
            className="flex-column"
            style={{
              backgroundColor: 'lightblue',
              padding: '20px 20px 20px',
              borderRadius: '30px',
              width: '250px'
            }}
          >
            {/* Link to Lecturer Profile */}
            <Nav.Link
              href="/lecturerprofile"
              style={{
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: 'white',
                color: 'black',
                textAlign: 'center',
                marginBottom: '10px'
              }}
            >
              Your Profile
            </Nav.Link>
            {/* Logout Button */}
            <LogoutButton />
          </Nav>

          {/* Main Content Area */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '20px' }}>
            {/* Notification Section */}
            <div
              style={{
                backgroundColor: 'lightblue',
                padding: '20px 20px 40px',
                borderRadius: '30px',
                textAlign: 'center',
              }}
            >
              <h3 style={{ textAlign: 'left' }}>Notifications</h3>
              {/* Toast Container for displaying notifications */}
              <ToastContainer className="position-static" style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
                {/* Single Toast notification */}
                <Toast>
                  <Toast.Header>
                    <strong className="me-auto">Urgent</strong>
                    <small>1 min ago</small>
                  </Toast.Header>
                  <Toast.Body>You have a meeting today at 6:30pm for subject CSEXXX</Toast.Body>
                </Toast>
              </ToastContainer>
            </div>

            {/* Assigned Subjects Section */}
            <div
              style={{
                backgroundColor: 'lightblue',
                padding: '20px',
                borderRadius: '30px',
              }}
            >
              <h3>Assigned Subjects</h3>
              {/* Button to trigger data fetching */}
              <button onClick={fetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Data'}
              </button>

              {/* Display error message if there was an error fetching data */}
              {error && <p style={{ color: 'red' }}>{error}</p>}

              {/* Display the data in a table if available */}
              {data.length > 0 ? (
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      {/* Dynamically create table headers based on data object keys */}
                      {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map over the data and display each row */}
                    {data.map((item, index) => (
                      <tr key={index}>
                        {/* Map over each item’s values and display them in table cells */}
                        {Object.values(item).map((value, i) => (
                          <td key={i}>{JSON.stringify(value)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                // If no data, display a message
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
