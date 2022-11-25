import Header from './components/Header';
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
      {/* <main className={`${isActive ? 'nav-is-open' : 'nav-is-closed'}`}></main> */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
export default Root;