import React from 'react'
import { Form, Error } from '../../Components'
import {Button} from '../../Components';

function Login() {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [formErr, setFormErr] = React.useState("");
  const formRef = React.useRef(null)
  

  return (
    <div id="login-container" className='h-100vh w-100p  flex justify-center items-start' style={{paddingTop:"3.5vh"}}>

      <div id="login-wrapper" 
      className='bg-blue-100 dark:bg-darkPrimary_grays  h-90p w-70p   justify-center flex items-center   rounded-3xl overflow-hidden '>

      <div id="img-container" 
      className='h-100p pr-2p pl-4p flex items-center  ' >
        <img className='' src="/Login-ill.png" alt="login" />
       </div>

      <div id="form-container" 
      className='flex flex-col justify-start items-center h-100p rounded-2xl bg-white dark:bg-darkPrimary  pl-8p pr-8p pt-18p formShadow'>
        <h1 id="form-heading" 
        className='text-1.6vw' 
        style={{fontWeight:"600"}} > Welcome back <span className='text-1.7vw pl-0.2vw'>👋</span></h1>
        <p className='text-0.8vw text-darkPrimary_grays mb-4p dark:text-footer_text '>Enter your credentials to login your account</p>
        <Form className="mt-2p transition-all" type='login' email={email} password={password}  setPassword={setPassword} setEmail={setEmail} setFormErr={setFormErr} ref={formRef} />

        <div id="button-wrapper" className='w-40p overflow-hidden'>
          <Button primary  className='w-100p transition-all' onClick={
            ()=>{
              const event = new Event("submit",{bubbles:true})
              console.log(formRef.current)
              formRef.current?formRef.current.dispatchEvent(event):null
            }
          }>
            Login
          </Button>
        </div>
        <Error errMsg={formErr}  className="transition-all justify-center mt-4p" /> 
      </div>

    </div>
    </div>

  )
}

export default Login
