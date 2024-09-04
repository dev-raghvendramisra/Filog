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
     likes:null
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
                  authorName:blogData.authorName,
                  authorAvatar:blogData.authorAvatar,
                  coverImageUrl:blogData.coverImageUrl,
                  subImageUrl:blogData.subImageUrl,
                  coverImageId:blogData.coverImageId,
                  subImageId:blogData.subImageId,
                  tags:blogData.tags,
                  likes:blogData.likes
              }
              state.push(newBlog)
          });
        },

        clearBlogs:(state,action)=>{
            return []
        },
        likeBlog:(state,{payload})=>{
            const blogIndex = state.findIndex(blog=>blog.postID === payload.blogId)
            state[blogIndex].likes+1
        },
        unlikeBlog:(state,{payload})=>{
            const blogIndex = state.findIndex(blog=>blog.postID === payload.blogId)
            state[blogIndex].likes-1
        }
    }
})


export default blogsSlice.reducer
export const{clearBlogs,setBlogs,likeBlog,unlikeBlog} = blogsSlice.actions