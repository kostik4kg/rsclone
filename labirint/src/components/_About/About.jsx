import React from 'react';
import go from '../js/go';
import playMouseHover from '../js/play-mouse-hover.sound';
import styleObj from './about.module.scss'
import { Link } from 'react-router-dom';


function About() {
  const menuItems =
    [
      { id: 'Start', title: 'Start game', listener: () => { go(); } },
      { id: 'Menu', title: 'Menu' }
    ]

  return (
    <section className={`${styleObj.menu} ${styleObj.menu_shown}`}>
      { menuItems.map(item => {
        return <MenuItem props={item} key={item.id} />
      })}
    </section>
  )
}

function MenuItem({ props }) {
  return (
    <Link to={props.id}>
      <div id={props.id} onClick={props.listener} onMouseOver={playMouseHover}>
        {props.title}
      </div>
    </Link>

  )
}

export default About;
