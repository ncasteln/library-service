import { useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/user/userSlice';

// NOTES
// Change navigate() to profile (and not to catalogue) when logged
// Add Profile image on the right of the username

const Header = () => {
  const isLogged = useAppSelector(state => state.user.isLogged)
  const { id, username } = useAppSelector(state => state.user.userInfo)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isLogged
      ? navigate('/catalogue')
      : navigate('/')
  }, [isLogged])

  return (
    <Navbar bg="primary" variant="dark" expand="sm">
      <Container fluid>
        <Navbar.Brand href="#home">Bibl.io</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" as="ul">
          <Nav.Item as="li">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link as={Link} to='/catalogue'>Catalogue</Nav.Link>
          </Nav.Item>
          <Nav.Item className="border-right border-light"></Nav.Item>
            {
              isLogged
                ? 
                <Nav.Item className="ml-3" as="li">
                  <NavDropdown title={username} id="navbarScrollingDropdown">
                    <NavDropdown.Item as={Link} to={`/profile/${id}`}>Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={`/wishlist/${id}`}>Wishlist</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Button} onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
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