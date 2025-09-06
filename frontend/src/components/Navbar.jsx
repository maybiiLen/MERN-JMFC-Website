import React from 'react'
import logo from '../asset/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="block hover:opacity-75 transition-opacity"><img src={logo} alt ="JMFC Logo" className="h-14 w-auto ml-20" /></a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a>Players</a></li>
      <li><a>Vods</a></li>
      <li><a>Shops</a></li>
      <li><a>Admin</a></li>
      <li>
        <details>
          <summary>Community</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><Link to="/discord">Discord</Link></li>
            <li><Link to="/creekside-park">Creekside Park</Link></li>
          </ul>
        </details>
      </li>
    </ul>
</div></div>
  )
}

export default Navbar;