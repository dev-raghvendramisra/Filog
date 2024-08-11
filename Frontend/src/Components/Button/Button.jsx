import React from 'react'
import { ColorRing } from 'react-loader-spinner'

function Button({children="Button",onClick=()=>{},className='',disabled=false,type='',primary=false,outline=false,loading=false,...props}) {
  return (
    <button style={{opacity:"1",transform:"translateY(0)"}} type={type} onClick={onClick} className={`  text-1vw flex justify-center transition-all overflow-hidden items-center gap-1 border-2 rounded-full p-0.5vw pl-2vw pr-2vw
    ${className}
     ${disabled?"bg-gray-300 border-gray-300 text-gray-400":""} 
    ${primary?"bg-primary dark:bg-primary_darkMode border-primary dark:border-primary_darkMode text-white active:bg-opacity-70 active:scale-110 active:bg-primary/60 dark:active:bg-primary_darkMode/60":""}
    ${outline?"bg-transparent hover:hoverAnim border-black text-black dark:border-white dark:text-white":""}
    `}  {...props}>
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