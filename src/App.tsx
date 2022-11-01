import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './pages/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ProfilePage from './pages/ProfilePage';
import './App.css';
import ProtectedRoute from './routing/ProtectedRoute';

// NOTES
// Create a separate file for Routes and import

const App = () => {
  return (
    <div className='App'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalogue' element={<CataloguePage />} />
          <Route path='/login' element={<LoginForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/profile/:id' element={<ProfilePage />} />
          </Route>
          <Route path='/registration' element={<RegistrationForm />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
export default App;