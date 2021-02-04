import React from 'react';
import playMouseHover from '../../js/play-mouse-hover.sound';
import { Link } from 'react-router-dom';
import toggleSound from '../../js/toggleSound';

function SoundOff() {
  return (

    <div id='soundOffBtn' className={`material-icons disabledElement`} onClick={() => { toggleSound() }} onMouseOver={playMouseHover}>
      volume_up
    </div>

  )
}

export default SoundOff;
