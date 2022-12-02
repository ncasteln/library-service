import { Link } from "react-router-dom";

const RoleBasedNavigation = ({ role, userId, routes }: {
  role: string;
  userId: string;
  routes: string[];
}) => {
  return (
    <>
      {
        routes.map((page, i) => {
          return (
          <li className='nav-item' key={`RoleBasedNavigation-${i}`}>
            <Link className='nav-link' to={`${role}/${userId}/${page}`}>
              {page}
            </Link>
          </li>
          )
        })
      }
    </>
  )
};

export default RoleBasedNavigation;