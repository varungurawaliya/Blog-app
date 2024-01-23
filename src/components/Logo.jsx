import React from 'react'
import logo from './Logo.gif'

function Logo({width, height}) {
  return (
  <img src={logo} alt="logo" className={`h-9 rounded-xl ${width} ${height}`} />  
  )
}

export default Logo