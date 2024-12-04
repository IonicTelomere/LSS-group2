import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

function ManagerSummary() {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Manager Page</h1>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        {/* First Div */}
                        {/* Nav Div */}
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px 20px 520px',
                                borderRadius: '30px',
                                width: '250px', // Fixed width for consistent layout
                            }}>
                            
                            <Nav.Link
                                href="/manager"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textDecoration: 'none',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}>Manager Home</Nav.Link>
                            <Nav.Link
                                href='/'
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'gray',
                                    backgroundColor: '#f0f0f0',
                                }}>Logout</Nav.Link>
                        </Nav>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Second Div with Padding */}
                            <div style={{
                                backgroundColor: 'lightblue',
                                padding: '100px 780px 170px 100px',
                                borderRadius: '30px',
                                textAlign: 'left',
                            }}>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                                <p>CSEXXX</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ManagerSummary;