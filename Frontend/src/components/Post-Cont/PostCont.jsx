import React from 'react';
import { ID } from 'appwrite';
import { BlogCard, BlogInteraction, ErrorPlaceHolderImage } from '../../components';
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
  const userProfileId = useSelector((state) => state.userProfile.$id, (prev, next) => prev === next)
  const openModal = useEmailAlertModal()
  const dispatch = useDispatch()

  console.log("blog cont rerendered");
  

  return (
    <div id={id} className="h-fit w-fit py-1vw relative">
      <div id="main-post-cont" className="flex-col flex gap-4vw">
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
           <div key={post.postID || ID.unique()} className='relative'>
             <NavLink id={`postLink-${post.postID}`} to={`/post/${post.postID}`}>
              <BlogCard
                classNameBlogCardCont="flex-row w-fit gap-8"
                classNameBlogCardAuthorDateCont="h-fit mt-1vw"
                title={post.title}
                tags={post.tags}
                coverImage={post.coverImageUrl}
                author={post.authorName}
                authorImg={post.authorAvatar}
                createdAt={post.createdAt}
              />
            </NavLink>
            <BlogInteraction  
            userData={userData} 
            userProfileId={userProfileId} 
            blogId={post.postID} 
            openModal={openModal} 
            authorName={post.authorName}
            updateLikes={(type,blogId)=>{
              dispatch(updateLikes({type,blogId}))
              dispatch(type==="like"?likeBlog(blogId):unlikeBlog(blogId))
            }}  />
           </div>
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
