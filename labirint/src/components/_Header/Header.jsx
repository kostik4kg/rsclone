import React from 'react';
import showMenu from '../js/show-menu.nav';
// import showCover from '../js/show-cover.nav';
import playMouseHover from '../js/play-mouse-hover.sound';
import styleObj from './header.module.scss'

function Header() {
  return (
    <header className={styleObj.header}>
      <div className={styleObj.header__menu} onClick = {() => {
        // showMenu();
        // showCover();
        }} onMouseOver={playMouseHover}>
        <a href="/menu"> -= MENU =- </a>
      </div>
    </header>
  )
}

export default Header;