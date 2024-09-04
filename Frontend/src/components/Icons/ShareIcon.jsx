import React from 'react'
import useTheme from '../../context/themeContext'

function ShareIcon({height="2vw",width="2vw"}) {
  const {isDark} = useTheme()
  return (
    <img style={{height,width}} src={isDark?"/icons/shareIcon-dark.svg":"icons/shareIcon-light.svg"} />
  )
}

export default ShareIcon