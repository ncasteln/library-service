import { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCatalogue } from '../features/catalogue/catalogueSlice';

// NOTES
// Maybe useEffect not necessary, but needed in case the user doesn't pass from 
// a place where the catalogue is fetched
// control after adding localStorage, if location.state !== userId is stil valid

const RequireAuth = ({ admittedRoles }: { admittedRoles: string[] }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const role = useAppSelector(state => state.user.profile.role);
  const isAuthorized = admittedRoles.includes(role);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getCatalogue());
    }
  }, []);

  if (isAuthorized) {
    // if (location.state !== userId) {
    //   return <Navigate to='/unauthorized' state={{ from: location }} replace />
    // }
    return <Outlet />
  }
  else if (role === 'user') {
    return <Navigate to='/unauthorized' state={{ from: location }} replace />
  }
  return <Navigate to='/login' state={{ from: location }} replace />
};

export default RequireAuth;