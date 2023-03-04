import { createSlice } from "@reduxjs/toolkit";
import {
    doLogin
} from "./api";
const loginSlice = createSlice({
    name: "auth",
    initialState: {
        userr: {},
        isAuthenticated: false,
        isLoading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            //post
            .addCase(doLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.userr = action.payload;
                sessionStorage.setItem('user', JSON.stringify(action.payload));
                state.error = "Successed";
            })

            .addCase(doLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.userr = null;
                //   state.error = action.payload;
                state.error = action.error.message;
            });
    },
});
export default loginSlice;
