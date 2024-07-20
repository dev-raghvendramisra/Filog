import React, { useId, useRef } from 'react'
import {BlinkingCursor} from '../../Components'
function Input({ 
   value="",
   onChange = () => { },
   type="email",
   placeholder="set your placeholder !",
   className_container = '',
   className_icon = '',
   className_icon_input_wrapper = '',
   className_input = '',
   errMsg="",
   fill=false
     }) {

     
    const id = useId()
    const [visibility,setVisibility] = React.useState(false);
    const [crypticPass, setCrypticPass] = React.useState("")
    const ref = useRef()

    const getIconClass = () => {
        switch(type) {
          case "email":
            return "fa-regular fa-envelope";
          case "password":
            return "fa-solid fa-lock";
          case "name":
            return "fa-regular fa-circle-user";
          default:
            return "";
        }
      };

      React.useEffect(() => {
        if (type === "password") {
            setCrypticPass(value ? "●".repeat(value.length) : "");
        }
    }, [value, type]);

    return (
        <div id="input-container" className={` ${className_container}`}>
         <label className={`text-blackColor ${fill?"hidden":""}`} htmlFor={id}>{type=="email"?"Email Adress":(type=="password"?"Password":"Name")}</label>
         <div id="input_icon-wrapper" className={`flex justify-center items-center overflow-hidden ${className_icon_input_wrapper}`}>

            <span className={` dark:text-gray-400 dark:opacity-100 text-darkPrimary_grays_darker opacity-70   text-1.3vw p-0.8vw rounded-xl rounded-br-none rounded-tr-none  
             ${getIconClass()}
              ${fill?"bg-gray-100 dark:bg-darkPrimary_grays":"border-black dark:border-white bg-transparent border-l-1 border-t-1 border-b-1 p-1vw"}
              ${errMsg?"border-red-500":""} 
              ${className_icon}`}></span>
            
            <div id="pass-prot" className='relative'>
              <label htmlFor={id} className={`absolute inset-0 overflow-hidden flex justify-start text-0.1vw tracking-widest items-center   p-0.5vw pr-1vw 
                 ${visibility?"inline":"hidden"}
                 ${fill?"bg-gray-100  dark:bg-darkPrimary_grays":"p-0.8vw bg-white dark:bg-darkPrimary border-t-1 border-b-1  border-black dark:border-white"}
                 `} >
                {crypticPass}
                <BlinkingCursor input={ref} />
              </label>
              <input type="text" id={id} ref={ref} value={value} onChange={onChange} placeholder={placeholder} className={`w-16vw bg-gray-100 text-1vw transition-all p-0.7vw pr-0.7vw outline-none rounded-xl rounded-bl-none  rounded-tl-none rounded-tr-none rounded-br-none 
              
                ${fill?"bg-gray-100 dark:bg-darkPrimary_grays":"p-0.9vw border-black dark:border-white bg-transparent border-t-1 border-b-1"}
                ${errMsg?"border-red-500":""} ${className_input}`} />
            </div>
            
           {type=="password"? 
            <div className={`overflow-hidden w-2.5vw h-2.5vw flex justify-center items-center rounded-tr-xl rounded-br-xl bg-gray-100 p-1.45vw
            ${fill?"bg-gray-100 dark:bg-darkPrimary_grays":"border-black dark:border-white bg-transparent border-r-1 border-t-1 border-b-1 p-1.65vw pl-0.7vw"}
            ${errMsg?"border-red-500":""}`}>
            <span className={`${type=="password"?visibility?"fa-regular fa-eye-slash":"fa-regular fa-eye":null} cursor-pointer text-gray-400 text-1.3vw select-none 
            `} onClick={()=>{
                ref.current.focus()
                setVisibility(!visibility)
            }}  >
            </span>
           </div> 
           :<div className={`h-2.5vw w-2.5vw  p-0.5vw pt-1.45vw pb-1.45vw rounded-tr-xl rounded-br-xl ${fill?"bg-gray-100 dark:bg-darkPrimary_grays":" pt-1.65vw pb-1.65vw border-t-1 border-r-1 border-b-1 dark:border-white border-black"}`}> </div>  }
         </div>
         <span id="errMsg">{errMsg?errMsg:""}</span>
        </div>
    )
}

export default Input