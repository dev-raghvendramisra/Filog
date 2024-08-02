import React from 'react'
import { HomeHero, HomeUpper } from '../../Components'
import {PostCard} from '../../Components';
import { useSelector } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';
import { useDispatch } from 'react-redux';
import { ID, Query } from 'appwrite';


function Home() {
  const posts = useSelector((state)=>state.blogs)
  const dispatch = useDispatch()

  React.useEffect(()=>{
    getBlogPosts({ 
      dispatch:dispatch,
      setBlogs:setBlogs,
      clearBlogs:clearBlogs,
      query:[Query.limit(15)]
      })
  },[])

  return (
    <div className='flex flex-col justify-start gap-80 items-center mb-6vw'  style={{ marginTop: "12vh" }}>
      <HomeUpper />
      {/* <h1>Get Featured</h1> */}

      <div  className='homeGrid'>
        {posts[0].title!==""?posts.map((post)=>(<PostCard 
        classNamePostCardCont='flex-col gap-4'
        key={ID.unique()}
        title={post.title} 
         tags={post.tags}
         coverImage={post.coverImageUrl}
         author={post.authorName}
         authorImg={post.authorAvatar}
         createdAt={post.createdAt}
        />)):null}
      </div>
      <HomeHero />
    </div>
  )
}

export default Home