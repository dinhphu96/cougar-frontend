import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const doForgotPassword = createAsyncThunk(
    'auth/forgot-password',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', email);
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

export const doResetPassword = createAsyncThunk(
    'auth/reset-password',
    async ( {password, token}, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/auth/reset-password`, {password, token});
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


