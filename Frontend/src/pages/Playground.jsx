import React from 'react'
import { authServices, dbServices } from '../services'
import { useDispatch, useSelector } from 'react-redux'
import useModalActionsContext from '../context/modalActionsContext'
import { ID } from 'appwrite'
import { getFormModal, getWebpImage } from '../utils'
import { ImageSelectionCard } from '../components'
import { useAvatarFormModal } from '../hooks'

function Playground() {
 
  const [file, setFile] = React.useState(null)
  const {userId,$id,userName,userAvatar} = useSelector(state=>state.userProfile)

  const openAvatarModal = useAvatarFormModal()

  const blog={
    title: "How Science is Revolutionizing Food Sustainability",
  tags: ["science", "food", "politics"],
  content:"##",
  coverImageUrl:"##",
  blogId:ID.unique(),
  coverImageId:"##",  
  authorProfileId:$id,
  userId:userId,
  authorName:userName,
  authorAvatar:userAvatar,
  }
  const blogsToBeUpdated=["66ac3ce9001523aed6e5","66ac3ce9003adda031b8","66ac3cea000f81154c1f","66ac3cea0020cc338676","66ac3cea00373605e863","66ac3ceb00198caef8db"]

  const uploadBlog = async()=>{
    console.log(blog);
    const imageName = `${blog.authorName}-blogCoverImage-${blog.blogId}`
    let coverImage = await fetch("https://plus.unsplash.com/premium_photo-1663011236143-62855453066b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D")
    let coverImageBlob;
    let coverImageFile;
    if(coverImage.status == 200){
      coverImageBlob = await coverImage.blob()
      coverImageFile = new File([coverImageBlob], 'coverImage.jpg', {type: 'image/jpeg'})
      coverImage = await getWebpImage(coverImageFile,null,imageName)
      console.log(coverImage);
      
    }
    const imageRes = await dbServices.uploadBlogImages(coverImage)
     console.log(imageRes);
     
    if(imageRes.coverImageId){
      blog.coverImageUrl = imageRes.coverImageUrl
      blog.coverImageId = imageRes.coverImageId
    }
    const blogRes = await dbServices.createBlog(blog)
    console.log(blogRes);
    
  }


  return (
    <div className='h-100vh w-full flex flex-col justify-center items-center'>
      <button onClick={uploadBlog}>Upload Blog</button>
      <button onClick={updateBlog}>Update Blog</button>
    </div>
  )
}

export default Playground