import React from 'react';


function Menu() {
  const menuItems = [
    {id: 'Start', title: 'Start game', listener: () => { alert(1)}},
    {id: 'Settings', title: 'Settings'},
    {id: 'About', title: 'About'}
  ]
    return (
      <section className="menu">
          { menuItems.map(item => {
            return <MenuItem props={item} key={item.id}/>
          }) }
      </section>
    )
  }
  
  function MenuItem({props}) {
    return (
      <div id={props.id} onClick={props.listener}>
        {props.title}
      </div>
    )
  }
  


  export default Menu;