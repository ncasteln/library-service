import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import RoleNav from './RoleNav';

// NOTES
// Add Profile image on the right of the username

const Header = () => {
  const { username } = useAppSelector(state => state.user.userInfo)
  const role = useAppSelector(state => state.user.userInfo.role);

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

            {/* Nav item to delete - only explaination pourpose
            <Nav.Item as="li">
              <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={Link} to='/admin'>Admin</Nav.Link>
            </Nav.Item> */}

            <Nav.Item className="border-right border-light ml-3"></Nav.Item>
              {
                role
                  ? <RoleNav 
                      role={role}
                      username={username} />
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