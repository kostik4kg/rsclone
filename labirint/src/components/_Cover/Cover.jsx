import React from 'react';
import showMenu from '../js/show-menu.nav';
// import showCover from '../js/show-cover.nav'
import styleObj from './cover.module.scss';

function Cover() {
  return (
    <div className={styleObj.cover} onClick={() => {
      // showMenu();
      // showCover();
    }}></div>   
  )  
}

export default Cover;