import React from 'react'
import {AnimatedHeartIcon, CommentIcon, CustomToast, GenToast, ShareIcon} from '..'
import { dbServices } from '../../services'
import toast from 'react-hot-toast'
import {getFormattedNumber} from '../../utils'

function BlogInteraction({userProfileId,blogImg,authorName,blogId,userData,openModal,updateLikes,liked, likeCount=0, commentCount=0, height=1.7, width=1.7,loader=false}) {
    const [isLiked, setIsLiked] = React.useState(liked)
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const msg = (type,author) => type === "liked" ? `Liked ${author}'s blog` : `Unliked ${author}'s blog`
  
    
  
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
           updateLikes("unlike")
           if(res.$id){
               toast.custom(<CustomToast imgW='4vw' roundedPic="xl" img={blogImg}  secondaryText={msg("unliked",authorName)}>Unliked</CustomToast>)
           }
            else{
                toast.custom(<GenToast type='err'>Failed to unlike {authorName}'s blog, internal server error</GenToast>)
            }
        }
        else{
            //handle like
            const res = await dbServices.like_unlikeBlog(blogId,userProfileId,"like")
            setIsLiked(true)
            updateLikes("like")
            if(res.$id){
                toast.custom(<CustomToast imgW='4vw' roundedPic="xl" img={blogImg} secondaryText={msg("liked",authorName)}>Liked</CustomToast>)
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
          {loader || <span className='text-1.1vw'>{getFormattedNumber(likeCount)}</span>}
     </div>
     <div className='flex justify-center items-center'>
        <button className={`flex items-center justify-center gap-2 rounded-full p-0.1vw overflow-hidden relative hover:iconsHoverAnim ${loader && "postReactionLoader"}`} style={{height:`${height + 0.5}vw`,width:`${width + 0.5}vw`}} onClick={handleComment}>
          {loader || <CommentIcon height={height+"vw"} width={width+"vw"} />}
        </button>
          {loader || <span className='text-1.1vw'>{getFormattedNumber(commentCount)}</span>}
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