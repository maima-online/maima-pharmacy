import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "typescript-cookie";
// import { userService } from "../services/user.service.ts";
import { userService } from "../services";
import axios, { AxiosError } from "axios";
import {
  Ilogin,
  IUser,
  IregisterUser,
  IforgotPassword,
  IresetPassword,
} from "../features/types";
import api from "../services/apis";
import { setMessage } from "./message.slice";

type postData = any;

interface iauth {
  isLoggedIn: boolean;
  user?: IUser | {};
}
const initialState = {
  isLoggedIn: false,
  user: {},
} as iauth;

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async ({ email, password }: Ilogin, thunkAPI) => {
    try {
      const response = await api.post("accounts/login", { email, password });
      if (response.data) {
        setCookie("maima", response.data.accessToken, { expires: 7 });
        return response.data;
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const userSignup = createAsyncThunk(
  "auth/userSignup",
  async (data: IregisterUser, thunkAPI) => {
    try {
      const response = await api.post("accounts/signup", data);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }: IforgotPassword, thunkAPI) => {
    try {
      const response = await api.post("accounts/forgot-password", { email });
      return response.data as postData[];
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }: IresetPassword, thunkAPI) => {
    console.log("token", typeof token);
    try {
      const response = await api.post("accounts/reset-password", {
        token,
        password,
      });
      return response.data as postData[];
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isLoggedIn = false;
    });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;
