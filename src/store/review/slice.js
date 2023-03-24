import { createSlice } from "@reduxjs/toolkit";
import {
    getListReview
} from "./api";

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews: [],
        status: "idle",
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListReview.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.error = "Successed";
            })

            .addCase(getListReview.rejected, (state, action) => {
                state.reviews = [];
                state.status = "Failed";
                state.error = action.payload;
            });

    },
});
export default reviewSlice;