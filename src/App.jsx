import React from 'react'
import {Navbar} from './Components'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='flex flex-col justify-start pt-3 items-center h-screen w-screen '><Navbar />
    <Outlet />
    </div>
  )
}

export default App