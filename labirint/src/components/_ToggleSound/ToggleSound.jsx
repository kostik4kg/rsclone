import React from 'react';
import go from '../js/go';
import playMouseHover from '../js/play-mouse-hover.sound';
import { Link } from 'react-router-dom';
import SoundOff from './SoundOffOnn/SoundOff';
import SoundOn from './SoundOffOnn/SoundOn';
import styleObj from './ToggleSound.module.scss';

function ToggleSound() {
  return (

    <div className={styleObj.sound} onMouseOver={playMouseHover}>
      <SoundOff />
      <SoundOn />
    </div>

  )
}

export default ToggleSound;
