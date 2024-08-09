import { createContext, useContext, useState } from "react";

const themeContext = createContext({
    isDark:null,
    setIsDark:()=>{}
})

const ThemeContextProvider = ({children}) =>{
  const [isDark, setIsDark] = useState(()=>(localStorage.getItem("isDark")?(
    JSON.parse(localStorage.getItem("isDark"))
  ):false))
  return(
     <themeContext.Provider value={{isDark,setIsDark}}>
        {children}
     </themeContext.Provider>)
}

const useTheme = () =>{
    return useContext(themeContext);
}

export default useTheme;

export {ThemeContextProvider}