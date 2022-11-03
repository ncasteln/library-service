import { Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/user/userSlice";

const RoleNav = ({ role, username } : { 
  role: string;
  username: string;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Nav.Item className="ml-3" as="li">
      <NavDropdown title={username} id="navbarScrollingDropdown">
        {
          role === 'admin'
            ? <NavDropdown.Item as={Link} to={`/dashboard`}>Dashboard</NavDropdown.Item>
            : 
            <>
              <NavDropdown.Item as={Link} to={`/profile`}>Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/wishlist`}>Wishlist</NavDropdown.Item>
            </>
        }
        <NavDropdown.Divider />
        <NavDropdown.Item as={Button} onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav.Item>
  )
};

export default RoleNav;