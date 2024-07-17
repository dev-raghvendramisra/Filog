import React from 'react'
import {Navbar} from './Components'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
   <Navbar />
    <Outlet />
    </>
    
  )
}

export default App