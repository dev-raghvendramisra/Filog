import React from 'react'
import useTheme from '../../context/themeContext'
import { defineElement } from '@lordicon/element'
import Lottie from 'lottie-web'




function AnimatedHeartIcon({height="2vw",width="2vw",loading,liked}) {
 const {isDark} = useTheme()
defineElement(Lottie.loadAnimation)
  return (
    <>
    {loading 
    ? <lord-icon
        src="https://cdn.lordicon.com/jjoolpwc.json"
        trigger="loop"
        stroke="bold"
        colors={isDark?"primary:#ffffff,secondary:#afc5ff":"primary:#121331,secondary:#194fe6"}
        style={{height,width}}>
    </lord-icon> 
    :<img  style={{height,width}} src={liked?"/icons/heartIcon-liked.svg":isDark?"/icons/heartIcon-dark.svg":"/icons/heartIcon-light.svg"} />
    }
    </>
  )
}

export default AnimatedHeartIcon