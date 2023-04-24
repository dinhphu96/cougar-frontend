import { createSlice } from "@reduxjs/toolkit";
import {
    doReview,
    doUpdateReview,
    getListReview
} from "./api";

const reviewSlice = createSlice({
    name: "Review",
    initialState: {
        reviews: [],
        status: "idle",
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // getReview by productItem Id
            .addCase(getListReview.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.error = "Successed";
            })

            .addCase(getListReview.rejected, (state, action) => {
                state.reviews = [];
                state.status = "Failed";
                state.error = action.payload;
            })

            //Review
            .addCase(doReview.fulfilled, (state, action) => {
                state.status = "Successed";
                if (state.reviews.length > 1) {
                    state.reviews.push(action.payload);
                } else {
                    const mang = [];
                    mang.push(action.payload);
                    state.reviews = mang;
                }
                state.reviews.reverse();
            })
            .addCase(doReview.rejected, (state, action) => {
                state.status = "Failed";
            })
            // update review
            .addCase(doUpdateReview.fulfilled, (state, action) => {
                state.status = "Successed";
                const updatedReview = action.payload;
                const index = state.reviews.findIndex(review => review.id === updatedReview.id);
                state.reviews[index] = updatedReview;
                state.reviews.reverse();
            })
            .addCase(doUpdateReview.rejected, (state, action) => {
                state.status = "Failed";
            })

    },
});
export default reviewSlice;