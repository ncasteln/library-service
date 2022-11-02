import Header from './components/Header';
import Routing from './routing/Routing';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <main>
        <Routing />
      </main>
    </div>
  )
}
export default App;