import React from 'react';
import showMenu from '../js/show-menu.nav';
import showCover from '../js/show-cover.nav'

function Cover() {
  return (
    <div className="cover cover-shown" onClick={() => {
      showMenu();
      showCover();
    }}></div>   
  )  
}

export default Cover;