import React, { useState, useRef } from 'react'
import style from './navbar.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Navbar() {
  const [activeLogout, setActiveLogout] = useState(false);

  const logedIn: boolean = useSelector((state: {[k: string]: any}) => state.user.logedIn)
  const username: string = useSelector((state: {[k: string]: any}) => state.user.username)
  const logout = useRef(null)

  const handleLogout = () => {
    console.log('logout')
    axios.delete('http://localhost:3000/logout')
    .then(result => location.reload())
    .catch(err => console.log(err))
  }

  const logoutMenu = (e: any) => {
    if (logout.current && activeLogout && !logout.current.contains(e.target)) {
      setActiveLogout(false)
    }
  }

  document.addEventListener('mousedown',logoutMenu)

  return (
    <nav className={style.navbar}>
      <div className={style.navigateLinks}>
        <Link to={logedIn ? '/home' : '/'}>Home</Link>
        <div className={style.navigateLink}>
          <Link to={'/newgroup'}>create group</Link>
        </div>
      </div>
      <ul className={ style.list } ref={logout}>
        { !logedIn ? <li><Link to='login'>Login</Link></li> :
        <>
          <li className={style.username} onClick={(e) => setActiveLogout(!activeLogout)}>
            {username}
          </li>
          <button className={activeLogout ? style.logout : style.hide} type='submit' onClick={() => {handleLogout()}}>Logout</button>
        </> 
         }
      </ul>
    </nav>
  )
}

export default Navbar