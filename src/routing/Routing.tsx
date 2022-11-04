import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Catalogue from '../features/catalogue/Catalogue';
import NoMatch from '../components/NoMatch';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Profile from '../components/Profile';
import RequireAuth from "./RequireAuth";
import Unauthorized from "../components/Unauthorized";
import BookDetails from "../components/BookDetails";

const Routing = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<Home />} />
      <Route path='catalogue' element={<Catalogue />}>
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='unauthorized' element={<Unauthorized />} />

      {/* User protected routes */}
      <Route element={<RequireAuth roles={['user']} />}>
        <Route path='profile' element={<Profile />} />
        <Route path='reservations' element={<div>User reservations</div>} />
        <Route path='history' element={<div>User History</div>} />
        <Route path='changePassword' element={<div>Change pswd</div>} />
      </Route>

      {/* Admin protected routes */}
      <Route element={<RequireAuth roles={['admin']} />}>
        <Route path='validation' element={<div>Validation</div>} />
        <Route path='addBook' element={<div>add Book</div>} />
        <Route path='editBook' element={<div>edit book</div>} />
        <Route path='history' element={<div>history</div>} />
        <Route path='users' element={<div>users</div>} />
      </Route>

      {/* Not found */}
      <Route path='*' element={<NoMatch />} />
    </Routes>
  )
};

export default Routing;
