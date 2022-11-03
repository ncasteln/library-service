import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const RequireAuth = ({ roles }: { roles: string[]; }) => {
  const location = useLocation();
  const role = useAppSelector(state => state.user.userInfo.role);

  const isAuth = roles.includes(role);
  console.log(isAuth)

  if (isAuth) {
    return <Outlet />
  }
  else if (role === 'user') {
    return <Navigate to='/unauthorized' state={{ from: location }} replace />
  }
  return <Navigate to='/login' state={{ from: location }} replace />
};

export default RequireAuth;