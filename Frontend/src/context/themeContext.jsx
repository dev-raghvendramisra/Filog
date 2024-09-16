import { createContext, useContext, useState } from "react";

const themeContext = createContext({
    isDark:null,
    setIsDark:()=>{}
})

const ThemeContextProvider = ({children}) =>{
  const theme = localStorage.getItem("isDark")
  const [isDark, setIsDark] = useState(()=>(theme?(
    JSON.parse(theme)
  ):false))
  isDark?document.querySelector("html").classList.add("dark"):document.querySelector("html").classList.remove("dark")
  
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