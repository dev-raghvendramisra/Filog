
import React from "react";
import { FormValidation, InfinitePogressbar} from "../../Components";


function Form({ formRef, type, buttonComponent, heading = "Welcome back ", subHeading = "Enter your credentials to login your account" ,loading}) {

  return (
    <div id={`${type}-container`} 
    className='h-100vh w-100p  flex justify-center items-start' 
    style={{ paddingTop: "3.5vh" }}>

      <div id={`${type}-wrapper`}
        className='bg-blue-100 dark:bg-darkPrimary_grays  h-90p w-70p relative  justify-center flex items-center   rounded-3xl overflow-hidden '>
       
       {loading?<InfinitePogressbar />:null} 
       
         
        <div id="img-container"
          className='h-100p pr-2p pl-4p flex items-center  ' >
          <img className='' src="/Login-ill.png" alt="login" />
        </div>

        <div id="form-container"
          className='flex flex-col justify-start items-center h-100p rounded-2xl bg-white dark:bg-darkPrimary  pl-8p pr-8p pt-18p formShadow'>
          <h1 id="form-heading"
            className='text-1.6vw'
            style={{ fontWeight: "600" }} > 
            {heading}
          </h1>
          <p className='text-0.8vw text-darkPrimary_grays mb-4p dark:text-footer_text '>{subHeading}</p>
          <FormValidation className="mt-2p transition-all" type={type} ref={formRef} />

          <div id="button-wrapper" className='w-90p '>
            {buttonComponent}
          </div>
        </div>

      </div>
    </div>

  )
}

export default Form

// password, setPassword, email, setEmail,name, setName,

//email={email} password={password} setPassword={setPassword} setEmail={setEmail} name={name} setName={setName}