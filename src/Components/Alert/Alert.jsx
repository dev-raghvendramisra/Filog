import React from 'react'


function Alert({type="success",className="",children}) {
  return (
    <div className={`overflow-x-hidden text-darkPrimary p-0.5vw pl-1vw pr-1vw gap-2 text-1.1vw rounded-xl flex justify-center items-center alertAnim
    ${type=="success"?"bg-green-100 text-green-900":""}
    ${type=="welcome"?"bg-green-100 text-green-900":""}
    ${type=="danger"?"bg-red-100 text-red-900":""}
    ${className}`}>
     {type=="success"?<i class="fa-regular fa-circle-check tickIcon text-1.3vw" style={{display:"flex",alignItems:"center"}}></i>:""}
     {type=="welcome"?<span>👋</span>:""}
     {type=="danger"?<i class="fa-solid fa-triangle-exclamation" style={{display:"flex",alignItems:"center"}}></i>:""}
    {children}
     <span className={`absolute -bottom-0 left-0 h-10p ${type=="success"?"bg-green-700":type=="danger"?"bg-red-700":"bg-green-700"}  slideLeft`}></span>
    </div>
  )
}

export default Alert