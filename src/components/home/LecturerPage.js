import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function LecturerPage() {
    return (
        <Container>
            <Row>
                <h1>Lecturer Page</h1>
                <div
                    style={{
                        display: 'flex', // Enables horizontal layout
                        alignItems: 'flex-start', // Aligns items at the top
                        gap: '20px', // Adds space between Nav and content
                    }}>
                    {/* Nav Div */}
                    <Nav
                        defaultActiveKey="/home"
                        className="flex-column"
                        style={{
                            backgroundColor: 'lightblue',
                            padding: '20px 20px 610px',
                            borderRadius: '30px',
                            width: '250px', // Fixed width for consistent layout
                        }}>
                        <Nav.Link
                            href="/home"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                color: 'black',
                                textDecoration: 'none',
                                backgroundColor: 'white',
                                marginBottom: '10px',
                            }}>Home Page</Nav.Link>
                        <Nav.Link
                            eventKey="link-1"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                color: 'black',
                                textDecoration: 'none',
                                backgroundColor: 'white',
                                marginBottom: '10px',
                            }}>Navigation2</Nav.Link>
                        <Nav.Link
                            eventKey="link-2"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                color: 'black',
                                textDecoration: 'none',
                                backgroundColor: 'white',
                                marginBottom: '10px',
                            }}>Navigation3</Nav.Link>
                        <Nav.Link
                            eventKey="disabled"
                            disabled
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                color: 'gray',
                                backgroundColor: '#f0f0f0',
                            }}>To be assigned</Nav.Link>
                    </Nav>

                    {/* Notes and Calendar Divs */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column', // Stacks Notes and Calendar vertically
                            flex: 1, // Ensures it takes up remaining space
                            gap: '20px', // Adds space between Notes and Calendar
                        }}>
                        {/* Notes Div */}
                        <div
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '40px 50px 40px',
                                borderRadius: '30px',
                                textAlign: 'center',
                                width: '100%',
                                maxWidth: '1000px', // Optional: Limits max width
                            }}>
                            <ToastContainer className="position-static" style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
                                <Toast style={{ width: '300px', height: '110px' }}>
                                    <Toast.Header>
                                        <strong className="me-auto">Urgent</strong>
                                        <small>1 min ago</small>
                                    </Toast.Header>
                                    <Toast.Body>You have 1 Meeting today at 6:30pm for subject CSEXXX</Toast.Body>
                                </Toast>
                                <Toast style={{ width: '300px', height: '110px' }}>
                                    <Toast.Header>
                                        <strong className="me-auto">Urgent</strong>
                                        <small>3 mins ago</small>
                                    </Toast.Header>
                                    <Toast.Body>CSEXXX submission deadline for A3 is Tonight 11:59pm</Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </div>

                        {/* Calendar Div */}
                        <div
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px',
                                borderRadius: '30px',
                                textAlign: 'left',
                                width: '100%',
                                maxWidth: '1000px', // Optional: Limits max width
                            }}
                        >
                            <iframe
                                title="This is a unique title"
                                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Australia%2FMelbourne&showPrint=0&src=bWFqb3JtYW4yNDBAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uYXVzdHJhbGlhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%2333B679&color=%230B8043"
                                style={{
                                    border: 'solid 1px #777',
                                    width: '100%',
                                    height: '560px',
                                    borderRadius: '30px',
                                }}
                                frameBorder="0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default LecturerPage;