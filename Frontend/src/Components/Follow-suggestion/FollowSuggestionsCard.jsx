import React from 'react';
import { dbServices } from '../../backend-services';
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner'
import {FollowToast, GenToast, ProfilePic} from '../../Components'

function FollowSuggestionsCard({
  type="dashboard",
  loader,
  suggestedUser,
  setFollowing,
  userProfileId,
  following,
  navigate,
  suggestionCont,
  classNameAvatar = "",
  classNameBtn = "",
  classNameCont = "",
  classNameUserName = "",
  className_UserName_Avatar_Cont = ""
}) {
  const [loading, setLoading] = React.useState(false);
  const [rerender, setRerender] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);

  const handleFollow_Unfollow = async () => {
    setLoading(true);
    if (isFollowing === false) {
      const updateFollowing = [...following, suggestedUser.userId]
      const res = await dbServices.updateFollowing(userProfileId, updateFollowing);
      if (res.$id) {
        toast.custom(<FollowToast avatar={suggestedUser.userAvatar} following>{suggestedUser.userName}</FollowToast>)
        setIsFollowing(true);
        setFollowing(updateFollowing)
      }
      else{
        toast.custom(<GenToast type='err'>Internal server error</GenToast>)
      }
    }
    else if (isFollowing === true) {
      const updateFollowing = following.filter((userId)=>userId!==suggestedUser.userId)
      const res = await dbServices.updateFollowing(userProfileId, updateFollowing);
      if (res.$id) setIsFollowing(false);
      setFollowing(updateFollowing)
      toast.custom(<FollowToast avatar={suggestedUser.userAvatar}>{suggestedUser.userName}</FollowToast>)
    }
    else{
      toast.custom(<GenToast type='err'>Internal server error</GenToast>)
    }
    setLoading(false);
  };

  React.useEffect(()=>{
   const timer =  loader?setTimeout(() => {
       setRerender(true);
    }, 100):null
    return ()=>clearTimeout(timer)
  },[])

   if( rerender && suggestionCont && loader && suggestionCont.current.clientHeight==suggestionCont.current.scrollHeight){
    return null
   }

  return (
    <div
      id={`suggestion-${loader ? "skeleton" : suggestedUser.userId}`}
      onClick={
        ({target})=>{
           target.nodeName!=="BUTTON" && target.nodeName !== "I" ? navigate(`/user/${suggestedUser.userId}`):null
        }
      }
      className={`cursor-pointer flex items-center text-1vw text-darkPrimary_grays dark:text-white justify-between p-1vw rounded-2xl border-2 dark:bg-darkPrimary_grays border-opacity-100 dark:border-footer_text_light dark:border-opacity-50 ${classNameCont}`}
    >
      <div
        id="name-avatar-cont"
        className={`flex gap-3 items-center ${className_UserName_Avatar_Cont}`}
      >
        <div
          id="img-wrapper"
          className={`rounded-full h-2.5vw w-2.5vw ${loader ? "bg-slate-200 dark:bg-darkPrimary postCardLoader" : ""}`}
        >
          {loader ? null : (
            <ProfilePic height="h-full" width='w-full' src={suggestedUser.userAvatar} className={classNameAvatar} />
          )}
        </div>
        <div
          id="name-wrapper"
          className={`${loader ? "bg-slate-200 h-2vw w-8vw rounded-2xl dark:bg-darkPrimary postCardLoader" : ""}`}
        >
          {loader ? null : (
            <p id="user-name" className={`${classNameUserName}`}>
              {suggestedUser.userName}
            </p>
          )}
        </div>
      </div>
      {loader ? null : (
        <button
          id="follow-btn"
          className={` ${classNameBtn}`}
          onClick={handleFollow_Unfollow}
        >
          {loading ? (
            <ColorRing
            visible={true}
            height="2vw"
            width="2vw"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={JSON.parse(localStorage.getItem("isDark"))
              ?['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']
              :['#242535','#242535','#242535','#242535','#242535']}
            />

          ) : isFollowing ? (
            <i className="fa-solid fa-user-group text-primary dark:text-primary_darkMode hover:scale-125 transition-transform"></i>
          ) : (
            <i className="fa-solid fa-user-plus hover:scale-125 transition-transform"></i>
          )}
        </button>
      )}
    </div>
  );
}

export default FollowSuggestionsCard;
