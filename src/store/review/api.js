import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get List reviews
export const getListReview = createAsyncThunk(
  "Reviews/get",
  async (productItemId) => {
    const response = await axios.get(`http://localhost:8080/rest/review/${productItemId}`);
    return response.data;
  }
);