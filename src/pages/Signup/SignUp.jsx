import React from 'react'
import { Form, Button, Error } from '../../Components'
import { NavLink } from 'react-router-dom'

function SignUp() {
  const [formErr, setFormErr] = React.useState("");
  const formRef = React.useRef(null)


  return (

    <Form type="signup"
      formRef={formRef}
      heading={`Let's get started  🚀`}
      subHeading='Enter your preffered credenetials to create your account'
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

export default SignUp
