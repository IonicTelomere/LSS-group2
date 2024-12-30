import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';

function ManagerSchedule() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [subjectInstanceID, setSubjectInstanceID] = useState('');
    const [lecturerID, setLecturerID] = useState('');

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Replace with your actual backend URL (adjust port if needed)
            const response = await axios.post('http://localhost:3000/insert', {});
            setData(response.data); // Set the received data to state
        } catch (err) {
            setError('Error fetching data from the backend');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const assignSubject = async () => {
        try {
            const response = await axios.post('http://localhost:3000/assign-subject', {
                subjectId: subjectInstanceID,
                lecturerId: lecturerID,
            });

            console.log(response.data.message);
            alert(response.data.message); // Show success message
        } catch (error) {
            console.error(error.response?.data?.error || 'Error assigning subject');
            alert(error.response?.data?.error || 'Error assigning subject'); // Show error message
        }
    };

    return (
        <Container fluid>
            <Row className="my-5">
                {/* Left Column - Nav */}
                <Col sm={2}>
                    <Nav
                        defaultActiveKey="/home"
                        className="flex-column"
                        style={{
                            backgroundColor: 'lightblue',
                            padding: '20px',
                            margin: '0px 0px 0px 100px',
                            borderRadius: '20px',
                            minHeight: '100%',
                        }}
                    >
                        <Nav.Link
                            href="/manager"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                backgroundColor: 'white',
                                color: 'black',
                                textAlign: 'center',
                                marginBottom: '10px',
                            }}
                        >
                            Manager
                        </Nav.Link>
                        {/* Add more links as needed */}
                    </Nav>
                </Col>

                {/* Middle Column - Form */}
                <Col sm={5}>
                    <h1>Lecturer Assignment</h1>
                    <div
                        style={{
                            backgroundColor: 'lightblue',
                            padding: '30px',
                            borderRadius: '20px',
                            textAlign: 'left',
                        }}
                    >
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="subjectInstanceIDInput">Subject Instance ID</Form.Label>
                            <Form.Control
                                id="subjectInstanceIDInput"
                                placeholder="Enter Subject Instance ID"
                                value={subjectInstanceID}
                                onChange={(e) => setSubjectInstanceID(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="lecturerIDInput">Lecturer ID</Form.Label>
                            <Form.Control
                                id="lecturerIDInput"
                                placeholder="Enter Lecturer ID"
                                value={lecturerID}
                                onChange={(e) => setLecturerID(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={assignSubject}>
                            Assign Subject &gt;&gt;
                        </Button>
                    </div>
                </Col>

                {/* Right Column - Assigned Subjects */}
                <Col sm={5}>
                    <h3>Assigned Subjects</h3>
                    <div
                        style={{
                            backgroundColor: 'lightblue',
                            padding: '30px',
                            borderRadius: '20px',
                            textAlign: 'left',
                        }}
                    >
                        <button onClick={fetchData} disabled={loading}>
                            {loading ? 'Loading...' : 'Fetch Data'}
                        </button>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        {data.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
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

export default ManagerSchedule;
