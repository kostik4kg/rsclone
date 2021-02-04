import React from 'react';
import go from '../js/go';
import playMouseHover from '../js/play-mouse-hover.sound';
import styleObj from './settings.module.scss'
import { Link } from 'react-router-dom';


function Settings() {

  return (
    <div className={styleObj.settings}>

      <Link to={'/Start'}>
        <div onMouseOver={playMouseHover}>
          Start
        </div>
      </Link>

      <Link to={'/Start'}>
        <div onMouseOver={playMouseHover}>
          Start
        </div>
      </Link>

      <Link to={'/Start'}>
        <div onMouseOver={playMouseHover}>
          Start
        </div>
      </Link>

    </div>

  )
}

export default Settings;
