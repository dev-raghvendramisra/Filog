import { createContext, useState, useContext } from "react";

const platformContext = createContext({
    mobile:false,
    desktop:true,
    setPlatformAsMobile : ()=>{},
    setPlatformAsDesktop : ()=>{}
})

export const PlatformContextProvider = ({children}) =>{
    const [mobile, setMobile] = useState(false) 
    const [desktop, setDesktop] = useState(true) 
   
    return <platformContext.Provider value={{
        mobile,
        desktop,
        setPlatformAsDesktop:()=>{
            setMobile(false),
            setDesktop(true)
        },
        setPlatformAsMobile:()=>{
            setMobile(true),
            setDesktop(false)
        }
    }}>
            {children}
           </platformContext.Provider>
}

const usePlatformContext = ()=>{
   return useContext(platformContext)
}
export default usePlatformContext