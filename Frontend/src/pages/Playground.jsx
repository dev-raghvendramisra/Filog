import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image'
import List from '@editorjs/list';
import { Button, ImageSelectionCard } from '../components';
import { getWebpImage } from '../utils'; // Utility to process images to WebP format
import InlineCode from '@editorjs/inline-code';
import editorToolConf from '../conf/editorToolConf';
import { dbServices } from '../services';
import conf from '../conf/conf';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

const Playground = () => {
  const {$id, userAvatarId, userId} = useSelector(state=>state.userProfile);

  React.useEffect(()=>{
    const editor = new EditorJS({
      holder:'editorHolder',
      data:'',
      placeholder:'Start writing whats in your mind',
      tools:editorToolConf
    })
  },[])

  return (
    <div className="h-100vh w-full flex justify-center items-center">
       {/* <div  id="editorHolder" className="editor-holder"></div> */}
       <Button primary onClick={
        async()=>{
          const profileRes = await dbServices.updateProfile($id , {
            userAvatar : conf.cdnEndpoint+userAvatarId
          })
          if(profileRes.$id){
            console.log("Profile updated successfully with new cdn endpoint", profileRes);
            const blogs = await dbServices.getBlogs([Query.equal("userId",userId)])
            if(blogs.documents.length>0){
              blogs.documents.forEach(async(blog) => {
                const res = await dbServices.updateBlog(blog.$id,{
                  coverImageUrl: conf.cdnEndpoint+blog.coverImageId
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
       }>
         Start 
       </Button>
    </div>
  );
}

export default Playground;
