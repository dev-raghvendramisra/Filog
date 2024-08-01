import React from 'react';
import { ID } from 'appwrite';
import { PostCard, FollowingSecErr } from '../../Components';
import { useNavigate } from 'react-router-dom';

function PostCont({
  refs,
  handleClick = () => {},
  type = "dashboard",
  initLoading,
  posts,
  followingSectionErr,
  id = "main-dashboard-posts-cont",
}) {
  const navigate = useNavigate();

  return (
    <div id={id} className="h-fit w-50p py-1vw relative">
      {type === "dashboard" && (
        <div
          id="tag-container"
          className="h-fit flex text-1vw text-darkPrimary_grays dark:text-white dark:text-opacity-70 text-opacity-80 flex-start gap-3"
        >
          <button
            onClick={handleClick}
            ref={refs[0]}
            id="featured-blogs"
            className="px-1.5vw py-0.5vw rounded-full"
          >
            <i className="fa-solid fa-bolt mr-0.5vw"></i>
            Featured
          </button>
          <button
            onClick={handleClick}
            ref={refs[1]}
            id="following-blogs"
            className="px-1.5vw py-0.5vw rounded-full"
          >
            <i className="fa-solid fa-users mr-0.5vw"></i>
            Following
          </button>
        </div>
      )}

      <div id="main-post-cont" className="flex-col flex gap-8 py-1vw">
        {initLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <PostCard
                key={i}
                classNamePostCardCont="flex-row w-fit gap-8"
                classNamePostCardAuthorDateCont="mt-1vw"
                loader
              />
            ))
          : followingSectionErr
          ? <FollowingSecErr error={followingSectionErr} />
          : posts.map((post) => (
              <PostCard
                onClick={() => {
                  navigate(`/post/${post.postID}`);
                }}
                classNamePostCardCont="flex-row w-fit gap-8"
                classNamePostCardAuthorDateCont="h-fit mt-1vw"
                key={post.postID || ID.unique()} 
                title={post.title}
                tags={post.tags}
                coverImage={post.coverImg}
                author={post.author}
                authorImg={post.authorImg}
                createdAt={post.createdAt}
              />
            ))}
      </div>
    </div>
  );
}

export default PostCont;
