import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function SiteNav() {
    return (
        <head>
            <Navbar bg="dark" expand="lg" varient="dark">
                <Container>
                    <Navbar.Brand>LSS Group 2</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-md-auto">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </head>
    )
}

export default SiteNav;