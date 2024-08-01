import { createSlice } from "@reduxjs/toolkit";

const initialState =[
    {postID:"",
     title:"",
     content:"",
     createdAt:"",
     author:"",
     coverImg:"",
     subImages:[],
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
                  author:blogData.author,
                  authorImg:blogData.authorImg,
                  coverImg:blogData.coverImageId,
                  subImages:blogData.subImagesId,
                  tags:blogData.tags
              }
              state.push(newBlog)
          });
        },

        clearBlogs:(state,action)=>{
              for(let i=0;i<=state.length;i++){
                  state.pop()
              }
        }
    }
})


export default blogsSlice.reducer
export const{clearBlogs,setBlogs} = blogsSlice.actions