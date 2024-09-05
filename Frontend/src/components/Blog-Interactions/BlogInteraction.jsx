import React from 'react'
import {AnimatedHeartIcon, CommentIcon, GenToast, ShareIcon} from '..'
import { dbServices } from '../../services'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { updateLikes } from '../../store/userProfileSlice'
import { likeBlog, unlikeBlog } from '../../store/blogsSlice'

function BlogInteraction({userProfileId,authorName,blogId,userData,openModal,likes=0, comments=0, height=1.7, width=1.7,loader=false}) {
    const [isLiked, setIsLiked] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const dispatch = useDispatch()
  
    const handleLike = async() => {
        if(disabled) return
        if(!userData){
            return toast.custom(<GenToast type='err'>Login first to like blogs</GenToast>)
        }
        if(userData.emailVerification === false){
            openModal(true)
            return toast.custom(<GenToast type='err'>Verify your email address to like blogs</GenToast>)
        }
        setDisabled(true)
        setLoading(true)
        if(isLiked){
           //handel unlike
           const res = await dbServices.like_unlikeBlog(blogId,userProfileId,"unlike")
           setIsLiked(false)
           dispatch(updateLikes({type:"unlike",val:blogId}))
           dispatch(unlikeBlog(blogId))
           if(res.$id){
               toast.custom(<GenToast type='success'>Unliked {authorName}'s blog</GenToast>)
           }
            else{
                toast.custom(<GenToast type='err'>Failed to unlike {authorName}'s blog, internal server error</GenToast>)
            }
        }
        else{
            //handle like
            const res = await dbServices.like_unlikeBlog(blogId,userProfileId,"like")
            setIsLiked(true)
            dispatch(updateLikes({type:"like",val:blogId}))
            dispatch(likeBlog(blogId))
            if(res.$id){
                toast.custom(<GenToast type='success'>Liked {authorName}'s blog</GenToast>)
            }
            else{
                toast.custom(<GenToast type='err'>Failed to like {authorName}'s blog, internal server error</GenToast>)
            }
        }
        setLoading(false)
        setDisabled(false)
    }
    const handleComment = () => { }
    const handleShare = () => { }

 


  return (
    <div className={`flex gap-3 justify-center absolute  top-[99.5%] items-center border-2 dark:border-footer_text_light dark:border-opacity-50   dark:bg-darkPrimary_grays bg-opacity-60 py-0.5vw px-1vw rounded-full`}>
        
     <div className='flex justify-center items-center'>
        <button className={`flex items-center justify-center gap-2 rounded-full overflow-hidden relative hover:iconsHoverAnim ${loader && "postReactionLoader"}`} style={{height:`${height + 0.5}vw`,width:`${width + 0.5}vw`}} onClick={handleLike}>
          {loader || <AnimatedHeartIcon height={height+"vw"} width={width+"vw"} loading={loading} liked={isLiked} />}
        </button>
          {loader || <span className='text-1.1vw'>{likes}</span>}
     </div>
     <div className='flex justify-center items-center'>
        <button className={`flex items-center justify-center gap-2 rounded-full p-0.1vw overflow-hidden relative hover:iconsHoverAnim ${loader && "postReactionLoader"}`} style={{height:`${height + 0.5}vw`,width:`${width + 0.5}vw`}} onClick={handleComment}>
          {loader || <CommentIcon height={height+"vw"} width={width+"vw"} />}
        </button>
          {loader || <span className='text-1.1vw'>{comments}</span>}
     </div>
     <div className='flex justify-center items-center'>
        <button className={`flex items-center justify-center rounded-full p-0.1vw overflow-hidden relative hover:iconsHoverAnim ${loader && "postReactionLoader"}`} style={{height:`${height + 0.5}vw`,width:`${width + 0.5}vw`}}  onClick={handleShare}>
         {loader || <ShareIcon height={1.6+"vw"} width={1.6+"vw"} />}
        </button>
     </div>
    </div>
  )
}

export default BlogInteraction