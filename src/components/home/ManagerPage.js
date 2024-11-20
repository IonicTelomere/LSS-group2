import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ManagerPage() {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Manager Page</h1>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        {/* First Div */}
                        <div
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px 80px 400px',
                                borderRadius: '30px',
                                marginRight: '-150px', // Space between the first and second div
                            }}>
                            <p>Navigation1</p>
                            <p>Navigation2</p>
                            <p>Navigation3</p>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Second Div with Padding */}
                            <div
                                style={{
                                    backgroundColor: 'lightblue',
                                    padding: '100px 780px 440px 100px',
                                    borderRadius: '30px',
                                    textAlign: 'left',
                                }}>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ManagerPage;