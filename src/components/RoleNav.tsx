import { NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/authentication/authSlice";
import { resetUserState } from "../features/user/userSlice";

const RoleNav = ({ userId, username, picture, routes }: {
  userId: string;
  username: string;
  picture: string;
  routes: string[];
}) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetUserState());
  }

  return (
    <>
      <NavDropdown title={username} id="basic-nav-dropdown">
        {
          routes.map((page, i) => {
            return <NavDropdown.Item key={`RoleNav-${i}`} as={Link} to={`/${userId}/${page}`}>{page}</NavDropdown.Item>
          })
        }
        <NavDropdown.Divider />
        <NavDropdown.Item as={Button} onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
      <div className='profile-img-container'>
        <img src={picture} alt='Profile image' />
      </div>
    </>
  )
};

export default RoleNav;