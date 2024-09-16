import React from 'react'
import { authServices, dbServices } from '../services'
import { useDispatch, useSelector } from 'react-redux'
import useModalActionsContext from '../context/modalActionsContext'
import { ID } from 'appwrite'
import { getFormModal } from '../utils'

function Playground() {
 const {userName,userId, userAvatar,$id, blogsLiked} = useSelector(state=>state.userProfile)
 const {userData} = useSelector(state=>state.auth)
 const dispatch = useDispatch()
 const {addModalActionHandlers} = useModalActionsContext()



 const inputFeildSpecs=[
  {
    type:"Add comment",//type will be used as placeholder in the input feilds without fill
    text_area:true,
  },
  {
    type:"email",
    text_area:false,
  }]

  return (
    <div className='h-100vh w-full flex flex-col justify-center items-center'>
        <h1 className='text-3xl mt-20vh'>Playground</h1>
        <p className='text-1xl'>This is a test route</p>
        <button onClick={()=>{
        authServices.logout()
     }}>Logout</button>
         <button onClick={()=>{}}>Test link</button>
         <button onClick={()=>{
          getFormModal({modalId:ID.unique(),
            heading:"Test Modal",
            message:"This is a test modal",
            ctaDanger:false,
            ctaDisabled:false,
            ctaLoading:false,
            primaryBtnText:"Primary",
            secondaryBtnText:"Secondary",
            iconClass:"fa-solid fa-lock",
            inputFeildSpecs,
            charLimitForTextArea:100,
            primaryOnClick:()=>{
              console.log("Primary clicked")
            },
            secondaryOnClick:()=>{
              console.log("Secondary clicked")
            },
            dispatch,
            addModalActionHandlers
            })
         }}>Test Modal</button>
    </div>
  )
}

export default Playground