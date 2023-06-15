import React from 'react'
import { NavLink } from 'react-router-dom'

function Navig() {
  return (
    <nav className='lg:w-[40%] w-[80%] mt-24 flex justify-around items-center gap-4 border border-cyan rounded-lg p-3 font-semibold text-sm sm:text-base'>
    
      <NavLink to='/' end className={
        ({isActive}) => {
          return `${isActive ? 'bg-cyan text-gray-300' : ' hover:text-cyan bg-gray-200 text-gray-100'} w-full flex justify-center rounded-md py-[1px] cursor-pointer`
        }
      }>
        Crypto
      </NavLink>

      <NavLink to='/trending' className={
        ({isActive}) => {
          return `${isActive ? 'bg-cyan text-gray-300' : 'hover:text-cyan bg-gray-200 text-gray-100'} w-full flex justify-center rounded-md py-[1px] cursor-pointer`
        }
      }>
        Trending
      </NavLink>

      <NavLink to='/saved' className={
        ({isActive}) => {
          return `${isActive ? 'bg-cyan text-gray-300' : ' hover:text-cyan bg-gray-200 text-gray-100'} w-full flex justify-center rounded-md py-[1px] cursor-pointer`
        }
      }>
        Saved
      </NavLink>
    </nav>
  )
}

export default Navig
