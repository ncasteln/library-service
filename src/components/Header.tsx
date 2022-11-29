import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import RoleNav from './RoleNav';
import { FiMenu } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io';
import useOutsideAlerter from './useOutsideAlerter';

const Header = ({ isActive, setIsActive }: {
  isActive: boolean;
  setIsActive: (arg: boolean) => void;
}) => {
  const profile = useAppSelector(state => state.auth.profile);
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
      <button className={`sidebar-toggle ${isActive ? null : 'isClosed'}`} onClick={handleSidebar}>
        {isActive ? <IoMdClose /> : <FiMenu />}
      </button>
      <aside ref={sidebarRef} className={`sidebar ${isActive ? null : 'isClosed'}`}>
        {
          profile?.id
            ? <figure className='sidebar-figure'>
                <img src={profile.picture ? profile.picture : require('../images/profile-placeholder.png')} alt='User profile picture' />
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
  );
}

export default Header;