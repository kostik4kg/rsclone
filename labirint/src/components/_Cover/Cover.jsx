import React from 'react';
import go from '../js/go';
import styleObj from './cover.module.scss';

function Cover() {
  return (
    <div className={styleObj.cover} onClick={() => {go();}}></div>   
  )  
}

export default Cover;