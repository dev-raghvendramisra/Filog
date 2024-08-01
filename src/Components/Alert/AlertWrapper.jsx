import React from 'react'
import Alert from './Alert.jsx'
import { useSelector, useDispatch } from 'react-redux'

function AlertWrapper({className}) {
   const alerts = useSelector((state)=>state.alerts)
   const dispatch = useDispatch()

   React.useEffect(()=>{
    let timer;
    if(alerts.length>1){
       timer = setTimeout(()=>{dispatch(clearAlerts());console.log(timer)},4100)
    }
    return ()=>{
        clearTimeout(timer);
    }
   },[alerts.length])

  return (
    <div id="alert-Wrapper" className={`fixed flex justify-start w-fit items-end flex-col transition-all top-12p gap-2 right-2p ${className}`}>
    {alerts.map((alert)=>{
     return (
       alert.id!==null?<Alert type={alert.type} key={alert.id}>{alert.message}</Alert>:null
     )
    })}
   </div>

  )
}

export default AlertWrapper