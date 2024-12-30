import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import LogoutButton from '../auth/Logout';

function ManagerSchedule() {
    const [subjectId, setSubjectId] = useState('');
    const [lecturerId, setLecturerId] = useState('');
    const [specialisationData, setSpecialisationData] = useState([]);
    const [unallocatedData, setUnallocatedData] = useState([]);
    const [loadingSpecialisation, setLoadingSpecialisation] = useState(false);
    const [loadingUnallocated, setLoadingUnallocated] = useState(false);
    const [errorSpecialisation, setErrorSpecialisation] = useState(null);
    const [errorUnallocated, setErrorUnallocated] = useState(null);

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
                <Col>
                    <h1 style={{ textAlign: 'left' }}>Lecturer Assignment</h1>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        {/* Left Column - Nav */}
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px 20px 20px',
                                borderRadius: '30px',
                                width: '250px',
                                marginRight: '20px',
                            }}>
                            <Nav.Link
                                href="/manager"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    textAlign: 'center',
                                    marginBottom: '10px',
                                }}>Manager Home</Nav.Link>
                            <Nav.Link
                                href="/managersummary"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    textAlign: 'center',
                                    marginBottom: '10px',
                                }}>Subject Summary</Nav.Link>
                            <LogoutButton />
                        </Nav>

                        {/* Middle - Form */}
                        <div style={{
                            backgroundColor: 'lightblue',
                            padding: '20px',
                            borderRadius: '30px',
                            marginBottom: '20px',
                            width: '600px'
                        }}>
                            <Form onSubmit={assignSubject}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="subjectIdInput">Subject ID</Form.Label>
                                    <Form.Control
                                        id="subjectIdInput"
                                        placeholder="Enter Subject ID"
                                        value={subjectId}
                                        onChange={(e) => setSubjectId(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="lecturerIdInput">Lecturer ID</Form.Label>
                                    <Form.Control
                                        id="lecturerIdInput"
                                        placeholder="Enter Lecturer ID"
                                        value={lecturerId}
                                        onChange={(e) => setLecturerId(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Assign
                                </Button>
                            </Form>
                            </div>   
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '20px'
                    }}>
                        {/* Lecturer Specialisation Section */}
                        <div style={{
                            backgroundColor: 'lightblue',
                            padding: '20px',
                            borderRadius: '30px',
                            marginRight: '20px',
                            flex: 1 // Allow it to grow and take available space
                        }}>
                            <h3>Lecturer Specialisation</h3>
                            <button onClick={fetchSpecialisationData} disabled={loadingSpecialisation}>
                                {loadingSpecialisation ? 'Loading...' : 'Fetch Data'}
                            </button>

                            {errorSpecialisation && <p style={{ color: 'red' }}>{errorSpecialisation}</p>}

                            {specialisationData.length > 0 ? (
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    backgroundColor: 'white',
                                }}>
                                    <thead>
                                        <tr>
                                            {Object.keys(specialisationData[0]).map((key) => (
                                                <th
                                                    key={key}
                                                    style={{
                                                        border: '1px solid #ddd',
                                                        padding: '8px',
                                                        textAlign: 'left',
                                                    }}>
                                                    {key}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {specialisationData.map((item, index) => (
                                            <tr key={index}>
                                                {Object.values(item).map((value, i) => (
                                                    <td
                                                        key={i}
                                                        style={{
                                                            border: '1px solid #ddd',
                                                            padding: '8px',
                                                        }}>
                                                        {JSON.stringify(value)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>

                        {/* Right Column - Unallocated Subjects */}
                        <div style={{
                            backgroundColor: 'lightblue',
                            padding: '20px',
                            borderRadius: '30px',
                            flex: 1, // Allow it to grow and take available space
                        }}>
                            <h3>Unallocated Subjects</h3>
                            <button onClick={fetchUnallocatedData} disabled={loadingUnallocated}>
                                {loadingUnallocated ? 'Loading...' : 'Fetch Data'}
                            </button>

                            {errorUnallocated && <p style={{ color: 'red' }}>{errorUnallocated}</p>}

                            {unallocatedData.length > 0 ? (
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    backgroundColor: 'white',
                                }}>
                                    <thead>
                                        <tr>
                                            {Object.keys(unallocatedData[0]).map((key) => (
                                                <th
                                                    key={key}
                                                    style={{
                                                        border: '1px solid #ddd',
                                                        padding: '8px',
                                                        textAlign: 'left',
                                                    }}>
                                                    {key}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unallocatedData.map((item, index) => (
                                            <tr key={index}>
                                                {Object.values(item).map((value, i) => (
                                                    <td
                                                        key={i}
                                                        style={{
                                                            border: '1px solid #ddd',
                                                            padding: '8px',
                                                        }}>
                                                        {JSON.stringify(value)}</td>
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
                </Col>
            </Row>
        </Container>
    );
}

export default ManagerSchedule;
