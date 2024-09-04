import React from 'react'
import { BlogInteraction, HomeHero, HomeUpper } from '../../components'
import {BlogCard} from '../../components';
import { useSelector } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';
import { useDispatch } from 'react-redux';
import { ID } from 'appwrite';
import { NavLink } from 'react-router-dom';
import {Navigate} from 'react-router-dom'
import { useEmailAlertModal } from '../../hooks';

function Home() {
  const posts = useSelector((state)=>state.blogs)
  const {isUserLoggedIn, userData} = useSelector((state)=>state.auth)
  const {blogsLiked} = useSelector(state=>state.userProfile)
  const dispatch = useDispatch()
  const openModal = useEmailAlertModal()

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
         <div className='relative' key={post.postID}>
        <NavLink to={`/post/${post.postID}`} id={`post-${post.postID}`}>
          <BlogCard 
          type='vertical'
          title={post.title} 
          tags={post.tags}
          coverImage={post.coverImageUrl}
          author={post.authorName}
          authorImg={post.authorAvatar}
          createdAt={post.createdAt}
          />
        </NavLink>
        <BlogInteraction openModal={openModal} blogId={post.postID} userData={userData} blogsLiked={blogsLiked} /> 
      </div> 
         ))
        }
      </div>
      <HomeHero />
    </div>
  )
}

export default Home