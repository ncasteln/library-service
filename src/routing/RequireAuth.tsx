import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const RequireAuth = ({ admittedRoles }: { admittedRoles: string[]; }) => {
  const location = useLocation();
  const role = useAppSelector(state => state.user.userInfo.role);
  const isAuthorized = admittedRoles.includes(role);

  if (isAuthorized) {
    return <Outlet />
  }
  else if (role === 'user') {
    return <Navigate to='/unauthorized' state={{ from: location }} replace />
  }
  return <Navigate to='/login' state={{ from: location }} replace />
};

export default RequireAuth;