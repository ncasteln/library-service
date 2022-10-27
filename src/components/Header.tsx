import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

// NOTES
// add logout action

const Header = () => {
  const isLogged = useAppSelector(state => state.user.isLogged)
  const { username } = useAppSelector(state => state.user.userInfo)

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container fluid>
        <Navbar.Brand href="#home">Bibl.io</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" as="ul">
          <Nav.Item as="li">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link as={Link} to='/cat'>Catalogue</Nav.Link>
          </Nav.Item>
          <Nav.Item className="border-right border-light"></Nav.Item>
            {
              isLogged
                ? 
                <Nav.Item className="ml-3" as="li">
                  <NavDropdown title={username} id="navbarScrollingDropdown">
                    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/dashboard'>Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item>
                :
                <>
                  <Nav.Item className="ml-3" as="li">
                    <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="ml-3" as="li">
                    <Nav.Link as={Link} to='/registration'>Registration</Nav.Link>
                  </Nav.Item>
                </>
            }
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;