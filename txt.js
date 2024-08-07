import React from 'react';
import { ID } from 'appwrite';
import { PostCard, FollowingSecErr } from '../../Components';
import { useActionData, useNavigate , NavLink} from 'react-router-dom';
import { getBlogPosts } from '../../utils';
import { useDispatch } from 'react-redux';
import { clearBlogs, setBlogs } from '../../store/blogsSlice';

function PostCont({
  type = "dashboard",
  query=[],
  initLoading,
  posts,
  dashboardErr,
  setDashboardErr,
  id = "main-dashboard-posts-cont",
}) {
  const [postLoading, setPostLoading] = React.useState(true)
  const [offset, setOffset] = React.useState(0)
  const [paginationLoad, setPaginationLoad] = React.useState(false)
  const dispatch = useDispatch()
   
  const fetchPosts=async()=>{
    if(!paginationLoad) setPostLoading(true)
    const res = await getBlogPosts({query:query,limit:10,offset:offset,dispatch,clearBlogs,setBlogs})
    if(res.ok){
      setDashboardErr(null)
    }
    else if(!res.ok && res.pagination){
      setDashboardErr("post")
    }
    else if(!res.ok){
      setDashboardErr("post")
    }
    
    setPaginationLoad(false)
    setPostLoading(false)
  }


  const handlePagination = ()=>{
   if(!paginationLoad){
     if(window.scrollY+1+window.innerHeight>document.body.scrollHeight){
       console.log("fully scrolled")
        setOffset(offset+10)
        setPaginationLoad(true)
       }
   }
    
  }

  React.useEffect(()=>{

    if(!initLoading) fetchPosts()

  },[initLoading,offset])

  React.useState(()=>{
    
    if(!initLoading){
      if(offset){
         setOffset(0)
        }
      else fetchPosts()
    }

  },[query])




  return (
    <div id={id} className="h-fit w-100p  py-1vw relative">
      <div id="main-post-cont" className="flex-col flex gap-8 ">
        {initLoading || postLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <PostCard
                key={i}
                classNamePostCardCont="flex-row w-fit gap-8"
                classNamePostCardAuthorDateCont="mt-1vw"
                loader
              />
            ))
          : dashboardErr
          ? <FollowingSecErr type={dashboardErr} />
          : posts.map((post) => (
              <NavLink key={post.postID || ID.unique()} id={`postLink-${post.postID}`}  to={`/post/${post.postID}`}>
                <PostCard
                classNamePostCardCont="flex-row w-fit gap-8"
                classNamePostCardAuthorDateCont="h-fit mt-1vw"
                title={post.title}
                tags={post.tags}
                coverImage={post.coverImageUrl}
                author={post.authorName}
                authorImg={post.authorAvatar}
                createdAt={post.createdAt}
              />
              </NavLink>
            ))}
         {paginationLoad?
         <PostCard
          classNamePostCardCont="flex-row w-fit gap-8"
          classNamePostCardAuthorDateCont="h-fit mt-1vw" loader />
          :null}
      </div>
    </div>
  );
}

export default PostCont;
