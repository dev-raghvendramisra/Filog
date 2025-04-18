import React from 'react';
import { BlogCard, BlogCardInteractionContainer, ErrorPlaceHolderImage } from '../../components';
import { useEmailAlertModal } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { updateLikes } from '../../store/userProfileSlice';
import { likeBlog, unlikeBlog, deleteComment, commentOnBlog } from '../../store/blogsSlice';
import {useCommentFormModal} from '../../hooks';
import usePlatformContext from '../../context/platformContext';

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
  const {mobile} = usePlatformContext()
  const {blogsLiked} = useSelector((state) => {
    return {
      userProfileId: state.userProfile._id,
      blogsLiked: state.userProfile.blogsLiked
    }
  }, (prev, next) =>{
     return prev.userProfileId==next.userProfileId && JSON.stringify(prev.blogsLiked)===JSON.stringify(next.blogsLiked)
    })
  const openAlertModal = useEmailAlertModal()
  const openCommentModal = useCommentFormModal(userData._id)
  const dispatch = useDispatch()

  const[cardLayout, setCardLayout] = React.useState("horizontal")
  const setLayout = ()=>{
    ;
    
    if(mobile){
      setCardLayout("vertical")
    }
    else setCardLayout("horizontal")
  }
  
  React.useEffect(()=>{
     setLayout()
  },[mobile])



  return (
    <div id={id} className="h-fit w-fit py-1vw relative transition-all">
      <div id="main-post-cont" className="flex-col flex gap-8 transition-all">
        {dashboardErr ? (
          <ErrorPlaceHolderImage customErrMsg={customErrMsg} type={dashboardErr} />
        ) : initLoading || postLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <BlogCard
              key={i}
              classNameBlogCardCont="flex-row w-fit gap-8"
              classNameBlogCardAuthorDateCont="mt-1vw"
              loader
              mobile={mobile}
            />
          ))
        ) : (
          posts.map((post) => (
          <BlogCardInteractionContainer 
          blogId={post.postID} 
          key={post.postID}
          authorName={post.authorName}
          userData={userData}
          authorUserName={post.authorUserName}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          blogTitle={post.title}
          blogTags={post.tags}
          slug={post.slug}
          authorAvatar={post.authorAvatar}
          authorId={post.authorId}
          createdAt={post.createdAt}
          blogImg={post.coverImageURI}
          blogsLiked={blogsLiked}
          openAlertModal={openAlertModal}
          blogCardType={cardLayout}
          openCommentModal={openCommentModal}
          mobile={mobile}
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
