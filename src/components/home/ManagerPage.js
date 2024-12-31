import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import LogoutButton from '../auth/Logout';

function ManagerPage() {

    // State hooks to manage the form, fetched data, and messages
    const [subjectcode, setsubjectcode] = useState('');
    const [subjectname, setsubjectname] = useState('');
    const [startdate, setstartdate] = useState('');
    const [noofenrolments, setnoofenrolments] = useState('');
    const [subjectcodeInstance, setsubjectcodeInstance] = useState('');
    
    // Separate success and error messages for each form
    const [subjectSuccessMessage, setSubjectSuccessMessage] = useState(''); 
    const [subjectErrorMessage, setSubjectErrorMessage] = useState('');
    const [instanceSuccessMessage, setInstanceSuccessMessage] = useState(''); 
    const [instanceErrorMessage, setInstanceErrorMessage] = useState('');

    // Adding subject when form is submitted
    const addSubject = async (e) => {
        e.preventDefault();
        if (!subjectcode || !subjectname) {
            setSubjectErrorMessage("Subject code and subject name are required.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/add-subject', {
                subjectcode,
                subjectname,
            });
            setSubjectSuccessMessage(response.data.message); // Set success message
            setsubjectcode('');
            setsubjectname('');
            setSubjectErrorMessage(''); // Clear error message
        } catch (error) {
            setSubjectErrorMessage(error.response?.data?.error || 'Error adding subject');
            setSubjectSuccessMessage(''); // Clear success message
        }
    };

    // Adding subject instance when form is submitted
    const addSubjectInstance = async (e) => {
        e.preventDefault();
        if (!subjectcodeInstance || !startdate || !noofenrolments) {
            setInstanceErrorMessage("Subject code, start date, and number of enrolments are required.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/add-subject-instance', {
                subjectcode: subjectcodeInstance,
                startdate,
                noofenrolments,
            });
            setInstanceSuccessMessage(response.data.message); // Set success message
            setsubjectcodeInstance('');
            setstartdate('');
            setnoofenrolments('');
            setInstanceErrorMessage(''); // Clear error message
        } catch (error) {
            setInstanceErrorMessage(error.response?.data?.error || 'Error adding subject instance');
            setInstanceSuccessMessage(''); // Clear success message
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Manager Home</h1>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px 20px 20px',
                                borderRadius: '30px',
                                marginRight: '20px',
                                width: '250px',
                            }}
                        >
                            <Nav.Link href="/managersummary" style={{
                                padding: '10px',
                                borderRadius: '5px',
                                color: 'black',
                                textAlign: 'center',
                                backgroundColor: 'white',
                                marginBottom: '10px',
                            }}>
                                Subject Summary
                            </Nav.Link>
                            <Nav.Link href="/managerschedule" style={{
                                padding: '10px',
                                borderRadius: '5px',
                                color: 'black',
                                textAlign: 'center',
                                backgroundColor: 'white',
                                marginBottom: '10px',
                            }}>
                                Lecturer Assignment
                            </Nav.Link>
                            <LogoutButton />
                        </Nav>

                        <div style={{
                            backgroundColor: 'lightblue',
                            padding: '20px',
                            borderRadius: '30px',
                            marginRight: '20px',
                            width: '400px'
                        }}>
                            <h3>Add Subject</h3>
                            {subjectSuccessMessage && <div className="alert alert-success">{subjectSuccessMessage}</div>}
                            {subjectErrorMessage && <div className="alert alert-danger">{subjectErrorMessage}</div>}
                            <Form onSubmit={addSubject}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="subjectcodeInput">Subject Code</Form.Label>
                                    <Form.Control
                                        id="subjectcodeInput"
                                        placeholder="Enter Subject Code"
                                        value={subjectcode}
                                        onChange={(e) => setsubjectcode(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="subjectnameInput">Subject Name</Form.Label>
                                    <Form.Control
                                        id="subjectnameInput"
                                        placeholder="Enter Subject Name"
                                        value={subjectname}
                                        onChange={(e) => setsubjectname(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">Assign</Button>
                            </Form>
                        </div>

                        <div style={{
                            backgroundColor: 'lightblue',
                            padding: '20px',
                            borderRadius: '30px',
                            width: '400px'
                        }}>
                            <h3>Add Subject Instance</h3>
                            {instanceSuccessMessage && <div className="alert alert-success">{instanceSuccessMessage}</div>}
                            {instanceErrorMessage && <div className="alert alert-danger">{instanceErrorMessage}</div>}
                            <Form onSubmit={addSubjectInstance}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="subjectcodeInstanceInput">Subject Code</Form.Label>
                                    <Form.Control
                                        id="subjectcodeInstanceInput"
                                        placeholder="Enter Subject Code"
                                        value={subjectcodeInstance}
                                        onChange={(e) => setsubjectcodeInstance(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="startdateInput">Start Date</Form.Label>
                                    <Form.Control
                                        id="startdateInput"
                                        placeholder="Enter Subject Start Date"
                                        value={startdate}
                                        onChange={(e) => setstartdate(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="noofenrolmentsInput">No of Enrolments</Form.Label>
                                    <Form.Control
                                        id="noofenrolmentsInput"
                                        placeholder="Enter No of Enrolments"
                                        value={noofenrolments}
                                        onChange={(e) => setnoofenrolments(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">Assign</Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ManagerPage;
