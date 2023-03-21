import React from 'react'
import style from './navbar.module.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className={style.navbar}>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <ul className={ style.list }>
        <li><Link to='login'>Login</Link></li>
        <li><Link to='register'>Register</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar