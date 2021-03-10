import React from 'react'

function Header({onToggleTheme=f=>f}) {
  return (
    <div className="app__header-box">
      <h1 className="app__header">TODO</h1>
      <div className="switcher-box">
       <span onClick={onToggleTheme} className="switcher light"></span>
       <span onClick={onToggleTheme} className="switcher dark"></span>
      </div>
    </div>
  )
}

export default Header
