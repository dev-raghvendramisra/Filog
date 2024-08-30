import React from 'react'
import { Form, Button, Error } from '../../components'
import { Navigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authServices } from '../../services';
import { setEmail, setIsValidate, setPassword } from '../../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { login, logout, setFetching } from '../../store/authSlice';
import {startAuthentication} from '../../utils';
import { errHandler } from '../../utils';
import getUserProfile from '../../utils/getUserProfile';
import { clearProfile, setProfile } from '../../store/userProfileSlice';




export default function Login() {
  const [formErr, setFormErr] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const formRef = React.useRef(null)
  const {isValidated,email,password} = useSelector((state)=>state.formData)
  const {isUserLoggedIn} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async()=>{
      const event = new Event("submit", { bubbles: true })
      formRef.current ? formRef.current.dispatchEvent(event) : null
     
  }

  React.useEffect(()=>{
    const startLoginSequence = async()=>{
       if(isValidated){
           setLoading(true);
           dispatch(setIsValidate(false)); //setting the validation false to avoid back to back requests with same credentials
           const sessionInitRes = await  authServices.login(email,password)
           const didErrOccured = errHandler({
            res:sessionInitRes,
            dispatch:dispatch,
            navigate:navigate,
            setEmail:setEmail,
            setPass:setPassword,
            setErr:setFormErr,
           })

           if(didErrOccured){
            console.log("An error occured") 
           }
           else if(sessionInitRes.$id){
             const authRes = await startAuthentication({//calling the strtauthentication util to verify the session and retreive the user details
               dispatch:dispatch,
               login:login,
               logout:logout,
               setFetching:setFetching,
               setEmail:setEmail,
               setPass:setPassword,
               navigate
             })
             
             if(authRes.message){
               setFormErr(authRes.message)
             }
             if(authRes.$id){
              await getUserProfile({userId:authRes.$id,dispatch,setProfile,clearProfile})
             }

           }

           setLoading(false)
       }
    }
    startLoginSequence()
    },[isValidated])


  if(isUserLoggedIn){
    return <Navigate to="/dashboard" />
  }
  else return (



    <Form type="login"
      formRef={formRef}
      heading='Welcome back 👋 '
      subHeading='Enter your credentials to login your account'
      loading={loading}
      buttonComponent={
        <div className='w-100p text-center flex flex-col items-center'>

          <Button primary wide className='w-70p overflow-hidden transition-all' onClick={
           handleSubmit
          }>
            Login
          </Button >
          <Error errMsg={formErr} className="transition-all justify-center mt-4p" />
          <NavLink to="/" className='mt-16p w-100p text-0.8vw text-gray-600 dark:text-footer_text ' >
            Forgot password ?
            <span className="underline-offset-2 underline text-primary ml-2p">
              Reset pass
            </span>
          </NavLink>
          <span className='mt-1p w-100p text-0.8vw underline text-gray-600 dark:text-footer_text' >Or</span>

          <NavLink to="/signup" className="mt-1p text-0.8vw transition-all hover:underline-offset-2 hover:underline hover:text-primary ml-2p" >
            Create Account
          </NavLink>

        </div>
  } />



  )
}


