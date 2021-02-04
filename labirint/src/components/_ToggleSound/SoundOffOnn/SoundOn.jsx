import React from 'react';
import playMouseHover from '../../js/play-mouse-hover.sound';
import { Link } from 'react-router-dom';
import toggleSound from '../../js/toggleSound';

function SoundOn() {
  return (

    <div id='soundOnBtn' className={`material-icons enabledElement`} onClick={() => { toggleSound() }} onMouseOver={playMouseHover}>
      volume_off
    </div>

  )
}

export default SoundOn;
