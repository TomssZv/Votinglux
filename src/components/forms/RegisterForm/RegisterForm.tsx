import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addData } from '../../../redux/user';
import { Dispatch } from 'redux';

function RegisterForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const dispatch: Dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  function validInput(): boolean {
    if (password !== confPassword) {
      return false
    }
    return true
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!validInput) return

    axios.post('http://localhost:3000/register', {
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
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
        <h1 className='form-title'>Register</h1>
        <div className='form-body'>
          <div className='double'>
            <div className='field'>
              <div className='field-title'>Name</div>
              <input value={name} onChange={(e) => setName(e.target.value)} className='field-input'></input>
            </div>
            <div className='field'>
              <div className='field-title'>Surname</div>
              <input value={surname} onChange={(e) => setSurname(e.target.value)} className='field-input'></input>
            </div>
          </div>
          <div className='field'>
            <div className='field-title'>Username</div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className='field-input'></input>
          </div>
          <div className='field'>
            <div className='field-title'>Email</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='field-input'></input>
          </div>
          <div className='field'>
            <div className='field-title'>Passwords</div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='field-input' type='password'></input>
          </div>
          <div className='field'>
            <div className='field-title'>Confirm password</div>
            <input value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className='field-input' type='password'></input>
          </div>
        </div>
        <button className='submit-btn register-btn' type='submit'>Sing up</button>
        <p className='register'>Already have a account? <Link to='/login' >login here</Link></p>
      </form>
    </div>
  )
}

export default RegisterForm