import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProfilePage from './pages/ProfilePage'; 
import NotFoundPage from './pages/NotFoundPage';
import LoginForm from './pages/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cat' element={<CataloguePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/registration' element={<RegistrationForm />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>  
      </main>      
    </div>
  )
}
export default App;