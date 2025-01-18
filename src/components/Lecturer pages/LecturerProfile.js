import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import LogoutButton from '../auth/Logout';
import logo from "../Img/LSS.png";

function LecturerProfile() {
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
                <h1 style={{ textAlign: 'left', color: '#064789' }}>Your Profile</h1>
                <div
                    style={{
                        display: 'flex', // Enables horizontal layout
                        alignItems: 'flex-start', // Aligns items at the top
                        gap: '20px', // Adds space between Nav and content
                    }}>

                    {/* Navigation Section */}
                    <Nav
                        defaultActiveKey="/home"
                        className="flex-column"
                        style={{
                            backgroundColor: '#EBF2FA', // Light Background Color
                            padding: '20px 20px 20px',
                            borderRadius: '30px',
                            width: '250px' // Fixed width for navigation
                        }}>

                        {/* Link to Notifications & Calendar */}
                        <Nav.Link
                            href="/lecturernotification"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                backgroundColor: '#427AA1', // Button background color
                                color: 'white', // Text color for contrast
                                textAlign: 'center',
                                marginBottom: '10px'
                            }}>
                            Notifications & Calendar
                        </Nav.Link>

                        {/* Logout Button */}
                        <LogoutButton />
                    </Nav>

                    {/* Profile Information Section */}
                    <div style={{
                        backgroundColor: '#EBF2FA', // Light Background Color
                        padding: '40px 50px 40px',
                        borderRadius: '30px',
                        width: '100%',
                        maxWidth: '1000px', // Optional: Limits max width of the content
                    }}>

                        <Row>
                            <Col md={4} className="text-center">
                                {/* Placeholder for Profile Picture */}
                                <img
                                    src="https://via.placeholder.com/150" // Placeholder image
                                    alt="Profile"
                                    style={{
                                        borderRadius: '50%', // Circle shape for profile picture
                                        width: '150px',
                                        height: '150px',
                                        border: '2px solid #427AA1' // Border for better visibility
                                    }}
                                />
                                <h4 style={{ color: '#064789' }}>John Smith</h4>
                                <p style={{ color: '#427AA1' }}>Senior Lecturer in Computer Science</p>
                            </Col>
                            <Col md={8}>
                                {/* Stack for displaying profile badges horizontally */}
                                <Stack direction="horizontal" gap={3}>
                                    {/* Displaying the profile information as badges */}
                                    <span style={{
                                        padding: '10px 15px',
                                        borderRadius: '5px',
                                        color: 'white',
                                        backgroundColor: '#427AA1', // Badge background color
                                        textAlign: 'center'
                                    }}> Employment Type: Full-Time</span>

                                    <span style={{
                                        padding: '10px 15px',
                                        borderRadius: '5px',
                                        color: 'white',
                                        backgroundColor: '#427AA1', // Badge background color
                                        textAlign: 'center'
                                    }}> Skillset: Java, Python, Data Science</span>
                                </Stack>

                                {/* Contact Information */}
                                <div style={{ marginTop: '20px' }}>
                                    <h5 style={{ color: '#064789' }}>Contact Information</h5>
                                    <p>Email: john.smith@example.com</p>
                                    <p>Phone: 1234 5678 90</p>
                                    <p>University: LaTrobe University</p>
                                </div>
                            </Col>
                        </Row>

                        {/* Space between elements */}
                        <p> </p>
                    </div>

                </div>
            </Row>
        </Container>
    );
}

export default LecturerProfile;