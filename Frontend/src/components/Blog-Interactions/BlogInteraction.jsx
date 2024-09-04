import React from 'react'
import {AnimatedHeartIcon, CommentIcon, GenToast, ShareIcon} from '..'
import { dbServices } from '../../services'
import toast from 'react-hot-toast'

function BlogInteraction({blogsLiked=[],blogId,userData,openModal,likes=0, comments=0, height=1.7, width=1.7,loader=false}) {
    const [isLiked, setIsLiked] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
  
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
        }
        else{
            //handle like
        }
        return
        setLoading(false)
        setDisabled(false)
    }
    const handleComment = () => { }
    const handleShare = () => { }

    React.useEffect(()=>{
        if(blogsLiked.includes(blogId)){
            setIsLiked(true)
        }else{
            setIsLiked(false)
        }
    },[blogsLiked])

  return (
    <div className={`flex gap-3 justify-center absolute  top-[99.5%] items-center border-2 dark:border-footer_text_light dark:border-opacity-50   dark:bg-darkPrimary_grays bg-opacity-60 py-0.5vw px-1vw rounded-full`}>
        
     <div className='flex justify-center items-center'>
        <button className={`flex items-center gap-2 rounded-full overflow-hidden relative ${loader && "postReactionLoader"}`} style={{height:`${height + 0.5}vw`,width:`${width + 0.5}vw`}} onClick={handleLike}>
          {loader || <AnimatedHeartIcon height={height+"vw"} width={width+"vw"} loading={loading} liked={isLiked} />}
        </button>
          {loader || <span className='text-1.1vw'>{likes}</span>}
     </div>
     <div className='flex justify-center items-center'>
        <button className={`flex items-center gap-2 rounded-full p-0.1vw overflow-hidden relative ${loader && "postReactionLoader"}`} style={{height:`${height + 0.5}vw`,width:`${width + 0.5}vw`}} onClick={handleComment}>
          {loader || <CommentIcon height={height+"vw"} width={width+"vw"} />}
        </button>
          {loader || <span className='text-1.1vw'>{comments}</span>}
     </div>
     <div className='flex justify-center items-center'>
        <button className={`flex items-center rounded-full p-0.1vw overflow-hidden relative  ${loader && "postReactionLoader"}`} style={{height:`${height + 0.5}vw`,width:`${width + 0.5}vw`}}  onClick={handleShare}>
         {loader || <ShareIcon height={height+"vw"} width={width+"vw"} />}
        </button>
     </div>
    </div>
  )
}

export default BlogInteraction