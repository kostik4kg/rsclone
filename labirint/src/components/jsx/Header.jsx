import React from 'react';
import showMenu from '../js/show-menu.nav';
import showCover from '../js/show-cover.nav';
import playMouseHover from '../js/play-mouse-hover.sound';

function Header() {
  return (
    <header className="header">
      <div className="header__menu" onClick = {() => {
        showMenu();
        showCover();
        }} onMouseOver={playMouseHover}>
        -= MENU =-
      </div>
    </header>
  )
}

export default Header;