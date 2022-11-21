import { NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/authentication/authSlice";

const RoleNav = ({ role, userId, username, picture, routes }: {
  role: string;
  userId: string;
  username: string;
  picture: string;
  routes: string[];
}) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <>
      {
        routes.map((page, i) => {
          return (
          <li className='nav-item' key={`RoleNav-${i}`}>
            <Link className='nav-link' to={`${role}/${userId}/${page}`}>
              {page}
            </Link>
          </li>
          )
        })
      }
      <button className="basic" onClick={handleLogout}>Logout</button>

      {/* <NavDropdown title={username} id="basic-nav-dropdown">
        {
          routes.map((page, i) => {
            return <NavDropdown.Item key={`RoleNav-${i}`} as={Link} to={`${role}/${userId}/${page}`}>{page}</NavDropdown.Item>
          })
        }
        <NavDropdown.Divider />
        <NavDropdown.Item as={Button} onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
      <div className='profile-img-container'>
        <img src={picture} alt='Profile image' />
      </div> */}
    </>
  )
};

export default RoleNav;