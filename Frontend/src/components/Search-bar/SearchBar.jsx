import React from 'react'
import { useSearchValue } from '../../context/searchValue'

function Search({placeholder="Tell me what's in your mind ?",className_wrapper,className_input='',className_icon='',handleChange=()=>{},...props}) {
   
   const {value, setValue} = useSearchValue()
    
  return (
    <div id='searcbar_wrapper' className={`flex justify-center items-center ${className_wrapper}`}>

      <input type="text"  className={` bg-gray-100 text-0.5vw transition-all p-0.5vw rounded-xl pr-0 rounded-tr-none rounded-br-none outline-none  placeholder:text-1vw  ${className_input} `}
       {...props} 
       onChange={({target})=>{setValue(target.value)}} 
       placeholder={placeholder} value={value}/>

      <i style={{fontWeight:"regular", padding:"0.8vw",}} 
      className={`fa-solid fa-magnifying-glass rounded-xl text-gray-400 transition-all rounded-bl-none rounded-tl-none  bg-gray-100 
      ${className_icon}`}></i>
      </div>
  )
}

export default Search