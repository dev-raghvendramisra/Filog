import React, { useId } from 'react'
import {BlinkingCursor, Error} from '../../components'
const Input=React.forwardRef(({ 
   value="",
   onChange = () => { },
   type="email",
   placeholder="set your placeholder !",
   className_container = '',
   className_icon = '',
   className_input_prot_el_wrapper = '',
   className_input = '',
   className_pass_prot_el='',
   className_pass_icon='',
   className_pass_icon_replacement='',
   className_wrapper="",
   className_icon_cont="",
   errMsg="",
   fill=false,
   errClassName=""
     },ref)=> {

     
    const id = useId()
    const [visibility,setVisibility] = React.useState(true);
    const [crypticPass, setCrypticPass] = React.useState("")
    

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
       <div id="input-errMsg-wrapper" className={`mb-4p transition-all ${className_wrapper}`}>
        
        <div id="input-container" 
        className={` w-26vw rounded-2xl  flex relative
        ${fill?"h-3vw bg-gray-100 dark:bg-darkPrimary_grays":"h-3.5vw bg-transparent border-2 dark:border-1"}
        ${errMsg?"border-red-500 border-2 dark:border-1":"border-blackColor dark:border-white"}
        ${className_container}`}>
        
         <label id="label-as-placeholder-for-outlined-input" htmlFor={id} 
         className={`transition-inset absolute z-30  bg-white pl-0.5vw pr-0.5vw dark:bg-darkPrimary
          ${fill?"hidden":""}
          ${value!=""?("left-10p -top-20p text-0.8vw"):(ref.current!=document.activeElement?("left-12p text-1vw top-28p"):("left-10p -top-20p text-0.8vw"))}`}  >
          {type.substring(0,1).toLocaleUpperCase()+type.substring(1)}
          </label>
         
         <div  id="icon-cont" className={` w-10p h-100p  text-1.5vw flex justify-center items-center 
          ${fill?("text-darkPrimary_grays_darker text-opacity-70 dark:text-opacity-100 dark:text-footer_text"):("text-darkPrimary_grays_darker text-opacity-70 dark:text-opacity-80 dark:text-white")} ${className_icon_cont}`}>
           <span id="input-icon" 
          className={`inline  ${getIconClass()} ${className_icon}`}>
          </span>
         </div>

          <div id="pass-protection-wrapper" 
          className={`h-100p w-80p relative overflow-hidden ${className_input_prot_el_wrapper}`}>

            <input id={id} ref={ref} type="text" value={value} onChange={onChange} placeholder={fill?placeholder:""}
            className={`bg-transparent h-100p w-100p outline-none ${className_input}`} autoComplete='off'/>
            
            <label id="pass-protection-el" htmlFor={id} 
            className={`absolute inset-0 flex items-center
             ${type=="password"?visibility?"hidden":"block":"hidden"}
             ${fill?"bg-gray-100 dark:bg-darkPrimary_grays":"bg-white dark:bg-darkPrimary"}
             ${className_pass_prot_el}`}>
              {crypticPass}
              <BlinkingCursor input={ref}/>
            </label>
          </div>

          {/* {conditional rendering between replacement and icon of pass} */}
          {type=="password"?
          <div id="passIcon-cont" className='flex text-1.5vw  h-100p w-10p justify-center items-center '>
            <span id="passIcon" 
            onClick={()=>{setVisibility(!visibility);ref.current.focus()}}
            className={` transition-all
              ${fill?("text-darkPrimary_grays_darker text-opacity-70 dark:text-opacity-100 dark:text-footer_text"):("text-darkPrimary_grays_darker text-opacity-70 dark:text-opacity-80 dark:text-white")}
            ${visibility?"fa-regular fa-eye":"fa-regular fa-eye-slash"}
            ${className_pass_icon}`}>
            </span>
          </div>


          :<div id="passIconReplacement" 
          className={` h-100p w-10p ${className_pass_icon_replacement}`}></div>
        }
          

        </div>
        <Error className={`transition-all ${errClassName}`} errMsg={errMsg} />
      </div>

    )
})

export default Input
