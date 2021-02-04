import React from 'react';
import arrowsImg from './arrows.png';
import styleObj from './about.module.scss'
import BtnStart from '../_BtnStart/BtnStart';
import BtnMenu from '../_BtnMenu/BtnMenu';

function About() {
  return (
    <div className={styleObj.about}>
      <div className={styleObj.arrows}>
        <img className={styleObj.arrows} src={arrowsImg} alt="use keyboard arrows" />
      </div>
      <div className={styleObj.text}>
        <p>Use keyboard arrows to move the pathfinder.</p>
        <p>Use keyboard button "S" to set speed of the hero.</p>
        <p>Your goal is to find exit from the maze.</p>
      </div>
      <BtnStart />
      <BtnMenu />
    </div>
  )
}

export default About;
