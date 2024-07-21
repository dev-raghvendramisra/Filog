import React from 'react'
import { ColorRing } from 'react-loader-spinner'

function Button({children="Button",onClick=()=>{},className='',disabled=false,type='',primary=false,outline=false,loading=false,...props}) {
  return (
    <button type={type} onClick={onClick} className={`  text-1vw flex justify-center items-center gap-1 border-2 rounded-full p-0.5vw pl-2vw pr-2vw
    ${className}
     ${disabled?"bg-gray-300 border-gray-300 text-gray-400":"**"} 
    ${primary?"bg-primary border-primary text-white":"**"}
    ${outline?"bg-transparent border-black text-black":"**"}
    `} {...props}>
        {children}
       {loading? <ColorRing
        visible={true}
        height="1.5vw"
        width="1.5vw"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
        />:null}
    </button>
  )
}

export default Button