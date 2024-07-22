import React from 'react'
import { Form, Button, Error } from '../../Components'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authServices } from '../../backend-services';
import { setEmail, setIsValidate, setPassword } from '../../store/formSlice';
import { useNavigate } from 'react-router-dom';



function Login() {
  const [formErr, setFormErr] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const formRef = React.useRef(null)
  const {isValidated,email,password} = useSelector((state)=>state.formData)
  const dispatchChange = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async()=>{
      const event = new Event("submit", { bubbles: true })
      formRef.current ? formRef.current.dispatchEvent(event) : null
     
  }

  React.useEffect(()=>{
   async function createSession(){

    if(isValidated){
     setLoading(true)
     var res = await authServices.login(email,password);
    //  console.log(`message:${res.message},type:${res.type},code:${res.code},name:${res.name}`);
    //  console.log(Object.keys(res))
      dispatchChange(setIsValidate(false))

      if(res.code=="401"){
       setFormErr("Invalid user credentials")
      }
      else if(res.code=='429'){
        setFormErr("Too many attempts, please try after sometime !")
        setTimeout(()=>{
          navigate("/");
          dispatchChange(setEmail(""));
          dispatchChange(setPassword(""));
        },7000);
      }
      else if(res.$id){
           //useAuth to authenticate user
           setFormErr("")
           dispatchChange(setEmail(""))
           dispatchChange(setPassword(""))
       }
      }
      setLoading(false)
    }
    createSession()
  },[isValidated])

  return (



    <Form type="login"
      formRef={formRef}
      heading='Welcome back 👋 '
      subHeading='Enter your credentials to login your account'
      buttonComponent={
        <div className='w-100p text-center flex flex-col items-center'>
         {/* <button onClick={()=>{authServices.logout()}}>logout</button> */}
          <Button primary loading={loading?true:false} className='w-70p overflow-hidden transition-all' onClick={
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

export default Login
