import { Link } from 'react-router-dom'

function RegisterForm() {
  return (
    <div className='form-container'>
      <form>
        <h1 className='form-title'>Register</h1>
        <div className='double'>
          <div className='field'>
            <div className='field-title'>Name</div>
            <input className='field-input'></input>
          </div>
          <div className='field'>
            <div className='field-title'>Name</div>
            <input className='field-input'></input>
          </div>
        </div>
      
        <div className='field'>
          <div className='field-title'>Email</div>
          <input className='field-input'></input>
        </div>
        <div className='field'>
          <div className='field-title'>Passwords</div>
          <input className='field-input'></input>
        </div>
        <button>Login</button>
        <p className='register'>Already have a account? <Link to='/login' >login here</Link></p>
      </form>
    </div>
  )
}

export default RegisterForm