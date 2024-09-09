import React from 'react'
import { authServices, dbServices } from '../services'
import { useSelector } from 'react-redux'
import { Input } from '../components'

function Playground() {
 const {userName,userId, userAvatar,$id, blogsLiked} = useSelector(state=>state.userProfile)
 const {userData} = useSelector(state=>state.auth)
 const [val, setVal] = React.useState("")
 const ref = React.useRef(null)

  return (
    <div className='h-100vh w-full flex flex-col justify-start items-center'>
        <h1 className='text-3xl mt-20vh'>Playground</h1>
        <p className='text-1xl'>This is a test route</p>
        <button onClick={async()=>{
          const res = await dbServices.like_unlikeBlog("66d6674e0015e716db6f",$id,5,["66d6674e0015e716db6f"])
          console.log(res);
          
        }}>Test Like Blog</button>
        <button onClick={()=>{
        authServices.logout()
     }}>Logout</button>
     <Input value={val} ref={ref} onChange={({target})=>{setVal(target.value)}} className_container="w-20vw px-1.5vw py-1vw" style={{width:"100%"}} type="Add comment" text_area icon={false} />
     <Input value={val} ref={ref} onChange={({target})=>{setVal(target.value)}} className_container="w-20vw px-1.5vw py-1vw" style={{width:"100%"}} type="email" icon={false} />
     <button onClick={()=>{}}>Test link</button>
    </div>
  )
}

export default Playground