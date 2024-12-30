import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Nav } from 'react-bootstrap';
import axios from 'axios';
import LogoutButton from './Logout';

function EditInfo() {
    const [subjectId, setSubjectId] = useState('');
    const [lecturerId, setLecturerId] = useState('');
    const [specialisationData, setSpecialisationData] = useState([]);
    const [unallocatedData, setUnallocatedData] = useState([]);
    const [loadingSpecialisation, setLoadingSpecialisation] = useState(false);
    const [loadingUnallocated, setLoadingUnallocated] = useState(false);
    const [errorSpecialisation, setErrorSpecialisation] = useState(null);
    const [errorUnallocated, setErrorUnallocated] = useState(null);

    // Fetch Unallocated Subjects
    const fetchUnallocatedData = async () => {
        setLoadingUnallocated(true);
        setErrorUnallocated(null);

        try {
            const response = await axios.post('http://localhost:3000/insert', {});
            setUnallocatedData(response.data);
        } catch (err) {
            setErrorUnallocated('Error fetching unallocated data from the backend');
            console.error(err);
        } finally {
            setLoadingUnallocated(false);
        }
    };

    // Fetch Lecturer Specialisation Data
    const fetchSpecialisationData = async () => {
        setLoadingSpecialisation(true);
        setErrorSpecialisation(null);

        try {
            const response = await axios.post('http://localhost:3000/displaysubject', {});
            setSpecialisationData(response.data);
        } catch (err) {
            setErrorSpecialisation('Error fetching specialisation data from the backend');
            console.error(err);
        } finally {
            setLoadingSpecialisation(false);
        }
    };

    // Assign Subject to Lecturer
    const assignSubject = async (e) => {
        e.preventDefault();
        if (!subjectId || !lecturerId) {
            console.error("subjectId and lecturerId are required");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/assign-subject', {
                subjectId,
                lecturerId,
            });
            console.log(response.data.message);
            setSubjectId('');
            setLecturerId('');
        } catch (error) {
            console.error(error.response?.data?.error || 'Error assigning subject');
        }
    };

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <Nav className="flex-column" style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '30px' }}>
                        <Nav.Link href="/manager" style={{ padding: '10px', backgroundColor: 'white', marginBottom: '10px' }}>Manager Home</Nav.Link>
                        <Nav.Link href="/managersummary" style={{ padding: '10px', backgroundColor: 'white', marginBottom: '10px' }}>Subject Summary</Nav.Link>
                        <LogoutButton />
                    </Nav>
                </Col>
                <Col md={9}>
                    <div style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '30px' }}>
                        <h1>Lecturer Assignment</h1>
                        <Form onSubmit={assignSubject}>
                            <Form.Group className="mb-3">
                                <Form.Label>Subject ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Subject ID"
                                    value={subjectId}
                                    onChange={(e) => setSubjectId(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Lecturer ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Lecturer ID"
                                    value={lecturerId}
                                    onChange={(e) => setLecturerId(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Assign</Button>
                        </Form>

                        <h3 style={{ marginTop: '20px' }}>Lecturer Specialisation</h3>
                        <Button onClick={fetchSpecialisationData} disabled={loadingSpecialisation}>
                            {loadingSpecialisation ? 'Loading...' : 'Fetch Data'}
                        </Button>
                        {errorSpecialisation && <p style={{ color: 'red' }}>{errorSpecialisation}</p>}
                        {specialisationData.length > 0 ? (
                            <table style={{ width: '100%', marginTop: '10px' }}>
                                <thead>
                                    <tr>
                                        {Object.keys(specialisationData[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {specialisationData.map((item, index) => (
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

                        <h3 style={{ marginTop: '20px' }}>Unallocated Subjects</h3>
                        <Button onClick={fetchUnallocatedData} disabled={loadingUnallocated}>
                            {loadingUnallocated ? 'Loading...' : 'Fetch Data'}
                        </Button>
                        {errorUnallocated && <p style={{ color: 'red' }}>{errorUnallocated}</p>}
                        {unallocatedData.length > 0 ? (
                            <table style={{ width: '100%', marginTop: '10px' }}>
                                <thead>
                                    <tr>
                                        {Object.keys(unallocatedData[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {unallocatedData.map((item, index) => (
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

export default EditInfo;
