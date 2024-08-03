import React from 'react'
import {dbServices} from '../../backend-services'
import getUserProfile from '../../utils/getUserProfile';
import toast from 'react-hot-toast';
import { ID } from 'appwrite';

function FollowSuggestionsCard({
    suggestedUser,
    userId,
    userProfileId,
    following,
    classNameAvatar="",
    classNameBtn="",
    classNameCont="",
    classNameUserName="",
    className_UserName_Avatar_Cont=""
}) {
  const [loading, setLoading] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false)

  const followUser = async()=>{
   setLoading(true)
   if(isFollowing==false){
    following.push(suggestedUser.userId)
    const res = await dbServices.updateFollowing(userProfileId,following)
    if(res.$id) {
     toast.success("You started following",suggestedUser.userName,{
        style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        width:"fit-content",
        fontSize:"1vw",
      }})

     setIsFollowing(true);
     await getUserProfile(userId)
    }
   }
//    else if(isFollowing==true){
//     const res = await dbServices.updateFollowing(userData.$id,following)//we are not popping the user from following array here because we are not updatig userPorfile data on frontend after following that means following array is s
//     if(res.$id) setIsFollowing(false)
//    }
   setLoading(false)
  }

  return (
    <div id={`suggestion-${suggestedUser.userId}`}
    className={` flex items-center text-1vw justify-between p-1vw rounded-2xl border-2 dark:bg-darkPrimary_grays dark:border-footer_text_light dark:border-opacity-50 ${classNameCont} `}
    >
        <div id="name-avatar-cont"
        className={`flex gap-3 items-center ${className_UserName_Avatar_Cont}`}
        >
        <img id="user-avatar" onError={({target})=>target.src="/userPfpFallback.webp"} src={suggestedUser.userAvatar}
        className={`h-2.5vw w-auto object-cover rounded-full ${classNameAvatar}`}
         />
        <p id="user-name" className={`${classNameUserName}`}>{suggestedUser.userName}</p>
        </div>
        <button id="follow-btn" className={`${classNameBtn}`}
        onClick={followUser}>
         {loading?`loading...`
         :isFollowing?
         <i className="fa-solid fa-user-group"></i>
         :<i className="fa-solid fa-user-plus"></i>}
        </button>
    </div>
  )
}

export default FollowSuggestionsCard