import React from 'react';
import showMenu from '../js/show-menu.nav';

function Header() {
  return (
    <header className="header">
      <div className="header__menu" onClick = {showMenu}>
        -= MENU =-
      </div>
    </header>
  )
}

export default Header;