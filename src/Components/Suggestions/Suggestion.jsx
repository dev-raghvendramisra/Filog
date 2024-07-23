import React from 'react'
import { useSearchValue } from '../../context/searchValue'
function Suggestion() {
    const {value} = useSearchValue()
  return (
    <div className={` ${value!==""?"block":"hidden"}`}>Suggestion : {value}</div>
  )
}

export default Suggestion