import React from 'react'
import {Footer, Navbar} from './Components'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'material-symbols/outlined.css';

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
   <Navbar />
   <div className='min-h-56vh'>
    <Outlet />
   </div>
    <Footer />
    </>
    
  )
}

export default App