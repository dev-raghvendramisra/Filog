import React from 'react';
import { BlogCard, BlogCardInteractionContainer, BlogInteraction, ErrorPlaceHolderImage } from '../../components';
import { NavLink } from 'react-router-dom';
import { useEmailAlertModal } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { updateLikes } from '../../store/userProfileSlice';
import { likeBlog, unlikeBlog } from '../../store/blogsSlice';

function PostCont({
  type = "dashboard",
  paginationLoad,
  initLoading = false,
  posts,
  dashboardErr,
  postLoading,
  customErrMsg = "",
  id = "main-dashboard-posts-cont",
}) {

   
  const {userData} = useSelector((state) => state.auth)
  const {userProfileId,blogsLiked} = useSelector((state) => {
    return {
      userProfileId: state.userProfile.$id,
      blogsLiked: state.userProfile.blogsLiked
    }
  }, (prev, next) =>{
     return prev.userProfileId==next.userProfileId && JSON.stringify(prev.blogsLiked)===JSON.stringify(next.blogsLiked)
    })
  const openModal = useEmailAlertModal()
  const dispatch = useDispatch()

  console.log("blog cont rerendered");


  return (
    <div id={id} className="h-fit w-fit py-1vw relative">
      <div id="main-post-cont" className="flex-col flex" style={{gap:"4.8vw"}}>
        {dashboardErr ? (
          <ErrorPlaceHolderImage customErrMsg={customErrMsg} type={dashboardErr} />
        ) : initLoading || postLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <BlogCard
              key={i}
              classNameBlogCardCont="flex-row w-fit gap-8"
              classNameBlogCardAuthorDateCont="mt-1vw"
              loader
            />
          ))
        ) : (
          posts.map((post) => (
          <BlogCardInteractionContainer 
          blogId={post.postID} 
          key={post.postID}
          authorName={post.authorName}
          userData={userData}
          userProfileId={userProfileId}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          blogTitle={post.title}
          blogTags={post.tags}
          authorAvatar={post.authorAvatar}
          createdAt={post.createdAt}
          blogImg={post.coverImageUrl}
          blogsLiked={blogsLiked}
          openModal={openModal}
          updateLikes={(type) => {
                    dispatch(updateLikes({ type, val: post.postID }))
                    dispatch(type === "like" ? likeBlog(post.postID) : unlikeBlog(post.postID))
                }}
           />
          ))
        )}
        
        {!initLoading && !postLoading && !dashboardErr && posts.length > 4 && (
          paginationLoad ? (
            <BlogCard
              key={"paginationLoader"}
              classNameBlogCardCont="flex-row w-fit gap-8"
              classNameBlogCardAuthorDateCont="mt-1vw"
              loader
            />
          ) : (
            <p className='text-center dark:text-footer_text_light text-footer_text'>Nothing more to display</p>
          )
        )}
      </div>
    </div>
  );
}

export default PostCont;
