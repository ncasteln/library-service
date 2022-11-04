import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import './Root.css';

const Root = () => {
  return (
    <div className='Root'>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
export default Root;