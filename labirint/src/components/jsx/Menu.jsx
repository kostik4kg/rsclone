import React from 'react';
import showMenu from '../js/show-menu.nav';
import showCover from '../js/show-cover.nav';
import playMouseHover from '../js/play-mouse-hover.sound';


function Menu() {
  const menuItems = [
    {id: 'Start', title: 'Start game', listener: () => {
      showMenu();
      showCover();
    }},
    {id: 'Settings', title: 'Settings'},
    {id: 'About', title: 'About'}
  ]
    return (
      <section className="menu menu-shown">
          { menuItems.map(item => {
            return <MenuItem props={item} key={item.id}/>
          }) }
      </section>
    )
  }
  
  function MenuItem({props}) {
    return (
      <div id={props.id} onClick={props.listener} onMouseOver={playMouseHover}>
        {props.title}
      </div>
    )
  }
  


  export default Menu;