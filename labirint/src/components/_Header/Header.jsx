import React from 'react';
import playMouseHover from '../js/play-mouse-hover.sound';
import styleObj from './header.module.scss'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styleObj.header}>
      <div className={styleObj.header__menu} onMouseOver={playMouseHover}>
        <Link to="/Menu" id="Menu"> -= MENU =- </Link>
      </div>
    </header>
  )
}

export default Header;