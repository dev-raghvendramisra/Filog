import { createContext, useContext, useState } from "react";

const searchValue = createContext({
    value:"",
    setValue:()=>{}
})


const SearchValueProvider = ({children})=>{
    const [value, setValue]=useState("")

    return (
        <searchValue.Provider value={{value:value,setValue:(val)=>{setValue(val)}}}>
            {children}
        </searchValue.Provider>
    )

}

export default SearchValueProvider

export function useSearchValue(){
    return useContext(searchValue)
}