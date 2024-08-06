import React from 'react';

function FollowingSecErr({ 
  type="post",
  postErrMsg= "The people you follow haven't posted any blogs yet. Check back later for updates!" ,
  userErrMsg="You haven't followed anyone yet. Follow some people to see their blogs in this section!",
  classNameText="",
  classNameImg="",
  classNameCont="" }) {
  
  
  return (
    <div className={`flex w-100p justify-center text-1.1vw flex-col items-center ${classNameCont}`}>
      <img 
        className={`h-20vw ${classNameImg}`}
        src={type=="post" ? "/noFollowingPost-err-2.svg" : "/noFollowing-err-1.svg"} 
        alt={type=="post" ? "No posts from followed users" : "No followed users"} 
      />
      <h1 className={`w-60p  text-center  ${classNameText}`}>
        {type=="post" 
          ? postErrMsg
          : userErrMsg
        }
      </h1>
    </div>
  );
}

export default FollowingSecErr;
