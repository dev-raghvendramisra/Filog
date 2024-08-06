import React from 'react';
import { FollowingSecErr, FollowSuggestionsCard } from "../../Components";



function SideBarDash({ contRef, userData,suggestedUsers, initLoading, sideBarLoading }) {
  const sideBar = React.useRef();
  const [topOffset, setTopOffset] = React.useState("");
  const [following, setFollowing] = React.useState(userData.following)

  React.useEffect(() => {
    if (sideBar.current && contRef.current) {
      const topOffset = contRef.current.clientHeight - sideBar.current.clientHeight;
      setTopOffset(topOffset);
    }
  }, [contRef, sideBar]);

  React.useEffect(()=>{
    setFollowing(userData.following)
  },[userData])

  return (
    <div
      ref={sideBar}
      id='main-dashboard-sidebar-cont'
      className='w-18p h-fit sticky py-1.8vw '
      style={{ top: `${topOffset}px` }}
    >
      <h1 className='font-medium text-1.2vw'>You may follow</h1>
      <div
        id="sidebar-suggestion-cont"
        className='h-60vh bg-sate-200 overflow-scroll pb-1vw mt-1vw px-0 flex flex-col gap-6 hideScrollbar relative border-light-mode scrollScrim '
      > 
        {initLoading || sideBarLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <FollowSuggestionsCard loader key={index} />
            ))
          : suggestedUsers.length==0?
            <FollowingSecErr type="user"  classNameImg='h-14vw opacity-70 dark:opacity-80' classNameText='text-0.9vw w-80p '
            userErrMsg='No users found. Please try again later or adjust your search criteria.'/>
          :
           suggestedUsers.map((user)=>(
            <FollowSuggestionsCard
              key={user.profileId}
              userId={userData.userId}
              userProfileId={userData.$id}
              suggestedUser={user}
              following={following}
              setFollowing={setFollowing}
            />
          ))}
      </div>
      <div id="footer-cont-sidebar" className='h-60vh'></div>
    </div>
  );
}



export default SideBarDash;
