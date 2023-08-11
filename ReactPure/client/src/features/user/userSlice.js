import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getUserWislist = createAsyncThunk("user/wishlist", async (config2, thunkAPI) => {
  try {
    return await authService.getUserWislist(config2);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const addProductToCart = createAsyncThunk("user/cart/add", async (cartData, thunkAPI) => {
  try {
    return await authService.addToCart(cartData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getUserCart = createAsyncThunk("user/cart/get", async (config2, thunkAPI) => {
  try {
    return await authService.getCart(config2);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const deleteCartProduct = createAsyncThunk("user/cart/product/delete", async (data, thunkAPI) => {
  try {
    return await authService.removeProductFromCart(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateCartProduct = createAsyncThunk("user/cart/product/update", async (cartDetail, thunkAPI) => {
  try {
    return await authService.updateProductFromCart(cartDetail);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createOrder = createAsyncThunk("user/cart/create-order", async (orderDetail, thunkAPI) => {
  try {
    return await authService.createOrder(orderDetail);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getUserOrders = createAsyncThunk("user/orders/get", async (config, thunkAPI) => {
  try {
    return await authService.userOrders(config);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateProfile = createAsyncThunk("user/profile/update", async (data, thunkAPI) => {
  try {
    return await authService.updateUser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const forgotPassWordToken = createAsyncThunk("user/password/token", async (data, thunkAPI) => {
  try {
    return await authService.forgotPassToken(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const resetPassWord = createAsyncThunk("user/password/reset", async (data, thunkAPI) => {
  try {
    return await authService.resetPass(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const deleteUserCart = createAsyncThunk("user/cart/delete", async (config2,thunkAPI) => {
  try {
    return await authService.emtyCart(config2);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
const getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  user: getUserfromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.info("user created");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        if (state.isSuccess === true) {
          localStorage.setItem("token", action.payload.token);
          toast.info("Đăng nhập thành công");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(getUserWislist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWislist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getUserWislist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
        if (state.isSuccess === true) {
          toast.success("Đã thêm sản phẩm vào giỏ");
        }
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteCartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success(" xóa sản phẩm khỏi giỏ thành công");
        }
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateCartProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Cập nhật sản phẩm thành công");
        }
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success("Đặt hàng thành công");
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateUser = action.payload;
        if (state.isSuccess) {
          let currentUserData = JSON.parse(localStorage.getItem("user"));
          let newUserData = {
            _id: currentUserData?._id,
            token: currentUserData?.token,
            firstname: action?.payload?.firstname,
            lastname: action?.payload?.lastname,
            email: action?.payload?.email,
            mobile: action?.payload?.mobile,
          };
          localStorage.setItem("user", JSON.stringify(newUserData));
          state.user = newUserData;
          toast.success("Cập nhật thông tin thành công");
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(forgotPassWordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassWordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if (state.isSuccess === true) {
          toast.success("Email reset mật khẩu đã được gửi");
        }
      })
      .addCase(forgotPassWordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(resetPassWord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        if (state.isSuccess === true) {
          toast.success("Cập nhật mật khẩu thành công");
        }
      })
      .addCase(resetPassWord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action?.payload?.response?.data?.message);
        }
      })
      .addCase(deleteUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteCart = action.payload;
      })
      .addCase(deleteUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
