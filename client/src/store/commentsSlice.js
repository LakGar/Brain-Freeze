// src/store/commentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Update with your backend URL

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/comments/post/${postId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData, thunkAPI) => {
    try {
      const { token, ...commentDetails } = commentData;
      const response = await axios.post(`${API_URL}/comments`, commentDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments[action.meta.arg] = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const postId = action.meta.arg.postId;
        if (state.comments[postId]) {
          state.comments[postId].push(action.payload);
        } else {
          state.comments[postId] = [action.payload];
        }
      });
  },
});

export default commentsSlice.reducer;
