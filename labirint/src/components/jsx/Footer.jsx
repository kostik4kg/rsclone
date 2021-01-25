import React from 'react';
import logo from './../img/logo-rs.png';
import playMouseHover from '../js/play-mouse-hover.sound';

function  Footer() {
    return (
      <footer className="footer">
        <div className="footer__logo">
          <a href="https://rs.school/" onMouseOver={playMouseHover}>
            <img src={logo} alt="logo"/>
          </a>
        </div>
        <div className="footer__links">
          <a href="https://github.com/kostik4kg" onMouseOver={playMouseHover}>kostik4kg</a>
          <a href="https://github.com/friedooo" onMouseOver={playMouseHover}>friedooo</a>
          <a href="https://github.com/cootook" onMouseOver={playMouseHover}>cootook</a>
        </div>
        <div className="footer__year">2021</div>
      </footer>
    );
  }
  

  export default Footer;