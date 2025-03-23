import React from 'react'
import { Form, Button, FeedbackMessage as Error, GenToast } from '../../components'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setPassword, setName, setIsValidate } from '../../store/formSlice';
import { authServices } from '../../services';
import {startAuthentication, authErrHandler} from '../../utils';
import conf from '../../conf/conf';



export default function SignUp() {
  const [formErr, setFormErr] = React.useState("");
  const formRef = React.useRef(null)
  const {isValidated,email,name,userName,password} = useSelector((state)=>state.formData)
  const [loading, setLoading] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = ()=>{
    setDisabled(true)
    const event = new Event("submit", { bubbles: true })
    formRef.current ? formRef.current.dispatchEvent(event) : null
}


  React.useEffect(()=>{
        const initiateSignup = async()=>{
            setLoading(true)
            dispatch(setIsValidate(false))

            try {
              const signUpRes = await authServices.createAccount({email,name,userName,password})
              const singupErr = authErrHandler({
                res:signUpRes
              })  
              if(singupErr.occured){
                throw singupErrCheck.errMsg
              }
              const loginRes = await authServices.login(email,password)
              const loginErr = authErrHandler({res:loginRes})
              if(loginErr.occured){
                throw loginErr.message
              }
              const res = await startAuthentication({dispatch,navigate,setEmail,setName,setPass:setPassword})
              if(res.code!==200){
                throw res.message
              }
            } catch (error) {
              setFormErr(error)
            }finally{
              setLoading(false)
            }
          }
     if(isValidated){
      initiateSignup()
     }     
    
  },[isValidated])




  return (

    <Form type="signup"
      formRef={formRef}
      heading={`Let's get started  🚀`}
      subHeading='Enter your preffered credenetials to create your account'
      loading={loading}
      buttonComponent={
        <div className='w-100p text-center flex flex-col items-center'>
          <Button primary disabled={disabled} wide className='w-70p overflow-hidden transition-all' onClick={handleSubmit}>
            Signin
          </Button >
          <Button outline  wide className='w-70p mt-4p overflow-hidden transition-all' onClick={()=>location.href=conf.AUTH_API_OAUTH_GOOGLE_ENDPOINT}>
          <img className='w-1.6vw pr-2' src="/icons/google-icon.webp" />
          Signin with google
          </Button>
          <Error  className="transition-all justify-center mt-4p" >{formErr}</Error>
          <NavLink to="/login" className='mt-4p w-100p cursor-pointer text-0.8vw text-gray-600 dark:text-white ' >
            Already have an account ?
            <span className="underline-offset-2 underline text-primary ml-2p">
              Login
            </span>
          </NavLink>
        </div>
  } />
  )
}

