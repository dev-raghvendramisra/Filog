import React, { useId, useRef } from 'react';
import { BlinkingCursor, Error } from '../../Components';

function Input({ 
  value = "",
  onChange = () => {},
  type = "email",
  placeholder = "set your placeholder !",
  className_container = '',
  className_icon = '',
  className_input_prot_el_wrapper = '',
  className_input = '',
  className_pass_prot_el = '',
  className_pass_icon = '',
  className_pass_icon_replacement = '',
  errMsg = "",
  fill = false
}) {


  const id = useId();
  const [visibility, setVisibility] = React.useState(false);
  const [crypticPass, setCrypticPass] = React.useState("");
  const ref = useRef();

  
  // Determine the icon class based on the input type
  const getIconClass = () => {
    switch (type) {
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

  // Update cryptic password representation and blur input if empty
  React.useEffect(() => {
    if (value === "") {
      ref.current.blur();
    }
    if (type === "password") {
      setCrypticPass(value ? "●".repeat(value.length) : "");
    }
  }, [value, type]);

  return (
    <div id="input-errMsg-wrapper">
      {/* Input Container */}
      <div 
        id="input-container" 
        className={`w-26vw rounded-2xl flex relative
          ${fill ? "h-3vw bg-gray-100 dark:bg-darkPrimary_grays" : "h-3.5vw bg-transparent border-1"}
          ${errMsg ? "border-red-500 border-2 dark:border-1" : "border-blackColor dark:border-white"}
          ${className_container}`}
      >
        {/* Label as Placeholder */}
        <label 
          id="label-as-placeholder-for-outlined-input" 
          htmlFor={id} 
          className={`transition-all absolute z-30 bg-white pl-0.5vw pr-0.5vw dark:bg-darkPrimary_grays_darker
            ${fill ? "hidden" : ""}
            ${value ? "left-10p -top-20p text-0.8vw" : (ref.current !== document.activeElement ? "left-12p text-1vw top-28p" : "left-10p -top-20p text-0.8vw")}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>

        {/* Icon Container */}
        <div 
          id="icon-cont" 
          className={`w-10p h-100p text-1.5vw flex justify-center items-center
            ${fill ? "text-darkPrimary_grays_darker text-opacity-70 dark:text-opacity-100 dark:text-footer_text" : "text-darkPrimary_grays_darker text-opacity-70 dark:text-opacity-80 dark:text-white"}`}
        >
          <span 
            id="input-icon" 
            className={`inline ${getIconClass()} ${className_icon}`}
          />
        </div>

        {/* Input Field with Optional Password Protection */}
        <div 
          id="pass-protection-wrapper" 
          className={`h-100p w-80p relative overflow-hidden ${className_input_prot_el_wrapper}`}
        >
          <input 
            id={id} 
            ref={ref} 
            type={type === "password" && !visibility ? "text" : type} 
            value={value} 
            onChange={onChange} 
            placeholder={fill ? placeholder : ""}
            className={`bg-transparent h-100p w-100p outline-none ${className_input}`} 
          />

          {/* Password Protection Element */}
          {type === "password" && (
            <label 
              id="pass-protection-el" 
              htmlFor={id} 
              className={`absolute inset-0 flex items-center
                ${visibility ? "hidden" : "block"}
                ${fill ? "bg-gray-100 dark:bg-darkPrimary_grays" : "bg-white dark:bg-darkPrimary_grays_darker"}
                ${className_pass_prot_el}`}
            >
              {crypticPass}
              <BlinkingCursor input={ref} />
            </label>
          )}
        </div>

        {/* Password Icon Toggle */}
        {type === "password" ? (
          <div 
            id="passIcon-cont" 
            className='flex text-1.5vw h-100p w-10p justify-center items-center'
          >
            <span 
              id="passIcon" 
              onClick={() => {
                setVisibility(!visibility);
                ref.current.focus();
              }}
              className={`transition-all
                ${fill ? "text-darkPrimary_grays_darker text-opacity-70 dark:text-opacity-100 dark:text-footer_text" : "text-darkPrimary_grays_darker text-opacity-70 dark:text-opacity-80 dark:text-white"}
                ${visibility ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                ${className_pass_icon}`}
            />
          </div>
        ) : (
          <div 
            id="passIconReplacement" 
            className={`h-100p w-10p ${className_pass_icon_replacement}`}
          />
        )}
      </div>
      
      {/* Error Message */}
      <Error errMsg={errMsg} />
    </div>
  );
}

export default Input;
