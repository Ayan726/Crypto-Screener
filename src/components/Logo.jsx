import React from 'react'
import { Link } from 'react-router-dom'
import logosvg from '../assets/logo.svg'
function Logo() {
  return (
      <Link className='absolute top-[1.5rem] left-[1.5rem] [text-decoration: none] text-lg flex items-center text-cyan' to='/'>
        <img src={logosvg} alt="Crypto-logo" />
        <span>CryptoBucks</span>
      </Link>

  )
}

export default Logo
