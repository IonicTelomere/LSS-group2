import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function HomePage() {
    return (
        <Container style={{ padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <Row>
                <Col>
                    <h1 style={{ fontWeight: 'lighter', fontSize: '2.5rem', color: '#007bff' }}>
                        LSS Group 2
                    </h1>
                    <p style={{ marginTop: '1.5rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#343a40' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;