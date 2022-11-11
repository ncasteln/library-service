import { createBrowserRouter } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import Catalogue from "../features/catalogue/Catalogue";
import UserHistory from "../pages/User/UserHistory";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Reservations from "../pages/User/Reservations";
import Unauthorized from "../pages/Unauthorized";
import Root from "../Root";
import RequireAuth from "./RequireAuth";
import UserLayout from "../pages/User/UserLayout";
import Profile from "../pages/User/Profile";

// NOTES
// The backend routes are not protected
// :userId route: need to be the parent? Content of the parent and children?

export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <h1>A routing error occured. Refresh the page.</h1>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'catalogue',
        element: <Catalogue />,
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'registration',
        element: <Registration />
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />
      },
      {
        element: <RequireAuth admittedRoles={['user']} />,
        children: [
          {
            path: ':userId',
            element: <UserLayout />,
            children: [
              {
                path: 'profile',
                element: <Profile />
              },
              {
                path: 'reservations',
                element: <Reservations />
              },
              {
                path: 'history',
                element: <UserHistory />
              },
            ]
          }
        ] 
      },
      {
        element: <RequireAuth admittedRoles={['admin']} />,
        children: [
          {
            path: 'dashboard',
            element: <div>Admin Dashboard</div>,
            children: [
              {
                path: 'validation',
                element: <div>Admin validation</div>
              },
              {
                path: 'addBook',
                element: <div>Admin addBook</div> 
              },
              {
                path: 'history',
                element: <div>History</div> 
              },
              {
                path: 'exploreUsers',
                element: <div>Explore users</div>
              },
            ]
          }
        ]
      },
      {
        path: '*',
        element: <NoMatch />
      }
    ]
  },
]);
