import React from 'react'
import { BlogCardInteractionContainer, HomeHero, HomeUpper } from '../../components'
import { useSelector } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';
import { updateLikes } from '../../store/userProfileSlice';
import { likeBlog, unlikeBlog,commentOnBlog, deleteComment } from '../../store/blogsSlice';
import { useDispatch } from 'react-redux';
import {Navigate} from 'react-router-dom'
import { useEmailAlertModal } from '../../hooks';
import {useCommentFormModal} from '../../hooks';

function Home() {
  const posts = useSelector((state)=>state.blogs)
  const {isUserLoggedIn, userData} = useSelector((state)=>state.auth)
  const userProfile = useSelector(state=>state.userProfile)
  const dispatch = useDispatch()
  const openAlertModal = useEmailAlertModal()
  const openCommentModal = useCommentFormModal(userData?.$id)

  React.useEffect(()=>{
    getBlogPosts({ 
      dispatch:dispatch,
      setBlogs:setBlogs,
      clearBlogs:clearBlogs,
      limit:15
      })
  },[])

  if (isUserLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className='flex flex-col justify-start gap-80 items-center mb-6vw'  style={{ marginTop: "12vh" }}>
      <HomeUpper />
      {/* <h1>Get Featured</h1> */}

      <div  className='homeGrid'>
        {posts[0].title!==""
        && posts.map((post)=>(
          <BlogCardInteractionContainer 
          blogId={post.postID} 
          key={post.postID}
          blogCardType="vertical"
          authorName={post.authorName}
          userData={userData}
          userProfileId={userProfile.$id}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          blogTitle={post.title}
          blogTags={post.tags}
          authorAvatar={post.authorAvatar}
          createdAt={post.createdAt}
          blogImg={post.coverImageUrl}
          authorId={post.userId}
          blogsLiked={userProfile.blogsLiked}
          openAlertModal={openAlertModal}
          openCommentModal={openCommentModal}
          updateLikes={(type) => {
                    dispatch(updateLikes({ type, val: post.postID }))
                    dispatch(type === "like" ? likeBlog(post.postID) : unlikeBlog(post.postID))
                }}
          updateComments={(type) => {
            dispatch(type === "add" ? commentOnBlog(post.postID) : deleteComment(post.postID))
          }}
           />
         ))
        }
      </div>
      <HomeHero />
    </div>
  )
}

export default Home