import React from 'react'
import {Navbar} from './Components'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='flex justify-center items-center h-screen w-screen'><Navbar />
    <Outlet />
    </div>
  )
}

export default App