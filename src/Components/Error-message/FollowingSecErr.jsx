import React from 'react';

function FollowingSecErr({ error }) {
  return (
    <div className="flex w-100p justify-center flex-col items-center">
      <img 
        className="h-20vw" 
        src={error.length > 0 ? "/noFollowingPost-err-2.svg" : "/noFollowing-err-1.svg"} 
        alt={error.length > 0 ? "No posts from followed users" : "No followed users"} 
      />
      <h1 className="w-60p text-1.1vw text-center">
        {error.length > 0 
          ? "The people you follow haven't posted any blogs yet. Check back later for updates!" 
          : "You haven't followed anyone yet. Follow some people to see their blogs in this section!"
        }
      </h1>
    </div>
  );
}

export default FollowingSecErr;
