import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { login, logout } from './store/authSlice'
import {authServices} from './backend-services'

function App() {
  const [loading, setLoading] = React.useState(true)
  const dispatch = useDispatch()
  const userData = useSelector((state)=>{
     return state.auth
  })
  const fetchdata = async ()=>{
    const res =  await authServices.createAccount({email:"itsraghav12@gmail.com",password:"raghav12", name:"Raghvendra Misra"})
    console.log("res:",res)
    return res;
   
  }

  useEffect(async ()=>{
   
    const res = await fetchdata();
    if(res!==undefined){
      const aRes = await authServices.getLoggedInUser()
      console.log(aRes)
      dispatch(login(aRes))
     
    }
    else{
      dispatch(logout())
    }
    setLoading(false)
 },[])
     
     
  if(loading) return <h1>Loading....</h1>
  else if(userData.isUserLoggedIn){ return (<h1>UserloggeDIn:{
    `${ String(userData.isUserLoggedIn)}\n userName: ${userData.userData.name}\n email: ${userData.userData.email}`
  }</h1>)}

  else{
    return(
      <h1>isUserLoggedIn: {String(userData.isUserLoggedIn)}</h1>
    )
  }
  

}

export default App
