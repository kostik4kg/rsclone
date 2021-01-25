import React from 'react';
import showMenu from '../js/show-menu.nav';
import showCover from '../js/show-cover.nav';

function Header() {
  return (
    <header className="header">
      <div className="header__menu" onClick = {() => {
        showMenu();
        showCover();
        }}>
        -= MENU =-
      </div>
    </header>
  )
}

export default Header;