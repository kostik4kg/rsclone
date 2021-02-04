import React from 'react';
import go from '../js/go';
import playMouseHover from '../js/play-mouse-hover.sound';
import { Link } from 'react-router-dom';

function BtnStart() {
  return (
    <Link to='/Start'>
      <div id='Start' onClick={() => go()} onMouseOver={playMouseHover}>
        Start Game
      </div>
    </Link>
  )
}

export default BtnStart;
