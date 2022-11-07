import { createBrowserRouter } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import Catalogue from "../features/catalogue/Catalogue";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Registration from "../pages/Registration";
import Unauthorized from "../pages/Unauthorized";
import Root from "../Root";
import RequireAuth from "./RequireAuth";

// NOTES
// The backend routes are not protected

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <h1>An error occured</h1>,
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
        element: <RequireAuth roles={['user']} />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
            children: [
              {
                path: 'reservations',
                element: <div>User Reservations</div>
              },
              {
                path: 'history',
                element: <div>User History</div>
              },
              {
                path: 'settings',
                element: <div>User Settings</div>
              }
            ]
          }
        ] 
      },
      {
        element: <RequireAuth roles={['admin']} />,
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
