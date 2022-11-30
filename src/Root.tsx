import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import './Root.css';
import { useState } from 'react';

const Root = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='Root'>
      <Header
        isActive={isActive} 
        setIsActive={setIsActive} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
export default Root;