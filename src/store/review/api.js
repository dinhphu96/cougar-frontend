import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get List reviews
export const getListReview = createAsyncThunk(
  "Reviews/get",
  async (productItemId) => {
    const response = await axios.get(`http://localhost:8080/api/v1/review/${productItemId}`);
    return response.data;
  }
);
//do review
export const doReview = createAsyncThunk(
  "Reviews/send",
  async (review, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/review/send",
        review
      );
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        throw error;
      }
    }
  }
);

//Update review
export const doUpdateReview = createAsyncThunk(
  "reviews/updateReview",
  async (review, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/review/${review.id}`,
        {
          ratingValue: review.ratingValue,
          comment: review.comment
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);