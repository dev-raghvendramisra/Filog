import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import SearchValueProvider from './context/searchValue.jsx'
import { ThemeContextProvider } from './context/themeContext.jsx'
import { ModalActionsContextProvider } from './context/modalActionsContext.jsx'
import { FileObjectContextProvider } from './context/fileObjectContext.jsx'
import { PlatformContextProvider } from './context/platformContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
        <PlatformContextProvider>
        <FileObjectContextProvider>
        <ModalActionsContextProvider>
        <ThemeContextProvider>
        <SearchValueProvider>
          <RouterProvider router={router} />
        </SearchValueProvider>
      </ThemeContextProvider>
      </ModalActionsContextProvider>
      </FileObjectContextProvider>
      </PlatformContextProvider>
  </Provider>
  ,
)
