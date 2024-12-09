import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import LogoutButton from '../auth/Logout';
import Form from 'react-bootstrap/Form';

function LecturerProfile() {
    return (
        <Container>
            <Row>
                <h1>Your Profile</h1>
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
                                href="/lecturernotification"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textDecoration: 'none',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}
                            >
                                Notifications & Calendar View
                            </Nav.Link>
                        
                            <LogoutButton />
                    </Nav>

                    {/* Top & Bottom Div */}
                    <Form.Group className="mb-3">
            <Form.Label>Workload</Form.Label>
                <Form.Select>
                    <option>1 Day Per Week</option>
                    <option>2 Day Per Week</option>
                    <option>3 Day Per Week</option>
                    <option>4 Day Per Week</option>
                    <option>5 Day Per Week</option>
                </Form.Select>
            </Form.Group>
                    
                        
                </div>
            </Row>
        </Container>
    )
}

export default LecturerProfile;