import React from 'react';
import { ID } from 'appwrite';
import { PostCard, FollowingSecErr } from '../../Components';
import { NavLink } from 'react-router-dom';

function PostCont({
  type = "dashboard",
  paginationLoad,
  initLoading,
  posts,
  dashboardErr,
  postLoading,
  id = "main-dashboard-posts-cont",
}) {

 

  return (
    <div id={id} className="h-fit w-fit py-1vw relative">
      <div id="main-post-cont" className="flex-col flex gap-8">
        {dashboardErr ? (
          <FollowingSecErr type={dashboardErr} />
        ) : initLoading || postLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <PostCard
              key={i}
              classNamePostCardCont="flex-row w-fit gap-8"
              classNamePostCardAuthorDateCont="mt-1vw"
              loader
            />
          ))
        ) : (
          posts.map((post) => (
            <NavLink key={post.postID || ID.unique()} id={`postLink-${post.postID}`} to={`/post/${post.postID}`}>
              <PostCard
                classNamePostCardCont="flex-row w-fit gap-8"
                classNamePostCardAuthorDateCont="h-fit mt-1vw"
                title={post.title}
                tags={post.tags}
                coverImage={post.coverImageUrl}
                author={post.authorName}
                authorImg={post.authorAvatar}
                createdAt={post.createdAt}
              />
            </NavLink>
          ))
        )}
        
        {!initLoading && !postLoading && !dashboardErr && posts.length > 0 && (
          paginationLoad ? (
            <PostCard
              key={"paginationLoader"}
              classNamePostCardCont="flex-row w-fit gap-8"
              classNamePostCardAuthorDateCont="mt-1vw"
              loader
            />
          ) : (
            <p className='text-center'>Nothing more to display</p>
          )
        )}
      </div>
    </div>
  );
}

export default PostCont;