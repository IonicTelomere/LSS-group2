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
                    {/* First Div */}
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        {/* Nav Div */}
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px 20px 500px',
                                borderRadius: '30px',
                                marginRight: '20px',
                                width: '250px', // Fixed width for consistent layout
                            }}>
                            <Nav.Link
                                href="/managersummary"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}>Subject Summary</Nav.Link>
                                <Nav.Link
                                href="/managerschedule"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}>Lecturer Assignment</Nav.Link>
                             <LogoutButton />
                        </Nav>
                            {/* Second Div with Padding */}
                            <div style={{
                                backgroundColor: 'lightblue',
                                padding: '100px 780px 570px 100px',
                                borderRadius: '30px',
                                flex: 1, // Allow this column to take up remaining space
                            }}>
                                <p></p>
                            </div>
                        </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ManagerPage;