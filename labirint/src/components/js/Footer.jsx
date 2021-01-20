import React from 'react';
import logo from './../img/logo-rs.png'

function  Footer() {
    return (
      <footer className="footer">
        <div className="footer__logo">
          <a href="https://rs.school/">
            <img src={logo} alt="logo"/>
          </a>
        </div>
        <div className="footer__links">
          <a href="https://github.com/kostik4kg">kostik4kg</a>
          <a href="https://github.com/friedooo">friedooo</a>
          <a href="https://github.com/cootook">cootook</a>
        </div>
        <div className="footer__year">2021</div>
      </footer>
    );
  }
  

  export default Footer;