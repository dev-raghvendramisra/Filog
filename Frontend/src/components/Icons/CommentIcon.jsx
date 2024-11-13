import React from 'react'
import useTheme from '../../context/themeContext'

function CommentIcon({height="2vw",width="2vw"}) {
    const {isDark} = useTheme()
  return (
    <img  style={{height,width}} src={isDark?"/icons/commentIcon-dark.svg":"/icons/commentIcon-light.svg"} />
  )
}

export default CommentIcon