import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function SiteNav() {
    return (
        <Navbar expand="lg" className="mt-2 shadow-sm navbar-gradient" style={{ backgroundColor: "#333333" }}>
                <Container>
                <Navbar.Brand href="/home" style={{ color: "#3399ff" }}>
                    Scheduling System
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-md-auto">
                        <Nav.Link href="/login" style={{ color: "#3399ff" }}>Login</Nav.Link>
                        <Nav.Link href="/register" style={{ color: "#3399ff" }}>Register</Nav.Link>
                        <Nav.Link href="/admin" style={{ color: "#3399ff" }}>Admin</Nav.Link>
                        <Nav.Link href="/lecturer" style={{ color: "#3399ff" }}>Lecturer</Nav.Link>
                        <Nav.Link href="/manager" style={{ color: "#3399ff" }}>Manager</Nav.Link>
                        <Nav.Link href="/managersummary" style={{ color: "#3399ff" }}>Manager Summary</Nav.Link>
                        <Nav.Link href="/database" style={{ color: "#3399ff" }}>Data Base</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default SiteNav;