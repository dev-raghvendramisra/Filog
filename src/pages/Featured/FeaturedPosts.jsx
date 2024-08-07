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
    const [initLoading, setInitLoading] = React.useState(true);
    
    const dispatch = useDispatch();
    const query = [];
    
    const paginationLoadRef = React.useRef(paginationLoad);
    const postLoadingRef = React.useRef(postLoading);
    const isFetching = React.useRef(false);

    const handlePagination = () => {
        if (
            paginationLoadRef.current &&
            !postLoadingRef.current &&
            !isFetching.current &&
            window.innerHeight + window.scrollY + 1 > document.body.scrollHeight
        ) {
            setOffset(prevOffset => prevOffset + 10);
        }
    };

    const fetchPosts = async (offset) => {
        isFetching.current = true;
        const res = await getBlogPosts({
            query,
            limit: 10,
            offset,
            dispatch,
            clearBlogs,
            setBlogs
        });
        if (!res.ok) {
            setPaginationLoad(false);
        }
        setPostLoading(false);
        isFetching.current = false;
    };

    React.useEffect(() => {
        if (!initLoading) {
            query.push(Query.notEqual("userId", [userProfile.userId]));
            fetchPosts(offset);
        }
    }, [initLoading, offset]);

    React.useEffect(() => {
        if (userProfile.$id !== "") {
            setInitLoading(false);
        }
    }, [userProfile.$id]);

    React.useEffect(() => {
        window.addEventListener("scroll", handlePagination);
        return () => {
            window.removeEventListener("scroll", handlePagination);
        };
    }, []);

    React.useEffect(() => {
        paginationLoadRef.current = paginationLoad;
        postLoadingRef.current = postLoading;
    }, [paginationLoad, postLoading]);


    

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
