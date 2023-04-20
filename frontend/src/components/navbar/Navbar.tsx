import React from 'react'
import style from './navbar.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
  const logedIn: boolean = useSelector((state: {[k: string]: any}) => state.user.logedIn)
  const username: boolean = useSelector((state: {[k: string]: any}) => state.user.username)
  console.log(logedIn)
  console.log(username)

  return (
    <nav className={style.navbar}>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <ul className={ style.list }>
        { !logedIn ? <li><Link to='login'>Login</Link></li> : <li>{username}</li> }
      </ul>
    </nav>
  )
}

export default Navbar