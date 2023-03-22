import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar'
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path ='/' element={<Home />} />
          <Route path ='/login' element={<LoginForm />} />
          <Route path ='/register' element={<RegisterForm />} />
        </Routes>
      </div>   
    </div>
  )
}

export default App
