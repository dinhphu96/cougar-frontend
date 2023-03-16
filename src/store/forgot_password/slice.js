import { createSlice } from "@reduxjs/toolkit";
import {
    doForgotPassword,
    doResetPassword
} from "./api";

const forgotPasswordSlice = createSlice({
    name: "forgot_reset",
    initialState: {
        message: "",
        status: "idle",
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            //Forgot-password
            .addCase(doForgotPassword.fulfilled, (state, action) => {
                state.message = action.payload;
                state.error = "Successed";
            })
            .addCase(doForgotPassword.rejected, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            })

            //Reset-password
            .addCase(doResetPassword.fulfilled, (state, action) => {
                state.message = action.payload;
                state.status = "Successed";
            })
            .addCase(doResetPassword.fulfilled, (state, action) => {
                state.status = "Failed";
                state.error = action.payload;
            });

    },
});
export default forgotPasswordSlice;