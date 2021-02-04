import React from 'react';
import playMouseHover from '../js/play-mouse-hover.sound';
import { Link } from 'react-router-dom';


function BtnMenu() {
  return (
    <Link to='/Menu'>
      <div onMouseOver={playMouseHover}>
        Menu
      </div>
    </Link>
  )
}

export default BtnMenu;
