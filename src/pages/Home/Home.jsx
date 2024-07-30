import React from 'react'
import { HomeHero, HomeUpper } from '../../Components'
import {PostCard} from '../../Components';
import { useSelector } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';
import { useDispatch } from 'react-redux';
import { ID } from 'appwrite';


function Home() {
  const posts = useSelector((state)=>state.blogs)
  const dispatch = useDispatch()
  React.useEffect(()=>{
    getBlogPosts({ //(caching)calling the getBlogPosts util to fetch the posts before redirecting user to dashboard 
      dispatch:dispatch,
      setBlogs:setBlogs,
      clearBlogs:clearBlogs,
      })
  },[])
  console.log(posts)
  return (
    <div className='flex flex-col justify-start gap-80 items-center min-h-100vh  mb-6vw'>
      <HomeUpper />
      {/* <h1>Get Featured</h1> */}

      <div  className='homeGrid'>
        {posts[0].title!==""?posts.map((post)=>(<PostCard 
        key={ID.unique()}
        title={post.title} 
         tags={post.tags}
         coverImage={post.coverImg}
         author={post.author}
         authorImg={post.authorImg}
         createdAt={post.createdAt}
        />)):null}
      </div>
      <HomeHero />
    </div>
  )
}

export default Home