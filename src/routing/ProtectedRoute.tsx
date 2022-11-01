import { useAppSelector } from "../app/hooks";
import { Link, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLogged = useAppSelector(state => state.user.isLogged)

  if (!isLogged) {
    return (
      <div>
        <h1>Access denied</h1>
        <p>
          It seems you're not logged. Click 
          <Link to='/login'> here</Link> to log in.
        </p>
      </div>
    )
  }
  return <Outlet />
};

export default ProtectedRoute;