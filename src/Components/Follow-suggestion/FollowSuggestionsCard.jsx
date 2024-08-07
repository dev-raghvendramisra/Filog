import React from 'react';
import { dbServices } from '../../backend-services';
import getUserProfile from '../../utils/getUserProfile';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';  
import { clearProfile, setProfile } from '../../store/userProfileSlice';
import { ColorRing } from 'react-loader-spinner'
import {ProfilePic} from '../../Components'

function FollowSuggestionsCard({
  type="dashboard",
  loader,
  suggestedUser,
  userId,
  setFollowing,
  userProfileId,
  following,
  classNameAvatar = "",
  classNameBtn = "",
  classNameCont = "",
  classNameUserName = "",
  className_UserName_Avatar_Cont = ""
}) {
  const [loading, setLoading] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const dispatch = useDispatch()

  const followUser = async () => {
    setLoading(true);
    if (isFollowing === false) {
      const updateFollowing = [...following, suggestedUser.userId]
      console.log(updateFollowing);
      
      const res = await dbServices.updateFollowing(userProfileId, updateFollowing);
      if (res.$id) {
        toast(`Following, ${suggestedUser.userName}`, {
         icon:<img src={suggestedUser.userAvatar} className='h-2vw rounded-full'/>
        });
        setIsFollowing(true);
        setFollowing(updateFollowing)
        setLoading(false);

        // await getUserProfile({userId,clearProfile,setProfile,dispatch});
      }
    }
    else if (isFollowing === true) {
      const updateFollowing = following.filter((userId)=>userId!==suggestedUser.userId)
      const res = await dbServices.updateFollowing(userProfileId, updateFollowing);
      if (res.$id) setIsFollowing(false);
      setFollowing(updateFollowing)
      setLoading(false)
      toast(`Unfollowed, ${suggestedUser.userName}`, {
        icon:<img src={suggestedUser.userAvatar} className='h-2vw rounded-full'/>
       });

    }
  };

  return (
    <div
      id={`suggestion-${loader ? "skeleton" : suggestedUser.userId}`}
      className={`flex items-center text-1vw text-darkPrimary_grays dark:text-white justify-between p-1vw rounded-2xl border-2 dark:bg-darkPrimary_grays dark:border-footer_text_light dark:border-opacity-50 ${classNameCont}`}
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
            <ProfilePic height="h-full" width='w-full' src={suggestedUser.userAvatar} />
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
          className={`${classNameBtn}`}
          onClick={followUser}
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
            <i className="fa-solid fa-user-group text-primary"></i>
          ) : (
            <i className="fa-solid fa-user-plus"></i>
          )}
        </button>
      )}
    </div>
  );
}

export default FollowSuggestionsCard;
