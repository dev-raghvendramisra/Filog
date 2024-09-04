import React from 'react'
import {AnimatedHeartIcon, CommentIcon, GenToast, ShareIcon} from '..'
import { dbServices } from '../../services'

function BlogInteraction({blogsLiked=[],blogId,userData,openModal,likes=0, comments=0, height="1.7vw", width="1.7vw",loader=false}) {
    const [isLiked, setIsLiked] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
  
    const handleLike = async() => {
        if(disabled) return
        setDisabled(true)
        if(userData.emailVerification === false){
            openModal(true)
            return <GenToast type='err'>Verify your email address to like blogs</GenToast>
        }
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
    <div className={`flex gap-3 justify-center absolute left-[1%] top-[99.5%] items-center border-2 dark:border-footer_text_light dark:border-opacity-50 border-t-1  dark:bg-darkPrimary_grays bg-opacity-60 py-0.5vw px-1vw rounded-full`}>
        <button className={`flex items-center gap-2 rounded-full p-0.1vw overflow-hidden relative ${loader && "postReactionLoader"}`} style={{height,width}} onClick={handleLike}>
          {loader || <AnimatedHeartIcon height={height} width={width} loading={loading} liked={isLiked} />}
          {loader || <span>{likes}</span>}
        </button>
        <button className={`flex items-center gap-2 rounded-full p-0.1vw overflow-hidden relative ${loader && "postReactionLoader"}`} style={{height,width}} onClick={handleComment}>
          {loader || <CommentIcon height={height} width={width} />}
          {loader || <span>{comments}</span>}
        </button>
        <button className={`flex items-center rounded-full p-0.1vw overflow-hidden relative  ${loader && "postReactionLoader"}`} style={{height,width}}  onClick={handleShare}>
         {loader || <ShareIcon height={height} width={width} />}
        </button>
    </div>
  )
}

export default BlogInteraction