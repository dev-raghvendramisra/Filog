import React from 'react'
import { Outlet } from 'react-router-dom'
import { authServices} from '../../backend-services';
import { setAlert } from '../../store/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const dispatch = useDispatch()
  const {isUserLoggedIn,userData} = useSelector((state)=>state.auth)
  const navigate = useNavigate()
   
  React.useEffect(()=>{
    if(!isUserLoggedIn){
      navigate("/login",{replace:true})
   }
  },[])



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