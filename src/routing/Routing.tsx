import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Catalogue from '../features/catalogue/Catalogue';
import NoMatch from '../components/NoMatch';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Profile from '../components/Profile';
import ProtectedRoute from '../routing/ProtectedRoute';

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/catalogue' element={<Catalogue />} />
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/profile/:id' element={<Profile />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/wishlist/:id' element={<div>User Wishlist</div>} />
      </Route>
      <Route path='/registration' element={<Registration />} />
      <Route path='*' element={<NoMatch />} />
    </Routes>
  )
};

export default Routing;