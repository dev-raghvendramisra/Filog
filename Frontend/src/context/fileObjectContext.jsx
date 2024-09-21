import { createContext } from "react";
import React from 'react'

const fileObjectContext = createContext({
    fileObject:null,
    setFileObject:()=>{}
})

export const FileObjectContextProvider = ({children}) =>{
    
    const [fileObject, setFileObject] = React.useState(null)

    return (
        <fileObjectContext.Provider value={{fileObject,setFileObject}}>
            {children}
        </fileObjectContext.Provider> 
    )
}

export default function useFileObjectContext(){
    return React.useContext(fileObjectContext)
}