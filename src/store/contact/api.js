import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postContact = createAsyncThunk('postContact', async (contact, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/contacts', contact);
    return response.data;
  } catch (error) {
    if (error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      throw error;
    }
  }
});


