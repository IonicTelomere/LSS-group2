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
                            padding: '20px 20px 20px',
                            borderRadius: '30px',
                            width: '250px'
                        }}>

                            <Nav.Link
                                href="/lecturernotification"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                backgroundColor: 'white',
                                color: 'black',
                                textAlign: 'center',
                                marginBottom: '10px'
                            }}>
                                Notifications & Calendar
                            </Nav.Link>
                        
                            <LogoutButton />
                    </Nav>

                    {/* Top & Bottom Div */}
                    <div style={{
                        backgroundColor: 'lightblue',
                        padding: '40px 50px 40px',
                        borderRadius: '30px',
                        width: '100%',
                        maxWidth: '1000px', // Optional: Limits max width
                    }}>
                        
                        <Stack direction="horizontal" gap={5}>
                            <badge style={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: 'orange'
                            }}> First Name</badge>

                            <badge style={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: 'orange'
                            }}> Last Name</badge>
                            <badge style={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: 'orange'
                            }}> Employment Type</badge>
                            <badge style={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: 'orange'
                            }}> Skillset</badge>
                        </Stack>
                       
                        <p> </p>
                    </div>
                        
                </div>
            </Row>
        </Container>
    )
}

export default LecturerProfile;