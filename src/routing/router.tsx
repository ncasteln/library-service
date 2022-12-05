import { createBrowserRouter } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import Catalogue from "../pages/Catalogue/Catalogue";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Reservations from "../pages/User/Reservations";
import Unauthorized from "../pages/Unauthorized";
import Root from "../Root";
import RequireAuth from "./RequireAuth";
import Profile from "../pages/User/Profile";
import Wishlist from "../pages/User/Wishlist";
import AddBook from "../pages/Admin/AddBook";
import BookDetails from "../pages/Catalogue/BookDetails";

export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <h2>A routing error occured. Refresh the page.</h2>,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: 'catalogue',
        errorElement: <h2>The book doesn't exist.</h2>,
        children: [
          {
            index: true,
            element: <Catalogue />
          },
          {
            path: '/catalogue/:bookId',
            element: <BookDetails />
          }
        ]
      },
      {
        path: 'find-biblio',
        element: <div>Under construction</div>
      },
      {
        path: 'contacts',
        element: <div>Under construction</div>
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
        path: 'user',
        element: <RequireAuth admittedRoles={['user']} />,
        children: [
          {
            path: '/user/:userId/profile',
            element: <Profile />
          },
          {
            path: '/user/:userId/reservations',
            element: <Reservations />
          },
          {
            path: '/user/:userId/wishlist',
            element: <Wishlist />
          }
        ] 
      },
      {
        path: 'admin',
        element: <RequireAuth admittedRoles={['admin']} />,
        children: [
          {
            path: '/admin/:userId/profile',
            element: <Profile />
          },
          {
            path: '/admin/:userId/dashboard',
            element: <div>Admin Dashboard - need implementation</div>
          },
          {
            path: '/admin/:userId/addBook',
            element: <AddBook /> 
          },
          {
            path: '/admin/:userId/edit',
            element: <div>Edit page - need implementation</div>
          },
          {
            path: '/admin/:userId/history',
            element: <div>History - need implementation</div> 
          },
          {
            path: '/admin/:userId/exploreUsers',
            element: <div>Explore users page - need implementation</div>
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
