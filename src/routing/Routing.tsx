import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Catalogue from '../features/catalogue/Catalogue';
import NoMatch from '../components/NoMatch';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Profile from '../components/Profile';
import ProtectedRoute from '../routing/ProtectedRoute';
import RequireAuth from "./RequireAuth";

const Routing = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<Home />} />
      <Route path='/catalogue' element={<Catalogue />} />
      <Route path='/login' element={<Login />} />
      <Route path='/registration' element={<Registration />} />

      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/wishlist' element={<div>User Wishlist</div>} />
      </Route>

      {/* Not found */}
      <Route path='*' element={<NoMatch />} />
    </Routes>
  )
};

export default Routing;