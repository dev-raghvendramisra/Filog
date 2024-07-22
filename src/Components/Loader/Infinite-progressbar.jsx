import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';

function InfinitePogressbar({className}) {
  return (
    <div id="progressbar-login" className={`h-100p w-100p absolute bg-white transition-all bg-opacity-40 z-40 dark:bg-darkPrimary_grays_darker dark:bg-opacity-50 ${className}`}>
            <LinearProgress
        sx={{
          color: "#194FE6", 
          position: "absolute",
          top: "0",
          width: "100%",
          borderRadius: 5, 
          height:"0.7%",
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