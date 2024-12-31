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
                {/* Main title for the page */}
                <h1>Your Profile</h1>
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
                            backgroundColor: 'lightblue',
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
                                    backgroundColor: 'white',
                                    color: 'black',
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
                        backgroundColor: 'lightblue',
                        padding: '40px 50px 40px',
                        borderRadius: '30px',
                        width: '100%',
                        maxWidth: '1000px', // Optional: Limits max width of the content
                    }}>
                        
                        {/* Stack for displaying profile badges horizontally */}
                        <Stack direction="horizontal" gap={5}>
                            {/* Displaying the profile information as badges */}
                            <badge style={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: 'orange' // Styling for badges
                            }}> First Name</badge>

                            <badge style={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: 'orange' // Styling for badges
                            }}> Last Name</badge>

                            <badge style={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: 'orange' // Styling for badges
                            }}> Employment Type</badge>

                            <badge style={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: 'orange' // Styling for badges
                            }}> Skillset</badge>
                        </Stack>
                       
                        {/* Space between elements */}
                        <p> </p>
                    </div>
                        
                </div>
            </Row>
        </Container>
    );
}

export default LecturerProfile;
