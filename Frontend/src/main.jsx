import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import SearchValueProvider from './context/searchValue.jsx'
import { ThemeContextProvider } from './context/themeContext.jsx'
import { AlertModalActionsContextProvider } from './context/alertModalActionsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <AlertModalActionsContextProvider>
      <ThemeContextProvider>
        <SearchValueProvider>
          <RouterProvider router={router} />
        </SearchValueProvider>
      </ThemeContextProvider>
    </AlertModalActionsContextProvider>
  </Provider>
  ,
)
