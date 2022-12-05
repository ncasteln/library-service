import { useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import RoleNav from './RoleBasedNavigation';
import { FiMenu } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io';
import useOutsideAlerter from './useOutsideAlerter.js';
import { logout } from '../../features/authentication/authSlice';

const Header = ({ isActive, setIsActive }: {
  isActive: boolean;
  setIsActive: (arg: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.auth.profile);
  const navigate = useNavigate();

  // SideBar implementation
  const sidebarRef = useRef(null);
  const location = useLocation();
  useOutsideAlerter(sidebarRef, setIsActive);

  useEffect(() => {
    setIsActive(false)
  }, [location])

  const handleSidebar = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  }

  return (
    <nav>
      <button className={`sidebar-toggle ${isActive ? null : 'isClosed'}`} onClick={handleSidebar}>
        {isActive ? <IoMdClose /> : <FiMenu />}
      </button>
      <aside ref={sidebarRef} className={`sidebar ${isActive ? null : 'isClosed'}`}>
        {
          profile?.id
            ? <figure className='sidebar-figure'>
                <img src={profile.picture ? profile.picture : './static/images/profile-placeholder.png'} alt='User profile picture' />
                <blockquote>{profile.first_name} {profile.last_name}</blockquote>
              </figure>
            : null
        }
        <ul className='nav-group'>
          <li className='nav-item'>
            <Link className='nav-link' to='/home'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/catalogue'>Catalogue</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/find-biblio'>Find your Biblio</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/contacts'>Contacts</Link>
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
              : <>
                  <RoleNav
                    role={profile.role}
                    userId={profile.id}
                    routes={profile.role === 'user'
                      ? ['profile', 'reservations','wishlist']
                      : ['profile', 'dashboard', 'edit', 'addBook', 'history', 'exploreUsers']} />
                  <li className='nav-item'>
                    <button className='logout-button' onClick={handleLogout}>Logout</button>
                  </li>
                </>
          }
        </ul>
      </aside>
    </nav>
  );
}

export default Header;