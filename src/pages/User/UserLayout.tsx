import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, Outlet, useParams } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/user/userSlice";

// NOTES 
// Make a SideNavBar
// Change Logout

const UserLayout = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  return (
    <Container>
      <Row>
        <Col className='d-flex flex-column'>
          <Link to={`/${userId}/profile`}>Profile</Link>
          <Link to={`/${userId}/reservations`}>Reservations</Link>
          <Link to={`/${userId}/history`}>History</Link>
          <Button onClick={() => dispatch(logout())}>Logout</Button>
        </Col>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
};

export default UserLayout;