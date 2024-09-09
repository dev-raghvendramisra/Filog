import React from 'react'
import { authServices, dbServices } from '../services'
import { useSelector } from 'react-redux'
import { FormModal } from '../components'
import { ID } from 'appwrite'

function Playground() {
 const {userName,userId, userAvatar,$id, blogsLiked} = useSelector(state=>state.userProfile)
 const {userData} = useSelector(state=>state.auth)
 const [val1, setVal1] = React.useState("")
 const [val2, setVal2] = React.useState("")
 const [val3, setVal3] = React.useState("")



 const inputFeildSpecs=[
  {
    type:"Add your comment",
    text_area:true,
  }]

  return (
    <div className='h-100vh w-full flex flex-col justify-center items-center'>
        <h1 className='text-3xl mt-20vh'>Playground</h1>
        <p className='text-1xl'>This is a test route</p>
        <button onClick={()=>{
        authServices.logout()
     }}>Logout</button>
         <button onClick={()=>{}}>Test link</button>



      <FormModal modalId={ID.unique()} 
      inputFeildSpecs={inputFeildSpecs}
      primaryBtnText="Comment" 
      iconClass='fa regular fa-comments' 
      secondaryBtnText="Cancel" heading="Comment on " 
      inputFeild_1Value={val1} 
      inputFeild_2Value={val2} 
      inputFeild_3Value={val3} 
      ctaDanger={false}
      message="Be clear, kind, and stay on topic with your feedback."
      ctaDisabled={false}
      charLimit={500}
      onChange_1={({target})=>setVal1(target.value)}
      onChange_2={({target})=>setVal2(target.value)}
      onChange_3={({target})=>setVal3(target.value)} />

      
    </div>
  )
}

export default Playground