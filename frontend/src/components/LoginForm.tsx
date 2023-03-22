import { Link } from 'react-router-dom'

function LoginForm() {
  return (
    <div className='form-container'>
      <form>
        <h1 className='form-title'>Login</h1>
        <div className='field'>
          <div className='field-title'>Email</div>
          <input className='field-input'></input>
        </div>
        <div className='field'>
          <div className='field-title'>Passwords</div>
          <input className='field-input'></input>
        </div>
        <button>Login</button>
        <p className='register'>Don't have a account? <Link to='/register' >create here</Link></p>
      </form>
    </div>
  )
}

export default LoginForm