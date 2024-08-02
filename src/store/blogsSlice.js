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
     tags:[]
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
                  tags:blogData.tags
              }
              state.push(newBlog)
          });
        },

        clearBlogs:(state,action)=>{
            return []
        }
    }
})


export default blogsSlice.reducer
export const{clearBlogs,setBlogs} = blogsSlice.actions