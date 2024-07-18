import React from 'react'

function Button({children="Button",onClick=()=>{},className='',disabled=false,type='',primary=false,outline=false,...props}) {
  return (
    <button type={type} onClick={onClick} className={`  text-1vw  border-2 rounded-full p-0.5vw pl-2vw pr-2vw
    ${className}
     ${disabled?"bg-gray-200 border-gray-50 text-white":"**"} 
    ${primary?"bg-primary border-primary text-white":"**"}
    ${outline?"bg-transparent border-black text-black":"**"}
    `} {...props}>
        {children}
    </button>
  )
}

export default Button