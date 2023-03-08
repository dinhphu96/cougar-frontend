import { createSlice } from "@reduxjs/toolkit";
import {
  doSignup
} from "./api";

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    user:{}, 
    status: "idle",
    error: null,
  },
  reducers: {   
  },
  extraReducers: (builder) => {
    builder
       //Sign Up
       .addCase(doSignup.fulfilled, (state, action) => {       
        state.user = action.payload;        
        state.error = "Successed";
    })

    .addCase(doSignup.rejected, (state, action) => {
      state.user = null;
      state.status = "Failed";
      state.error = action.payload;
  });

  },
});
export default signupSlice;