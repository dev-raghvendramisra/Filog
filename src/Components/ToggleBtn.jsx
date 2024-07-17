import React from 'react'

function ToggleBtn({className='',onClick=()=>{},...props}) {
  return (
   <div className=' toggleBtnShadow p-0.2vw pr-1vw dark:pl-1vw dark:pr-0.2vw flex rounded-full  justify-start transition-all items-center relative bg-gray-200 dark:bg-blue-600 dark:justify-end'>
       <div style={{height:"1.2vw",width:"1.2vw"}} className=' rounded-full transition-all bg-white drop-shadow-lg'></div>
   </div>
  )
}

export default ToggleBtn