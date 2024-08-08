import React from 'react'

function GenToast({type="greet",className="",children="Enter Message"}) {
  return (
    <div className={`overflow-x-hidden alertAnim text-darkPrimary p-0.6vw pl-1vw w-fit h-fit pr-1vw gap-2 text-1.1vw rounded-xl drop-shadow-xl   flex justify-center items-center 
        ${type=="success"?"bg-green-200 dark:bg-green-600 dark:text-white text-green-900":""}
        ${type=="greet"?"bg-white  dark:text-white dark:bg-gray-500/50":""}
        ${type=="err"?"bg-red-200 text-red-900 dark:bg-red-600 dark:text-white":""}
        ${className}`}>
         {type=="success"?<i class="fa-regular fa-circle-check tickIcon text-1.3vw" style={{display:"flex",alignItems:"center"}}></i>:""}
         {type=="greet"?<span>👋</span>:""}
         {type=="err"?<i class="fa-solid fa-triangle-exclamation" style={{display:"flex",alignItems:"center"}}></i>:""}
        {children}
   </div>
  )
}

export default GenToast