import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Color
export const getColorAndSize = createAsyncThunk('colorAndSize/get', async () => {
    const response = await axios.get('http://localhost:8080/rest/options');
    return response.data;
  });