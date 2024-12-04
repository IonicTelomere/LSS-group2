import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

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
                        
                       <Nav.Link
                                href="/"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textDecoration: 'none',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}
                            >
                               Logout
                            </Nav.Link>
                    </Nav>

                    {/* Top & Bottom Div */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column', // Stacks Top and Bottom vertically
                            flex: 1, // Ensures it takes up remaining space
                            gap: '20px', // Adds space between Top & Bottom
                        }}>
                        {/* Top Div */}
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
                                backgroundColor: 'green',
                                marginright: '10px'}}> Profile</badge>

                            <badge style={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: 'orange'}}> Employment Type</badge>
                            </Stack>
                            <p></p>
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
                            </Stack>
                            <p></p>
                            <Stack direction="horizontal" gap={5}>
                            <badge style={{
                                padding: '10px 10px 10px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: 'orange'
                                }}> Skillset</badge>
                            </Stack>
                            <p></p>
                            <Table bordered style={{ color: 'black', border: '2px solid black' }}>
                                <tr style={{ color: 'white', border: '1px solid black', backgroundColor: 'purple' }}>
                                    <td style={{ border: '2px solid black' }}>Yes</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                    <td style={{ border: '2px solid black' }}>No</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                    <td style={{ border: '2px solid black' }}>Yes</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                    <td style={{ border: '2px solid black' }}>No</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                </tr>
                                <tr style={{ color: 'white', border: '2px solid black', backgroundColor: 'purple' }}>
                                    <td style={{ border: '2px solid black' }}>Yes</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                    <td style={{ border: '2px solid black' }}>No</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                    <td style={{ border: '2px solid black' }}>Yes</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                    <td style={{ border: '2px solid black' }}>No</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                </tr>
                                <tr style={{ color: 'white', border: '2px solid black', backgroundColor: 'purple' }}>
                                    <td style={{ border: '2px solid black' }}>Yes</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                    <td style={{ border: '2px solid black' }}>No</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                    <td style={{ border: '2px solid black' }}>Yes</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                    <td style={{ border: '2px solid black' }}>No</td>
                                    <td style={{ border: '2px solid black' }}>CSEXXX</td>
                                </tr>
                            </Table>
                        </div>

                        {/* Bottom Div */}
                        {/*<div
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px',
                                borderRadius: '30px',
                                textAlign: 'left',
                                width: '100%',
                                maxWidth: '1000px', // Optional: Limits max width
                            }}>
                        </div>*/}
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default LecturerProfile;