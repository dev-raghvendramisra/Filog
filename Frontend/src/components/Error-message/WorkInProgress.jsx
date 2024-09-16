import React from 'react'
import useTheme from '../../context/themeContext'

function workInProgress({darkImg,lightImg,children,className}) {
  const darkSrc = darkImg || "/error-placeholders/workInProgress-dark.webp"
  const lightSrc = lightImg || "/error-placeholders/workInProgress-light.webp"

  const {isDark} = useTheme()
  return (
    <div className={`h-100vh flex  flex-col gap-8 items-center justify-center ${className}`}>
      <img className='h-50p flex-shrink-0' src={isDark?darkSrc:lightSrc}/>
      {children}
    </div>
  )
}

export default workInProgress