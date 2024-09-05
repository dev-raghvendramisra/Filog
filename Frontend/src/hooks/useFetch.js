import React from 'react'
import { getBlogPosts, getUsersUtil } from '../utils'
import {clearUsers, setUsers} from '../store/usersSlice'
import {setBlogs, clearBlogs} from '../store/blogsSlice'
import { useDispatch } from 'react-redux'

const useFetch = ({type="user",initLoading,offset,limit,query,container,id,setErr,following}) =>{
   const [containerLoading, setContainerLoading] = React.useState(true)
   const [paginationLoad, setPaginationLoad] = React.useState(true)
   const [isFetching, setIsFetching] = React.useState(false)
   const [errInFetching, setErrInFetching] = React.useState(false)
   const dispatch = useDispatch()

   const fetchUsers = async () => {
    console.log("fetching...");
    
    if(following && !following.length){
      setErr("user")
      setPaginationLoad(false)
      return;
    }
    setIsFetching(true);
    // setErrInFetching(false);
    
    const res = type=="user"
    ? await getUsersUtil({ offset, limit, query, dispatch, clearUsers, setUsers })
    : await getBlogPosts({offset,limit,query,dispatch,setBlogs,clearBlogs})


    if (res.pagination && !res.ok) {
      setPaginationLoad(false);
    } else if (!res.ok) {
      setErr
      ?setErr("post")
      :setErrInFetching(true);
    }

    setIsFetching(false);
    id?document.getElementById(id):container.classList.add('overflow-scroll')
    setContainerLoading(false);
  };
  

  React.useEffect(()=>{
    if(!initLoading){
        fetchUsers()
    }
  },[initLoading,offset])


  return [containerLoading, paginationLoad, isFetching, errInFetching]

}

export default useFetch



