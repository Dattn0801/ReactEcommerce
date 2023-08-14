import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { toast } from "react-toastify";
const getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk("auth/admin-login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOrders = createAsyncThunk("order/get-orders", async (config2, thunkAPI) => {
  try {
    return await authService.getOrders(config2);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getOrder = createAsyncThunk("order/get-order", async (data, thunkAPI) => {
  try {
    return await authService.getOrder(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateOrder = createAsyncThunk("order/updateOrder", async (data, thunkAPI) => {
  try {
    return await authService.updateOrder(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getMonthlyData = createAsyncThunk("order/getMonthlyData", async (config2, thunkAPI) => {
  try {
    return await authService.getMonthlyData(config2);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getYearlyData = createAsyncThunk("order/getYearlyData", async (config2, thunkAPI) => {
  try {
    return await authService.getYearlyData(config2);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singgleOrder = action.payload;
        state.message = "success";
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getMonthlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.monthlyData = action.payload;
        state.message = "success";
      })
      .addCase(getMonthlyData.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getYearlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyData.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
        state.message = "success";
      })
      .addCase(getYearlyData.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updateOrder = action.payload;
        state.message = "success";
        if (state.isSuccess === true) {
          toast.success("Cập nhật thành công");
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.isError === true) {
          toast.error("Cập nhật thất bại");
        }
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
