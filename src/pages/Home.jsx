import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import Navig from '../components/Navig'
import { CryptoProvider } from '../context/CryptoContext'
import { TrendingProvider } from '../context/TrendingContext'
import { StorageProvider } from '../context/StorageContext'
function Home() {


  return (
    <CryptoProvider>
    <TrendingProvider>
    <StorageProvider>
    <main className='w-full h-full flex flex-col content-center items-center text-white relative font-nunito'>

    <div className='h-screen w-screen bg-gray-300 fixed -z-10'/>

    <Logo/>
    <Navig/>
    <Outlet/>
    </main>
    </StorageProvider>
    </TrendingProvider>
    </CryptoProvider>
  )
}

export default Home
