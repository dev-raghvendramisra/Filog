import React from 'react';
import { PostCont } from '../../Components';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogPosts } from '../../utils';
import { setBlogs, clearBlogs } from '../../store/blogsSlice';
import { Query } from 'appwrite';

function FeaturedPosts() {
    const posts = useSelector(state => state.blogs);
    const userProfile = useSelector(state => state.userProfile);
    
    const [paginationLoad, setPaginationLoad] = React.useState(true);
    const [postLoading, setPostLoading] = React.useState(true);
    const [offset, setOffset] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    const [initLoading, setInitLoading] = React.useState(true);
    
    const dispatch = useDispatch();
    const [query , setQuery] = React.useState([])
    const [isFetching, setIsFetching] = React.useState(false)
    let container;

    const handlePagination = React.useCallback(() => {
        if (
            paginationLoad &&
            !postLoading &&
            !isFetching &&
            container.clientHeight + container.scrollTop + 1 > container.scrollHeight
        ) {
            setOffset(prevOffset => limit === 3 ? prevOffset + 3 : prevOffset + 10);
            setLimit(3);
        }
    }, [paginationLoad, postLoading, isFetching, limit]);



    const fetchPosts = async () => {
        setIsFetching(true)
        const res = await getBlogPosts({
            query,
            limit,
            offset,
            dispatch,
            clearBlogs,
            setBlogs
        });
        if (!res.ok) {
            setPaginationLoad(false);
        }
        setPostLoading(false);
        setIsFetching(false)
    };



    React.useEffect(() => {
        if (!initLoading) {
            fetchPosts();
        }
    }, [initLoading, offset,limit]);



    React.useEffect(() => {
        if (userProfile.$id !== "") {
            setInitLoading(false);
            setQuery([Query.notEqual("userId", [userProfile.userId])]);
        }
    }, [userProfile.$id]);



    React.useEffect(() => {
        container = document.getElementById("main-dashboard-cont");
        container.addEventListener("scroll", handlePagination);
        return () => {
            container.removeEventListener("scroll", handlePagination);
        };
    }, [handlePagination]);
    


    // React.useEffect(() => {
    //     paginationLoadRef.current = paginationLoad;
    //     postLoadingRef.current = postLoading;
    //     limitRef.current = limit;
    // }, [paginationLoad, postLoading,limit]);




    

    return (
        <PostCont
            initLoading={initLoading}
            posts={posts}
            paginationLoad={paginationLoad}
            postLoading={postLoading}
        />
    );
}

export default FeaturedPosts;
