import React from 'react'
import logo from '../asset/logo.png';
import { Link } from 'react-router-dom';
import { Shops } from '../pages/Shops';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link className="block hover:opacity-75 transition-opacity" to="/">
      <img src={logo} alt ="JMFC Logo" className="h-14 w-auto ml-20" />
    </Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/players">Players</Link></li>
      <li><Link className="block hover:opacity-75 transition-opacity" to="/vods">Vods</Link></li>
      <li><Link to="/shops">Shops</Link></li>
      <li><Link to="/admin-login">Admin</Link></li>
      <li>
        <details>
          <summary>Community</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li>
              <a href="https://media.discordapp.net/attachments/1379330674879631484/1383742401373405265/image.png?ex=68bf4cc9&is=68bdfb49&hm=8b9f28b5bf94c47735c34af54370fa9655853267eadb15181c44bb667970d911&=&format=webp&quality=lossless&width=1032&height=277"
                target="_blank"
                rel="noopener noreferrer"
                >Discord
                </a>
              </li>
            <li>
              <a href="https://share.google/zQNuEqCCx9Ht09TA8"
                target="_blank"
                rel="noopener noreferrer"
                >
                  Creekside Park
                  </a>
            </li>
          </ul>
        </details>
      </li>
    </ul>
</div></div>
  )
}

export default Navbar;