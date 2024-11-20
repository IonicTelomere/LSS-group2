import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function SiteNav() {
    return (
        <Navbar expand="lg" className="mt-2 shadow-sm navbar-gradient" style={{ backgroundColor: "#696969" }}>
                <Container>
                <Navbar.Brand href="/home" className="text-info">
                    Scheduling System
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-md-auto">
                        <Nav.Link href="/login" className="px-3 text-dark fw-semibold">Login</Nav.Link>
                        <Nav.Link href="/register" className="px-3 text-dark fw-semibold">Register</Nav.Link>
                        <Nav.Link href="/admin" className="px-3 text-dark fw-semibold">Admin</Nav.Link>
                        <Nav.Link href="/lecturer" className="px-3 text-dark fw-semibold">Lecturer</Nav.Link>
                        <Nav.Link href="/manager" className="px-3 text-dark fw-semibold">Manager</Nav.Link>
                        <Nav.Link href="/managersummary" className="px-3 text-dark fw-semibold">Manager Summary</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default SiteNav;