import { createSlice } from "@reduxjs/toolkit";

const initialState =[
    {title:"",
     content:"",
     createdAt:"",
     author:"",
     coverImg:"",
     subImages:[]
    }
]


const blogsSlice = createSlice({
    name:"blogSlice",
    initialState,
    reducers:{
        setBlogs:(state,{payload})=>{
          payload.forEach(blogData => {
              const newBlog = {
                  title:blogData.title,
                  content:blogData.content,
                  createdAt:blogData.createdAt,
                  author:blogData.userId,
                  coverImg:blogData.coverImageId,
                  subImages:blogData.subImagesId
              }
              state.push(newBlog)
          });
        },

        clearBlogs:(state,action)=>{
              for(let i=0;i<state.length;i++){
                  state.pop()
              }
        }
    }
})


export default blogsSlice.reducer
export const{clearBlogs,setBlogs} = blogsSlice.actions