import React from 'react'
import conf from '../conf/conf'
import { useSelector } from 'react-redux'
import { UnknownRoute } from '../components'
import Playground from './Playground'

function PlaygroundProtection() {
  const {fetching,userData} = useSelector(state=>state.auth)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = React.useState(true)
  //userData.$id==conf.ADMIN_ID
  React.useEffect(()=>{
    if(true){
        if(isAdminLoggedIn){
            setIsAdminLoggedIn(true)
        }else {
            setIsAdminLoggedIn(false)
        }
    }
  },[userData])
   
  if(fetching){
    return(
        <div className='flex h-100vh w-full flex-col gap-1 justify-center items-center text-2vw'>
            Hold On !
            <p className='text-1vw dark:text-footer_text text-gray-300'>Performing Authentication</p>
        </div>
    )
  }
  if(!fetching && !isAdminLoggedIn ){
    return <UnknownRoute />
  }

  return <Playground />

}

export default PlaygroundProtection