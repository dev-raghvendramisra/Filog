import React from 'react'
import { Form, Button, FeedbackMessage as Error } from '../../components'
import { Navigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authServices } from '../../services';
import { setEmail, setIsValidate, setPassword } from '../../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { login, logout, setFetching } from '../../store/authSlice';
import {startAuthentication} from '../../utils';
import { authErrHandler } from '../../utils';
import { useSecureLoginModal } from '../../hooks';
import conf from '../../conf/conf';




export default function Login() {
  const [formErr, setFormErr] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [isPassModalOpen, setIsPassModalOpen] = React.useState("")
  const formRef = React.useRef(null)
  const [disabled, setDisabled] = React.useState(false)
  const {isValidated,email,password} = useSelector((state)=>state.formData)
  const {isUserLoggedIn} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = ()=>{
      setDisabled(true)
      const event = new Event("submit", { bubbles: true })
      formRef.current ? formRef.current.dispatchEvent(event) : null
  }

  React.useEffect(()=>{
    const startLoginSequence = async()=>{
       if(isValidated){
           try {
            setLoading(true);
           dispatch(setIsValidate(false)); 
           const sessionInitRes = await  authServices.login(email,password)
           const sessionErr = authErrHandler({res:sessionInitRes})
           if(sessionErr.occured){
              throw sessionErr.errMsg
           }
           const authRes = await startAuthentication({ dispatch,setEmail, setPass:setPassword, navigate })
           if(authRes.code!==200){
             throw authRes.message
           }
           } catch (error) {
             setFormErr(error)
           } finally{
            setLoading(false)
           }
       }
    }
    startLoginSequence()
    },[isValidated])

  const openPassModal = useSecureLoginModal(()=>setIsPassModalOpen(false))

  const openModal = (val) =>{
     setIsPassModalOpen(val)
     openPassModal(val)
  }

  if(isUserLoggedIn){
    return <Navigate to="/dashboard" />
  }
  else return (



    <Form type="login"
      style={isPassModalOpen ? {marginTop:"0",paddingTop:"12vh"} : {marginTop:"12vh",paddingTop:"0"}}
      formRef={formRef}
      heading='Welcome back 👋 '
      subHeading='Enter your credentials to login your account'
      loading={loading}
      buttonComponent={
        <div className='w-100p text-center flex flex-col items-center'>

          <Button primary wide disabled={disabled} className='w-70p overflow-hidden transition-all' onClick={
           handleSubmit
          }>
            Login
          </Button >
          <Button outline  wide className='w-70p mt-4p overflow-hidden transition-all' onClick={()=>location.href=conf.AUTH_API_OAUTH_GOOGLE_ENDPOINT}>
          <img className='w-1.6vw pr-2' src="/icons/google-icon.webp" />
          Login with google
          </Button>
          <Error  className="transition-all justify-center mt-4p" >{formErr}</Error>
          <NavLink className='mt-16p w-100p text-0.8vw text-gray-600 dark:text-footer_text ' >
            Forgot password ?
            <button onClick={()=>openModal(true)} className="underline-offset-2 underline text-primary ml-2p">
              Reset pass
            </button>
          </NavLink>
          <span className='mt-1p w-100p text-0.8vw underline text-gray-600 dark:text-footer_text' >Or</span>

          <NavLink to="/signup" className="mt-1p text-0.8vw transition-all hover:underline-offset-2 hover:underline hover:text-primary ml-2p" >
            Create Account
          </NavLink>

        </div>
  } />



  )
}


