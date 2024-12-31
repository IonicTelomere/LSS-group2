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
    // State hooks to manage the form and fetched data
    const [subjectId, setSubjectId] = useState('');
    const [lecturerId, setLecturerId] = useState('');
    const [specialisationData, setSpecialisationData] = useState([]); // Stores lecturer specialisation data
    const [unallocatedData, setUnallocatedData] = useState([]); // Stores unallocated subjects data
    const [loadingSpecialisation, setLoadingSpecialisation] = useState(false); // Loading state for specialisation data
    const [loadingUnallocated, setLoadingUnallocated] = useState(false); // Loading state for unallocated subjects
    const [errorSpecialisation, setErrorSpecialisation] = useState(null); // Error state for specialisation data fetch
    const [errorUnallocated, setErrorUnallocated] = useState(null); // Error state for unallocated subjects fetch

    // Fetch unallocated subjects data from the backend
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

    // Fetch lecturer specialisation data from the backend
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

    // Assign subject to lecturer when form is submitted
    const assignSubject = async (e) => {
        e.preventDefault();
        // Ensure both subjectId and lecturerId are provided before proceeding
        if (!subjectId || !lecturerId) {
            console.error("subjectId and lecturerId are required");
            return;
        }
        try {
            // Send the data to the backend to assign subject to lecturer
            const response = await axios.post('http://localhost:3000/assign-subject', {
                subjectId,
                lecturerId,
            });
            console.log(response.data.message);
            setSubjectId(''); // Clear subject ID input after assignment
            setLecturerId(''); // Clear lecturer ID input after assignment
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
                        {/* Left Column - Navigation Menu */}
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: 'lightblue', // Background color for navigation
                                padding: '20px', // Padding for the sidebar
                                borderRadius: '30px', // Rounded corners for the sidebar
                                width: '250px', // Fixed width for the sidebar
                                marginRight: '20px', // Margin on the right to create space between sidebar and content
                            }}>
                            {/* Navigation Links */}
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
                            {/* Logout Button */}
                            <LogoutButton />
                        </Nav>

                        {/* Middle - Form to Assign Subject to Lecturer */}
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
                                        onChange={(e) => setSubjectId(e.target.value)} // Update subjectId state
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="lecturerIdInput">Lecturer ID</Form.Label>
                                    <Form.Control
                                        id="lecturerIdInput"
                                        placeholder="Enter Lecturer ID"
                                        value={lecturerId}
                                        onChange={(e) => setLecturerId(e.target.value)} // Update lecturerId state
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">Assign</Button>
                            </Form>
                        </div>   
                    </div>

                    {/* Bottom Section - Data Fetch Buttons */}
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
                            flex: 1 // Allow this section to grow and take up remaining space
                        }}>
                            <h3>Lecturer Specialisation</h3>
                            <button onClick={fetchSpecialisationData} disabled={loadingSpecialisation}>
                                {loadingSpecialisation ? 'Loading...' : 'Fetch Data'}
                            </button>

                            {/* Display error if fetching specialisation data fails */}
                            {errorSpecialisation && <p style={{ color: 'red' }}>{errorSpecialisation}</p>}

                            {/* Display lecturer specialisation data in a table if available */}
                            {specialisationData.length > 0 ? (
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    backgroundColor: 'white',
                                }}>
                                    <thead>
                                        <tr>
                                            {/* Dynamically create table headers from the keys of the first data object */}
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
                                        {/* Dynamically create rows for each data item */}
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
                                <p>No data available</p> // Display if no specialisation data
                            )}
                        </div>

                        {/* Right Column - Unallocated Subjects Section */}
                        <div style={{
                            backgroundColor: 'lightblue',
                            padding: '20px',
                            borderRadius: '30px',
                            flex: 1, // Allow this section to grow and take up remaining space
                        }}>
                            <h3>Unallocated Subjects</h3>
                            <button onClick={fetchUnallocatedData} disabled={loadingUnallocated}>
                                {loadingUnallocated ? 'Loading...' : 'Fetch Data'}
                            </button>

                            {/* Display error if fetching unallocated subjects fails */}
                            {errorUnallocated && <p style={{ color: 'red' }}>{errorUnallocated}</p>}

                            {/* Display unallocated subjects data in a table if available */}
                            {unallocatedData.length > 0 ? (
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    backgroundColor: 'white',
                                }}>
                                    <thead>
                                        <tr>
                                            {/* Dynamically create table headers from the keys of the first data object */}
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
                                        {/* Dynamically create rows for each data item */}
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
                                <p>No data available</p> // Display if no unallocated data
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ManagerSchedule;
