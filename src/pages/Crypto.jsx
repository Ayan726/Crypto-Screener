import React from 'react'
import TableComponent from '../components/TableComponent'
import { Outlet } from 'react-router-dom'

function Crypto() {
  return (
    <section className='w-[80%] h-full flex flex-col mt-8 lg:mt-16 mb-24 relative'>
    <TableComponent/>
      <Outlet/>
    </section>
  )
}

export default Crypto
