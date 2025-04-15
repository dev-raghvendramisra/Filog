import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image'
import List from '@editorjs/list';
import { LoaderIcon } from 'react-hot-toast';
import { Button, ImageSelectionCard } from '../components';
import { getWebpImage, startAuthentication } from '../utils'; // Utility to process images to WebP format
import InlineCode from '@editorjs/inline-code';
import editorToolConf from '../conf/editorToolConf';
import { authServices, dbServices } from '../services';
import conf from '../conf/conf';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setFetching } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { setProfile, clearProfile } from '../store/userProfileSlice';
import { useResetPassModal } from '../hooks';
import { useLoginModal } from '../hooks/useFormModal';


const Playground = () => {
  // const {$id, userAvatarId, userId} = useSelector(state=>state.userProfile);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.auth)
  const {userName} = useSelector(state=>state.userProfile)
  React.useEffect(()=>{
    const editor = new EditorJS({
      holder:'editorHolder',
      data:'',
      placeholder:'Start writing whats in your mind',
      tools:editorToolConf
    })
  },[])

  // const open = useResetPassModal()
  
  const [secret, setSecret] = React.useState(null);
  const [userId, setUserId] = React.useState(null);
  // const [isSuccess,openModal] = useLoginModal()

  return (
    <div className="h-100vh w-full flex justify-center items-center">
       {/* <div  id="editorHolder" className="editor-holder"></div> */}
       {/* <Button primary onClick={
        async()=>{
            const blogs = await dbServices.getBlogs([Query.equal("userId",userData.$id)])
            if(blogs.documents.length>0){
              blogs.documents.forEach(async(blog) => {
                const res = await dbServices.updateBlog(blog.$id,{
                  slug: userName + "-"+blog.title.toLowerCase().split(" ").join("-"),
                })
                if(res.$id){
                  console.log("Blog updated successfully !", res)
                }
                else console.log("Failed to update Blog !", res)
              });
            }
            else console.log("No blogs associated to user !", blogs)
          }
        }
       >
         Start 
       </Button>

       <Button primary onClick={async()=>{
        const {res} = await authServices.createMagicUrl("itsraghav12@gmail.com")
        console.log(res);
        setSecret(res.secret);
        setUserId(res.userId);
       }}>
        Get Magic Url
       </Button>
      <Button primary onClick={async()=>{
        const {res:{jwt}} = await authServices.verifyMagicUrl(userId,secret)
        authServices.loginWithMagicUrl(jwt)
        console.log(jwt);
        
       }}>
        Verify Magic Url
       </Button>
       <Button primary onClick={async()=>{
        const res = await startAuthentication({dispatch,login,logout,setFetching,navigate});
        const profile  = res.res.userProfile
       }}
       >Login</Button>
        <Button primary
         onClick={
          async()=>{
            const res = await authServices.resetPassword(userData.$id,"raghav12");
            console.log(res);
            
          }
         }
         >Reset Pass</Button>
        <LoaderIcon id='loader'/> */}
    </div>
  );
}

export default Playground;
//was implementing