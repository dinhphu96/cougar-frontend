import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const doSignup = createAsyncThunk(
    'auth/signup',
    async (form, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/signup', form);
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