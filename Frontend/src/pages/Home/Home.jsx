import React from 'react'
import { HomeHero, HomeUpper } from '../../components'
import {PostCard} from '../../components';
import { useSelector } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';
import { useDispatch } from 'react-redux';
import { ID } from 'appwrite';
import { NavLink } from 'react-router-dom';
import {Navigate} from 'react-router-dom'

function Home() {
  const posts = useSelector((state)=>state.blogs)
  const isUserLoggedIn = useSelector((state)=>state.auth.isUserLoggedIn)
  const dispatch = useDispatch()

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
        {posts[0].title!==""?posts.map((post)=>(
        <NavLink to={`/post/${post.postID}`} id={`post-${post.postID}`} key={ID.unique()}>
          <PostCard 
        classNamePostCardCont='flex-col gap-4'
        title={post.title} 
         tags={post.tags}
         coverImage={post.coverImageUrl}
         author={post.authorName}
         authorImg={post.authorAvatar}
         createdAt={post.createdAt}
        />
        </NavLink>)):null}
      </div>
      <HomeHero />
    </div>
  )
}

export default Home