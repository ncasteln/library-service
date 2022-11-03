import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Catalogue from '../features/catalogue/Catalogue';
import NoMatch from '../components/NoMatch';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Profile from '../components/Profile';
import Admin from "../components/Admin";
import RequireAuth from "./RequireAuth";
import Wishlist from "../components/Wishlist";
import Unauthorized from "../components/Unauthorized";
import BookDetails from "../components/BookDetails";

const Routing = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route index path='/' element={<Home />} />
      <Route path='catalogue' element={<Catalogue />}>
        <Route path=':bookId' element={<BookDetails />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='unauthorized' element={<Unauthorized />} />

      {/* User protected routes */}
      <Route element={<RequireAuth roles={['user']} />}>
        <Route path='profile' element={<Profile />} />
        <Route path='wishlist' element={<Wishlist />} />
      </Route>

      {/* Admin protected routes */}
      <Route element={<RequireAuth roles={['admin']} />}>
        <Route path='admin' element={<Admin />} />
      </Route>

      {/* Not found */}
      <Route path='*' element={<NoMatch />} />
    </Routes>
  )
};

export default Routing;