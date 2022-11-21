import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import RoleNav from './RoleNav';
import { FiMenu } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io';
import useOutsideAlerter from './useOutsideAlerter';

const Header = () => {
  const profile = useAppSelector(state => state.auth.profile);
  const [isActive, setIsActive] = useState(false);
  const sidebarRef = useRef(null);
  useOutsideAlerter(sidebarRef, setIsActive)
  const location = useLocation();

  useEffect(() => {
    setIsActive(false)
  }, [location])

  const handleSidebar = () => {
    setIsActive(!isActive);
  }

  return (
    <nav>
      <button className='sidebar-toggle' onClick={handleSidebar}>
        {isActive ? <IoMdClose /> : <FiMenu />}
      </button>
      <aside ref={sidebarRef} className={`sidebar ${isActive ? 'isOpen' : 'isClosed'}`}>
        {
          profile?.role
            ?
              <figure className='sidebar-img'>
                <img src={profile.picture} alt='User profile picture' />
                <blockquote>{profile.first_name} {profile.last_name}</blockquote>
              </figure>
          : null
        }
        <ul className='nav-group'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/catalogue'>Catalogue</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>Find your Biblio</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>Contacts</Link>
          </li>
        </ul>
        <ul className='login-group'>
          {
            !profile?.role
              ? <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/login'>Login</Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/registration'>Registration</Link>
                  </li>
                </>
              : profile.role === 'user'
                ? <RoleNav
                    role={profile.role}
                    userId={profile.id}
                    username={profile.username}
                    picture={profile.picture}
                    routes={['profile', 'reservations','wishlist']} />
                : <RoleNav
                    role={profile.role}
                    userId={profile.id}
                    username={profile.username}
                    picture={profile.picture}
                    routes={['profile', 'dashboard', 'edit', 'addBook', 'history', 'exploreUsers']} />
          }
        </ul>
      </aside>
    </nav>
  )

  // return (
  //   <Navbar className='Navbar' bg="primary" variant="dark" expand="sm">
  //     <Container fluid>
  //       <Navbar.Brand as={Link} to='/'>
  //         <img
  //           className='logo'
  //           src={require('../images/logo.png')}
  //           alt="Bibl.io brand logo" 
  //         />
  //       </Navbar.Brand>
  //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //       <Navbar.Collapse id="basic-navbar-nav">
  //         <Nav className="ml-auto" as="ul">
  //           <Nav.Item as="li">
  //             <Nav.Link as={Link} to='/'>Home</Nav.Link>
  //           </Nav.Item>
  //           <Nav.Item as="li">
  //             <Nav.Link as={Link} to='/catalogue'>Catalogue</Nav.Link>
  //           </Nav.Item>
  //           <Nav.Item className="border-right border-light ml-3"></Nav.Item>
  //             {
  //               !profile?.role
  //                 ? <>
  //                     <Nav.Item className="ml-3" as="li">
  //                       <Nav.Link as={Link} to='/login'>Login</Nav.Link>
  //                     </Nav.Item>
  //                     <Nav.Item className="ml-3" as="li">
  //                       <Nav.Link as={Link} to='/registration'>Registration</Nav.Link>
  //                     </Nav.Item>
  //                   </>
  //                 : profile.role === 'user'
  //                   ? <RoleNav
  //                       role={profile.role}
  //                       userId={profile.id}
  //                       username={profile.username}
  //                       picture={profile.picture}
  //                       routes={['profile', 'reservations','wishlist']} />
  //                   : <RoleNav
  //                       role={profile.role}
  //                       userId={profile.id}
  //                       username={profile.username}
  //                       picture={profile.picture}
  //                       routes={['profile', 'dashboard', 'edit', 'addBook', 'history', 'exploreUsers']} />
  //             }
  //         </Nav>
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  // )
}

export default Header;