import React from 'react'

function ToggleBtn({className='',handleClick,children,...props}) {

  const[isDark, setIsDark] = React.useState(false)

  if(!handleClick){
    handleClick=()=>{
      setIsDark(!isDark)
    }
  }

  React.useEffect(()=>{
       if(isDark){
          document.querySelector("html").classList.add("dark")
       }
       else if(!isDark){
        document.querySelector("html").classList.remove("dark")

       }
  },[isDark])
  return (
   <div  onClick={handleClick} className={`cursor-pointer toggleBtnShadow p-0.2vw pr-1vw dark:pl-1vw dark:pr-0.2vw flex rounded-full  justify-start transition-all items-center relative bg-gray-200 dark:bg-blue-600 dark:justify-end ${className}`}>
       <div style={{height:"1.2vw",width:"1.2vw"}} className='flex justify-center items-center rounded-full transition-all bg-white drop-shadow-lg'>
           {children}
       </div>
   </div>
  )
}

export default ToggleBtn