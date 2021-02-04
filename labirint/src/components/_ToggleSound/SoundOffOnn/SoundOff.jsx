import React from 'react';
import playMouseHover from '../../js/play-mouse-hover.sound';
import { Link } from 'react-router-dom';

function SoundOff() {
  return (

    <div className='material-icons' onClick={() => { console.log('of') }} onMouseOver={playMouseHover}>
      volume_up
    </div>

  )
}

export default SoundOff;
