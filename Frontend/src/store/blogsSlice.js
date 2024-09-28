import { createSlice } from "@reduxjs/toolkit";

const initialState =[
    {postID:"",
     title:"",
     content:"",
     createdAt:"",
     author:"",
     coverImageUrl:"",
     subImageUrl:[],
     coverImageId:"",
     subImageId:[],
     authorId:"",
     authorImg:"",
     tags:[],
     likeCount:null,
     commentCount:null
    }
]


const blogsSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{
        setBlogs:(state,{payload})=>{         
          payload.forEach(blogData => {
              const newBlog = {
                  postID:blogData.$id,
                  title:blogData.title,
                  content:blogData.content,
                  createdAt:blogData.createdAt,
                  authorId:blogData.userId,
                  authorName:blogData.authorData.fullName,
                  authorAvatar:blogData.authorData.userAvatar,
                  coverImageUrl:blogData.coverImageUrl,
                  subImageUrl:blogData.subImageUrl,
                  coverImageId:blogData.coverImageId,
                  subImageId:blogData.subImageId,
                  tags:blogData.tags,
                  likeCount:blogData.likeCount==null ? 0 : blogData.likeCount,
                  commentCount:blogData.commentCount==null ? 0 : blogData.commentCount
              }
              state.push(newBlog)
          });
        },
        clearBlogs:(state,action)=>{
            return []
        },
        likeBlog:(state,{payload})=>{
            const blog = state.find(blog=>blog.postID===payload)
            blog.likeCount==null ? blog.likeCount=1 : blog.likeCount++
        },  
        unlikeBlog:(state,{payload})=>{
            const blog = state.find(blog=>blog.postID===payload)
            blog.likeCount>0 && blog.likeCount--
        },
        commentOnBlog:(state,{payload})=>{
            const blog = state.find(blog=>blog.postID===payload)
            blog.commentCount==null ? blog.commentCount=1 : blog.commentCount++
        },
        deleteComment:(state,{payload})=>{
            const blog = state.find(blog=>blog.postID===payload)
            blog.commentCount>0 && blog.commentCount--
        }
}})


export default blogsSlice.reducer
export const{clearBlogs,setBlogs,likeBlog,unlikeBlog, commentOnBlog, deleteComment} = blogsSlice.actions