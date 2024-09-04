import React from 'react'
import { authServices, dbServices } from '../services'
import { useSelector } from 'react-redux'
import { CommentIcon, AnimatedHeartIcon, ShareIcon } from '../components'
function Playground() {
 const {userName,userId, userAvatar,$id} = useSelector(state=>state.userProfile)

  return (
    <div className='h-100vh w-100vw flex flex-col justify-start items-center'>
        <h1 className='text-3xl mt-20vh'>Playground</h1>
        <p className='text-1xl'>This is a test route</p>
        <button onClick={async()=>{
          const res = await dbServices.like_unlikeBlog("66d6674e0015e716db6f",$id,5,["66d6674e0015e716db6f"])
          console.log(res);
          
        }}>Test Like Blog</button>
        <button onClick={()=>{
        authServices.logout()
     }}>Logout</button>
     <AnimatedHeartIcon />
     <CommentIcon />
     <ShareIcon />
    </div>
  )
}

export default Playground