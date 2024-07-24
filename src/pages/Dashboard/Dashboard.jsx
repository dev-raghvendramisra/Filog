import React from 'react'
import { Outlet } from 'react-router-dom'
import { authServices} from '../../backend-services';
import { setAlert } from '../../store/alertSlice';
import { useDispatch, useSelector } from 'react-redux';


function Dashboard() {
  const dispatch = useDispatch()
  const {userData} = useSelector((state)=>state.auth)
  return (
    <div>Dashboard
               <button onClick={()=>{
          authServices.logout();
          dispatch(setAlert({type:"welcome",message:`Bye, ${userData.name}`}))
          }}>logout</button>
      <Outlet/>
    </div>
  )
}

export default Dashboard