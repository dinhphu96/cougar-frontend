import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Color and Size
export const getColorAndSize = createAsyncThunk('colorAndSize/get', async () => {
  const response = await axios.get('http://localhost:8080/rest/options');
  return response.data;
});

// Categories
export const getCategories = createAsyncThunk('categories/get', async () => {
  const response = await axios.get('http://localhost:8080/rest/categories');
  return response.data;
});

export const getSubCategories = createAsyncThunk('subCategories/get', async () => {
  const response = await axios.get('http://localhost:8080/rest/subCategories');
  return response.data;
});