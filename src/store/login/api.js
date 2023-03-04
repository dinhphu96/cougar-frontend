import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const doLogin = createAsyncThunk('auth/signin', async (credentials) => {
    const response = await axios.post('http://localhost:8080/api/auth/signin', credentials);
    return response.data;
  });
  