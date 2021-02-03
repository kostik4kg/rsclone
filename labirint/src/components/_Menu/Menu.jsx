import React from 'react';
import showMenu from '../js/show-menu.nav';
// import showCover from '../js/show-cover.nav';
import playMouseHover from '../js/play-mouse-hover.sound';
import styleObj from './menu.module.scss'


function Menu() {
  const menuItems = [
    {id: 'Start', title: 'Start game', listener: () => {
      showMenu();
      // showCover();
    }},
    {id: 'Settings', title: 'Settings'},
    {id: 'About', title: 'About'}
  ]
    return (
      <section className={`${styleObj.menu} ${styleObj.menu_shown}`}>
          { menuItems.map(item => {
            return <MenuItem props={item} key={item.id}/>
          }) }
      </section>
    )
  }
  
  function MenuItem({props}) {
    return (
      //<a href={props.id}>
        <div id={props.id} onClick={props.listener} onMouseOver={playMouseHover}>
        {props.title}
         </div>
      //</a>
      
    )
  }
  


  export default Menu;