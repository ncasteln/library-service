import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import RoleNav from './RoleNav';

// NOTES
// Add Profile image on the right of the username
// Map through the routes to render the Navbar?

const Header = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);

  return (
    <Navbar className='Navbar' bg="primary" variant="dark" expand="sm">
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
          <img
            className='logo'
            src={require('../images/logo.png')}
            alt="Bibl.io brand logo" 
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" as="ul">
            <Nav.Item as="li">
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={Link} to='/catalogue'>Catalogue</Nav.Link>
            </Nav.Item>
            <Nav.Item className="border-right border-light ml-3"></Nav.Item>
              {
                !profile?.role
                  ? <>
                      <Nav.Item className="ml-3" as="li">
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="ml-3" as="li">
                        <Nav.Link as={Link} to='/registration'>Registration</Nav.Link>
                      </Nav.Item>
                    </>
                  : profile.role === 'user'
                    ? <RoleNav 
                        userId={profile.id}
                        username={profile.username}
                        picture={profile.picture}
                        routes={['profile', 'reservations', 'history','wishlist']} />
                    : <RoleNav 
                        userId={profile.id}
                        username={profile.username}
                        picture={profile.picture}
                        routes={['dashboard', 'validation', 'addBook','history', 'exploreUsers']} />
              }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;