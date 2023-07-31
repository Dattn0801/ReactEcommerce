import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk(
  "product/get",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/getOne",
  async (id, thunkAPI) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addToWishList = createAsyncThunk(
  "product/wishlist",
  async (proId, thunkAPI) => {
    try {
      return await productService.addToWishList(proId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  product: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        //state.product = action.payload;
        state.message = "Product Added To Wishlist";
        if (state.isSuccess === true) {
          toast.success("Thêm vào danh sách yêu thích thành công");
        }
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleProduct = action.payload;
        state.message = "A product fetch successfully";
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
