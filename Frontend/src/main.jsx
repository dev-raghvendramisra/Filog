import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import SearchValueProvider from './context/searchValue.jsx'
import { ThemeContextProvider } from './context/themeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

   <Provider store = {store}>
    <ThemeContextProvider>
    <SearchValueProvider>
   <RouterProvider router={router} />
   </SearchValueProvider>
   </ThemeContextProvider>
   </Provider>
 ,
)
