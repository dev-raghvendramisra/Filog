import React from 'react'
import {Navbar} from './Components'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Outlet } from 'react-router-dom'
import Button from './Components/Button';

function App() {
  return (
    <>
   <Navbar />
    <Outlet />
    <Button disabled />
    </>
    
  )
}

export default App