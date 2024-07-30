import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { PostCard } from '../../Components';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';
import { useDispatch } from 'react-redux';
import { ID } from 'appwrite';


function Dashboard() {
  const [top, setTop] = React.useState(null)
  const [initLoading,setInitLoading] = React.useState(true)
  const tags = [React.useRef(),React.useRef()]
  const sideBar = React.useRef()
  const container = React.useRef()
  const dispatch = useDispatch()
  const { isUserLoggedIn, userData } = useSelector((state) => state.auth);
  const posts = useSelector((state)=>state.blogs)

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  React.useEffect(()=>{
    if(sideBar.current && container.current){
      console.log(sideBar.current.scrollHeight,sideBar.current.clientHeight);
     setTop(container.current.scrollHeight-sideBar.current.clientHeight)
    }

    const evt = new Event("click",{bubbles:true})
    tags[0].current.dispatchEvent(evt)
  },[])

  const handleClick = async({target})=>{
    setInitLoading(true)
    const res = await  getBlogPosts({ 
      userId:userData.$id,
      dispatch:dispatch,
      setBlogs:setBlogs,
      clearBlogs:clearBlogs,
      })
    setInitLoading(false)
    tags.forEach(({current})=>{
        current.classList.remove("btnActive")
    })
    target.classList.add("btnActive")
  }

  return (
    <div ref={container} className='h-100vh overflow-y-scroll justify-center flex pt-10vh' id="main-dashboard-cont"> 
        <div id="main-dashboard-posts-cont" className='h-fit w-50p border-2 relative border-white '>
          <div id="tag-container" className='h-fit flex text-1vw text-darkPrimary_grays dark:text-white dark:text-opacity-70 text-opacity-80 flex-start gap-6'>
          <button onClick={handleClick} ref={tags[0]} id="featured-blogs" className={`px-1.5vw py-0.5vw rounded-full`}>
             <i className="fa-solid fa-bolt mr-0.5vw"></i>
             Featured
          </button>  
          <button onClick={handleClick} ref={tags[1]} id="featured-blogs" className={`px-1.5vw py-0.5vw rounded-full`}>
             <i className="fa-solid fa-users mr-0.5vw"></i>    
             Following
          </button>  
          </div>
          
          <div id="main-post-cont">
             {initLoading?("loading")
             :(posts.map((post)=>(<PostCard 
              classNamePostCardCont='flex-row w-fit gap-8'
              classNamePostCardAuthorDateCont='h-fit mt-1vw'
              key={ID.unique()}
              title={post.title} 
               tags={post.tags}
               coverImage={post.coverImg}
               author={post.author}
               authorImg={post.authorImg}
               createdAt={post.createdAt}
              />)))}
          </div>
          
        </div>
        <div ref={sideBar} id="main-dashboard-sidebar-cont" className={`h-fit w-20p sticky  border-2 border-white`} style={{top:`-${top}px`}}>

        </div>

    </div>
  );
}

export default Dashboard;


// Dashboard


{/* <div className='h-100vh'>1</div>
          <div className='h-100vh'>2</div>
          <div className='h-100vh'>3</div>
          <div className='h-100vh'>4</div>
          <div className='h-100vh'>5</div>
        <div className='h-100vh'>1</div>
        <div className='h-100vh'>2</div>
        <div className='h-100vh'>3</div> */}