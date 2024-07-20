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
         <label className="text-blackColor" htmlFor={id}>{type=="email"?"Email Adress":(type=="password"?"Password":"Name")}</label>
         <div id="input_icon-wrapper" className={`flex justify-center items-center overflow-hidden ${className_icon_input_wrapper}`}>

            <span className={`bg-gray-100 text-gray-400 text-1.3vw p-0.6vw rounded-xl rounded-br-none rounded-tr-none border-gray-200 border-r-4 
             ${getIconClass()}
            ${className_icon}`}></span>
            
            <div id="pass-prot" className='relative'>
              <label htmlFor={id} className={`absolute inset-0 overflow-hidden flex justify-start text-0.1vw tracking-widest items-center bg-gray-100 rounded-xl p-0.5vw rounded-bl-none pr-1vw rounded-tl-none ${visibility?"inline":"hidden"}`} >
                {crypticPass}
                <BlinkingCursor input={ref} />
              </label>
              <input type="text" id={id} ref={ref} value={value} onChange={onChange} placeholder={placeholder} className={`w-16vw bg-gray-100 text-1vw transition-all p-0.5vw pr-0.7vw outline-none rounded-xl rounded-bl-none  rounded-tl-none rounded-tr-none rounded-br-none ${className_input}`} />
            </div>
            
           {type=="password"? <div className='overflow-hidden w-2.5vw h-2.5vw flex justify-center items-center rounded-tr-xl rounded-br-xl bg-gray-100  '>
            <span className={`${type=="password"?visibility?"fa-regular fa-eye":"fa-regular fa-eye-slash":null} cursor-pointer text-gray-400 text-1.3vw select-none`} onClick={()=>{
                ref.current.focus()
                setVisibility(!visibility)
            }}  >
            </span>
           </div> :<div className='bg-gray-100 h-2.5vw w-2.5vw rounded-tr-xl rounded-br-xl'> </div>  }
         </div>
         <span id="errMsg">{errMsg?errMsg:""}</span>
        </div>
    )
}

export default Input