import React from 'react'
import style from './navbar.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
  const logedIn: boolean = useSelector((state: {[k: string]: any}) => state.user.logedIn)
  const username: string = useSelector((state: {[k: string]: any}) => state.user.username)

  return (
    <nav className={style.navbar}>
      <div className={style.navigateLinks}>
        <Link to={logedIn ? '/home' : '/'}>Home</Link>
        <div className={style.navigateLink}>
          <Link to={'/newgroup'}>create group</Link>
        </div>
      </div>
      <ul className={ style.list }>
        { !logedIn ? <li><Link to='login'>Login</Link></li> : <li>{username}</li> }
      </ul>
    </nav>
  )
}

export default Navbar