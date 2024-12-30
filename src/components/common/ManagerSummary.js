import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import LogoutButton from '../auth/Logout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ManagerSummary() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Replace with your actual backend URL (adjust port if needed)
            const response = await axios.post('http://localhost:3000/insert', {
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
                    <h1>Subject Summary</h1>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        {/* Navigation Sidebar */}
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px 20px 20px',
                                borderRadius: '30px',
                                marginRight: '20px',
                                width: '250px', // Fixed width for consistent layout
                            }}>
                            <Nav.Link
                                href="/manager"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}>Manager Home</Nav.Link>
                            <Nav.Link
                                href="/managerschedule"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}>Lecturer Assignment</Nav.Link>
                            <LogoutButton />
                        </Nav>
                        {/* Main Content */}
                        <div style={{
                            backgroundColor: 'lightblue',
                            padding: '20px 20px 20px',
                            borderRadius: '30px',
                            flex: 1, // Allow this div to take up remaining space
                        }}>
                                <h3>Unassigned Subjects</h3>
                                <button onClick={fetchData} disabled={loading}>
                                    {loading ? 'Loading...' : 'Fetch Data'}
                                </button>

                                {error && <p style={{ color: 'red' }}>{error}</p>}

                                {data.length > 0 ? (
                                    <div style={{ overflowX: 'auto', marginTop: '20px' }}>
                                        <table
                                            style={{
                                                width: '100%',
                                                borderCollapse: 'collapse',
                                                backgroundColor: 'white',
                                            }}
                                        >
                                            <thead>
                                                <tr>
                                                    {/* Adjust the headers based on your data structure */}
                                                    {Object.keys(data[0]).map((key) => (
                                                        <th
                                                            key={key}
                                                            style={{
                                                                border: '1px solid #ddd',
                                                                padding: '8px',
                                                                textAlign: 'left',
                                                            }}
                                                        >
                                                            {key}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((item, index) => (
                                                    <tr key={index}>
                                                        {Object.values(item).map((value, i) => (
                                                            <td
                                                                key={i}
                                                                style={{
                                                                    border: '1px solid #ddd',
                                                                    padding: '8px',
                                                                }}
                                                            >
                                                                {JSON.stringify(value)}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p>No data available</p>
                                )}
                            </div>
                        </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ManagerSummary;