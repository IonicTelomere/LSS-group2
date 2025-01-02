import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import LogoutButton from '../auth/Logout';
import logo from "../Img/LSS.png";

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
            setSubjectSuccessMessage(response.data.message);
            setsubjectcode('');
            setsubjectname('');
            setSubjectErrorMessage('');
        } catch (error) {
            setSubjectErrorMessage(error.response?.data?.error || 'Error adding subject');
            setSubjectSuccessMessage('');
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
            setInstanceSuccessMessage(response.data.message);
            setsubjectcodeInstance('');
            setstartdate('');
            setnoofenrolments('');
            setInstanceErrorMessage('');
        } catch (error) {
            setInstanceErrorMessage(error.response?.data?.error || 'Error adding subject instance');
            setInstanceSuccessMessage('');
        }
    };

    return (
        <Container>
            <Row>
                <Col>
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
                    <h1 style={{ textAlign: 'left', color: '#064789' }}>Manager Home</h1>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: '#EBF2FA', // Light Background Color
                                padding: '20px',
                                borderRadius: '30px',
                                marginRight: '20px',
                                width: '250px',
                            }}
                        >
                            <Nav.Link href="/managersummary" style={{
                                padding: '10px',
                                borderRadius: '5px',
                                color: 'white', // Text color for contrast
                                textAlign: 'center',
                                backgroundColor: '#427AA1', // Button background color
                                marginBottom: '10px',
                            }}>
                                Subject Summary
                            </Nav.Link>
                            <Nav.Link href="/managerschedule" style={{
                                padding: '10px',
                                borderRadius: '5px',
                                color: 'white', // Text color for contrast
                                textAlign: 'center',
                                backgroundColor: '#427AA1', // Button background color
                                marginBottom: '10px',
                            }}>
                                Lecturer Assignment
                            </Nav.Link>
                            <LogoutButton />
                        </Nav>

                        <div style={{
                            backgroundColor: '#EBF2FA', // Light Background Color
                            padding: '20px',
                            borderRadius: '30px',
                            marginRight: '20px',
                            width: '400px'
                        }}>
                            <h3 style={{ color: '#064789' }}>Add Subject</h3>
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
                                    <Form.Text className="text-muted">
                                        Please enter a 7 digit unique code for the subject. Example CSE1OSX.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="subjectnameInput">Subject Name</Form.Label>
                                    <Form.Control
                                        id="subjectnameInput"
                                        placeholder="Enter Subject Name"
                                        value={subjectname}
                                        onChange={(e) => setsubjectname(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        Please enter the full name of the subject. Example Computer Science.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{ backgroundColor: '#427AA1', borderColor: '#427AA1' }}>Add</Button>
                            </Form>
                        </div>

                        <div style={{
                            backgroundColor: '#EBF2FA', // Light Background Color
                            padding: '20px',
                            borderRadius: '30px',
                            width: '400px'
                        }}>
                            <h3 style={{ color: '#064789' }}>Add Subject Instance</h3>
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
                                    <Form.Text className="text-muted">
                                        Please enter the subject code that corresponds to the instance. Example CSE1ABC.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="startdateInput">Start Date</Form.Label>
                                    <Form.Control
                                        id="startdateInput"
                                        type="date"
                                        placeholder="Enter Subject Start Date"
                                        value={startdate}
                                        onChange={(e) => setstartdate(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        Please enter the start date for the subject instance.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="noofenrolmentsInput">No of Enrolments</Form.Label>
                                    <Form.Control
                                        id="noofenrolmentsInput"
                                        type="number"
                                        placeholder="Enter No of Enrolments"
                                        value={noofenrolments}
                                        onChange={(e) => setnoofenrolments(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        Please enter the maximum number of enrollments for this subject instance.
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="submit" style={{ backgroundColor: '#427AA1', borderColor: '#427AA1' }}>Add</Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ManagerPage;