import React from 'react'
import style from './navbar.module.scss'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className={style.navbar}>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <ul className={ style.list }>
        <li><Link to='login'>Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar