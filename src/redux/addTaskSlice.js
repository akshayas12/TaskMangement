import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTask=createAsyncThunk('addTask/addTask',async(taskData)=>{
    const response=await axios.post('https://jsonplaceholder.typicode.com/todos', taskData);
    return response.data;
})

const addTaskSlice=createSlice({
    name:'addTask',
    initialState:{
        status:'idle',
        error:null,
    },
    reducers:{
        resetStatus:(state)=>{
            state.status='idle';
            state.error=null;
        }
    },
 extraReducers:(builder)=>{
    builder 
     .addCase(addTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
})
export const { resetStatus } = addTaskSlice.actions;
export default addTaskSlice.reducer;