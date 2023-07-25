import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogService } from "./blogService";
import { toast } from "react-toastify";

export const getAllBlogs = createAsyncThunk("blog/getAll", async (thunkAPI) => {
  try {
    return await blogService.getBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getBlog = createAsyncThunk("blog/get", async (id, thunkAPI) => {
  try {
    return await blogService.getBlog(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  blog: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.blog = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.singleBlog = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default blogSlice.reducer;
