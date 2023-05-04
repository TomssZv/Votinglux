import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/navbar/Navbar';
import NewTable from './pages/NewTable/NewTable';
import './style/forms.scss';
import {
  Routes,
  Route
} from 'react-router-dom';
import LoginForm from './components/forms/LoginForm/LoginForm';
import RegisterForm from './components/forms/RegisterForm/RegisterForm';
import ProtectedRoute from './components/protected/ProtectedRoute';
import { useSelector } from 'react-redux';

function App() {
  const logedIn: boolean = useSelector((state: {[k: string]: any}) => state.user.logedIn)

  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <Routes>
          <Route index path ='/' element={<Home />} />
          <Route path ='/login' element={<LoginForm />} />
          <Route path ='/register' element={<RegisterForm />} />
          <Route element={<ProtectedRoute logedIn={logedIn} redirectPath='/' />}>
            <Route path='/home' element={<Home />} />
            <Route path='/newtable' element={<NewTable />} />
          </Route>
        </Routes>
      </div>   
    </div>
  )
}

export default App
