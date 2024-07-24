import React from 'react'
import { Form, Button, Error } from '../../Components'
import { NavLink } from 'react-router-dom'


function Login() {
  const [formErr, setFormErr] = React.useState("");
  const formRef = React.useRef(null)


  return (



    <Form type="login"
      formRef={formRef}
      heading='Welcome back 👋 '
      subHeading='Enter your credentials to login your account'
      buttonComponent={
        <div className='w-100p text-center flex flex-col items-center'>

          <Button primary className='w-70p overflow-hidden transition-all' onClick={
            (handleSubmission) => {
              const event = new Event("submit", { bubbles: true })
              console.log(formRef.current)
              formRef.current ? formRef.current.dispatchEvent(event) : null
            }
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

export default Login
