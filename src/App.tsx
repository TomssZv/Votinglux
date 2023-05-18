import style from './App.module.scss';
import Home from './pages/Home/Home';
import Navbar from './components/navbar/Navbar';
import NewGroup from './pages/NewGroup/NewGroup';
import './style/forms.scss';
import {
  Routes,
  Route
} from 'react-router-dom';
import LoginForm from './components/forms/LoginForm/LoginForm';
import RegisterForm from './components/forms/RegisterForm/RegisterForm';
import ProtectedRoute from './components/protected/ProtectedRoute';
import { useSelector } from 'react-redux';
import { Group } from './pages/Group/Group';
import { Explore } from './pages/Explore/Explore';
import { LandingPage } from './pages/LandingPage/LandingPage';

function App() {
  const logedIn: boolean = useSelector((state: {[k: string]: any}) => state.user.logedIn)

  return (
    <div className={style.app}>
      <Navbar />
      <div className={style.content}>
        <Routes>
          <Route index path ='/' element={<LandingPage />} />
          <Route path ='/login' element={<LoginForm />} />
          <Route path ='/register' element={<RegisterForm />} />
          <Route path='/explore' element={<Explore />} />
          <Route element={<ProtectedRoute logedIn={logedIn} redirectPath='/' />}>
            <Route path='/home' element={<Home />} />
            <Route path='/newgroup' element={<NewGroup />} />
            <Route path='/group/:groupId' element={<Group />} />
          </Route>
        </Routes>
      </div>   
    </div>
  )
}

export default App
