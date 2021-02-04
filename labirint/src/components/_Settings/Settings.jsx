import React from 'react';
import go from '../js/go';
import playMouseHover from '../js/play-mouse-hover.sound';
import styleObj from './settings.module.scss'
import { Link } from 'react-router-dom';
import SoundOn from '../_ToggleSound/SoundOffOnn/SoundOn';
import SoundOff from '../_ToggleSound/SoundOffOnn/SoundOff';
import BtnStart from '../_BtnStart/BtnStart';
import BtnMenu from '../_BtnMenu/BtnMenu';


function Settings() {

  return (
    <div className={styleObj.settings}>
      <SoundOn />
      <SoundOff />
      <BtnStart />
      <BtnMenu />
    </div>

  )
}

export default Settings;
