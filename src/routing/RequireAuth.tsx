import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const RequireAuth = () => {
  const location = useLocation();
  const isLogged = useAppSelector(state => state.user.isLogged);

  // console.table(location)
  console.log(isLogged)

  return (
    isLogged
      ? <Outlet /> // means: return the child in case of logged, else navigate to login page
      : <Navigate to='/login' state={{ from: location }} replace />
  )
};

export default RequireAuth;