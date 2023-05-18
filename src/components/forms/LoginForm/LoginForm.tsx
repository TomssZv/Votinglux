import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../../../redux/slice/user';
import { useSelector } from 'react-redux';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (useSelector((state: {[k: string]: any}) => state.user.logedIn)) {
    return <Navigate to={'/home'} />
  }
  
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    axios.post('http://localhost:3000/login', {
      email: email,
      password: password 
    }, {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then((response: {[k: string]: any}) => {
      dispatch(addData(
        {
          username: response.data.username,
          admin: response.data.admin,
          logedIn: true
        }
      ))
      return navigate('/home');
    })
    .catch((error: object) => {
      console.log(error);
    });
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h1 className='form-title'>Login</h1>
        <div className='form-body'>
          <div className='field'>
            <div className='field-title'>Email</div>
            <input className='field-input' value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div className='field'>
            <div className='field-title'>Password</div>
            <input className='field-input' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
        </div>
        <button className='submit-btn login-btn' type='submit' >Login</button>
        <p className='register'>Don't have a account? <Link to='/register' >create here</Link></p>
      </form>
    </div>
  )
}

export default LoginForm