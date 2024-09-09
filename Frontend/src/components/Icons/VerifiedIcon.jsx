import React from 'react'
import useTheme from '../../context/themeContext'

function VerificationIcon({height="2vw",width="2vw",...props}) {
  const {isDark} = useTheme()
  return (
    <img style={{height,width}}  src={isDark?"/icons/verifiedIcon-dark.svg":"/icons/verifiedIcon-light.svg"} {...props} />
  )
}

export default VerificationIcon