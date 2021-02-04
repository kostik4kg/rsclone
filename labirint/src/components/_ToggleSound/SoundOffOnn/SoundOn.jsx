import React from 'react';
import playMouseHover from '../../js/play-mouse-hover.sound';
import { Link } from 'react-router-dom';

function SoundOn() {
  return (

    <div className='material-icons' onClick={() => { console.log('on') }} onMouseOver={playMouseHover}>
      volume_off
    </div>

  )
}

export default SoundOn;
