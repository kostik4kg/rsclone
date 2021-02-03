import React from 'react';
import go from '../js/go';
// import showCover from '../js/show-cover.nav';
import playMouseHover from '../js/play-mouse-hover.sound';
import styleObj from './menu.module.scss'
import { Link, BrowserRouter as Router  } from 'react-router-dom';


function Menu() {
  const menuItems = [
    {id: 'Start', title: 'Start game', listener: () => {
      go();
      // showCover();
       }
    },
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
      <Link to={props.id}>
        <div id={props.id} onClick={props.listener} onMouseOver={playMouseHover}>
        {props.title}
         </div>
      </Link>
      
    )
  }
  


  export default Menu;