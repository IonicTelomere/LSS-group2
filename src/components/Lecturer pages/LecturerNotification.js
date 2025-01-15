import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import LogoutButton from '../auth/Logout';
import logo from "../Img/LSS.png";

function LecturerNotification() {
    // State hooks for storing data, loading state, and error state
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Sample notifications data for demonstration
    const notifications = [
        { type: 'Urgent', time: '1 min ago', message: 'You have a meeting today at 6:30pm for subject CSE1XXX' },
        { type: 'Alert', time: 'Yesterday', message: 'New semester courses have been updated in the system.' }
    ];

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
                {/* Main title for the page */}
                <h1 style={{ textAlign: 'left', color: '#064789' }}>Notifications & Calendar</h1>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>

                    {/* Navigation Menu */}
                    <Nav
                        defaultActiveKey="/home"
                        className="flex-column"
                        style={{
                            backgroundColor: '#EBF2FA', // Light Background Color
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
                                backgroundColor: '#427AA1', // Navigation link background color
                                color: 'white', // Text color for contrast
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
                                backgroundColor: '#EBF2FA', // Light Background Color
                                padding: '20px 20px 40px',
                                borderRadius: '30px',
                                textAlign: 'center',
                            }}
                        >
                            <h3 style={{ textAlign: 'left', color: '#064789' }}>Notifications</h3>
                            {/* Toast Container for displaying notifications */}
                            <ToastContainer className="position-static" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                {
                                    // Map through the notifications and create a Toast for each
                                    notifications.map((notif, index) => (
                                        <div key={index} style={{ flex: '0 0 calc(20% - 20px)' }}> {/* Each toast takes up half the width with spacing */}
                                            <Toast>
                                                <Toast.Header>
                                                    <strong className="me-auto">{notif.type}</strong>
                                                    <small>{notif.time}</small>
                                                </Toast.Header>
                                                <Toast.Body>{notif.message}</Toast.Body>
                                            </Toast>
                                        </div>
                                    ))
                                }
                            </ToastContainer>
                        </div>

                        {/* Assigned Subjects Section */}
                        <div
                            style={{
                                backgroundColor: '#EBF2FA', // Light Background Color
                                padding: '20px',
                                borderRadius: '30px',
                            }}
                        >
                            <h3 style={{ color: '#064789' }}>Assigned Subjects</h3>
                            {/* Button to trigger data fetching */}
                            <button
                                onClick={fetchData}
                                disabled={loading}
                                style={{
                                    backgroundColor: '#427AA1', // Button background color
                                    color: 'white', // Text color for contrast
                                    border: 'none',
                                    padding: '10px 15px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
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
