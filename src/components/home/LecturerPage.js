import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

function LecturerPage() {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Lecturer Page</h1>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        {/* First Div */}
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px 20px 400px',
                                borderRadius: '30px',
                                marginRight: '-150px',
                            }}
                        >
                            <Nav.Link
                                href="/home"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textDecoration: 'none',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}
                            >
                                Active
                            </Nav.Link>
                            <Nav.Link
                                eventKey="link-1"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textDecoration: 'none',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}
                            >
                                Link
                            </Nav.Link>
                            <Nav.Link
                                eventKey="link-2"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textDecoration: 'none',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}
                            >
                                Link
                            </Nav.Link>
                            <Nav.Link
                                eventKey="disabled"
                                disabled
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'gray',
                                    backgroundColor: '#f0f0f0',
                                }}
                            >
                                Disabled
                            </Nav.Link>
                        </Nav>
                        {/* Container for the Second Div and Third Div */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Second Div with Padding */}
                            <div
                                style={{
                                    backgroundColor: 'lightblue',
                                    padding: '10px',
                                    borderRadius: '30px',
                                    textAlign: 'left',
                                    marginBottom: '10px' // Space between the second and third div
                                }}>
                                <iframe title="This is a unique title" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Australia%2FMelbourne&showPrint=0&src=bWFqb3JtYW4yNDBAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uYXVzdHJhbGlhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%2333B679&color=%230B8043" style={{ border: 'solid 1px #777', width: '1000px', height: '600px', borderRadius: '30px' }}
                                    frameborder="0"></iframe>

                            </div>
                            {/* Third Div */}
                            <div
                                style={{
                                    backgroundColor: 'lightblue',
                                    padding: '40px 350px 130px 320px',
                                    borderRadius: '30px',
                                    textAlign: 'left',

                                }}>
                                <p>Notes/Announcments</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default LecturerPage;