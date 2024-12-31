// Import required libraries and components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import LogoutButton from '../auth/Logout';

function ManagerPage() {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Manager Home</h1>
                    {/* First Div: Container for layout */}
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        {/* Nav Div: Sidebar navigation menu */}
                        <Nav
                            defaultActiveKey="/home" // Default active link
                            className="flex-column" // Flex column layout for the menu
                            style={{
                                backgroundColor: 'lightblue', // Background color for the sidebar
                                padding: '20px 20px 20px', // Padding for spacing inside the sidebar
                                borderRadius: '30px', // Rounded corners for the sidebar
                                marginRight: '20px', // Right margin for space between sidebar and content
                                width: '250px', // Fixed width for consistent layout
                            }}
                        >
                            {/* Link to the Subject Summary page */}
                            <Nav.Link
                                href="/managersummary" // Link to Subject Summary
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textAlign: 'center',
                                    backgroundColor: 'white', // Background color for each link
                                    marginBottom: '10px', // Bottom margin for spacing between links
                                }}
                            >
                                Subject Summary
                            </Nav.Link>

                            {/* Link to the Lecturer Assignment page */}
                            <Nav.Link
                                href="/managerschedule" // Link to Lecturer Assignment
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textAlign: 'center',
                                    backgroundColor: 'white', // Background color for each link
                                    marginBottom: '10px', // Bottom margin for spacing between links
                                }}
                            >
                                Lecturer Assignment
                            </Nav.Link>

                            {/* Logout button */}
                            <LogoutButton />
                        </Nav>

                        {/* Second Div: Main content area */}
                        <div style={{
                            backgroundColor: 'lightblue', // Background color for content area
                            padding: '100px 780px 570px 100px', // Padding for spacing around content
                            borderRadius: '30px', // Rounded corners for content area
                            flex: 1, // Allow this column to take up remaining space
                        }}>
                            {/* Placeholder for content */}
                            <p></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ManagerPage;
