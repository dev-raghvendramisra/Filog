import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title:'',
    banner:'',
    content:[{}],
    tags:[]
}

const editorSlice = createSlice({
    name:'editor',
    initialState,
    reducers:{
        setEditor:(state,{payload})=>{
          for(key in payload){
            state.key = payload.key
          }
        },
        clearEditor:(state,{payload})=>{
            return initialState
        }
    }
})

export const{setEditor, clearEditor} = editorSlice.actions
export default editorSlice.reducer