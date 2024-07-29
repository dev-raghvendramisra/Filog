import React from 'react'
import { Outlet } from 'react-router-dom'
import { authServices} from '../../backend-services';
import toast from 'react-hot-toast';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const {isUserLoggedIn,userData} = useSelector((state)=>state.auth)
  const navigate = useNavigate()
   
  React.useEffect(()=>{
    if(!isUserLoggedIn){
      navigate("/login")
   }
  },[])



  return (
    <div>Dashboard
               <button onClick={()=>{
          authServices.logout();
          toast(`Bye, ${userData.name}`, {
            icon: '👋',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          }}>logout</button>
      <Outlet/>
    </div>
  )
}

export default Dashboard