import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import SearchValueProvider from './context/searchValue.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

   <Provider store = {store}>
    <SearchValueProvider>
   <RouterProvider router={router} />
   </SearchValueProvider>
   </Provider>
 ,
)
