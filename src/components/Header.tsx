import { Navbar, Container, Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

// NOTES
// Add Profile image on the right of the username
// Map through the routes to render the Navbar?

const Header = () => {
  const userInfo = useAppSelector(state => state.user.userInfo)

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
                userInfo?.role
                  ? <>
                      <Nav.Item as={Link} to={`${userInfo.id}/reservations`} className="user ml-3">
                        <Nav.Item>{userInfo.username}</Nav.Item>
                        <div className='profile-img-container'>
                          <img src={userInfo.picture} alt='Profile image' />
                        </div>
                      </Nav.Item>
                    </>
                  : <>
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