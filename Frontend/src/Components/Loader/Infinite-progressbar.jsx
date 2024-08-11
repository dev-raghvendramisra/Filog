import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';


function InfinitePogressbar({className}) {
  return (
    <div style={{zIndex:"100",position:"fixed",top:"0"}} id="progressbar-login" className={`h-100p w-100p bg-white transition-all bg-opacity-40 dark:bg-darkPrimary_grays_darker dark:bg-opacity-50 ${className}`}>
            <LinearProgress
        sx={{
          color: "#194FE6", 
          position: "absolute",
          top: "0",
          width: "100%",
          borderRadius: 5, 
          height:"0.7%",
          backgroundColor:"transparent",
          '& .MuiLinearProgress-bar': {
            backgroundColor: "#194FE6",
            animationDuration: "0.9s", 
          },
        }}
        variant="indeterminate"
       /> 
        
      
    </div>
  )
}

export default InfinitePogressbar