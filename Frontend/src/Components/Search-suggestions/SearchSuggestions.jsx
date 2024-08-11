import React from 'react'
import { useSearchValue } from '../../context/searchValue'
function SearchSuggestions() {
    const {value} = useSearchValue()
  return (
    <div className={` ${value!==""?"block":"hidden"}`}>SearchSuggestions : {value}</div>
  )
}

export default SearchSuggestions