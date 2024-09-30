import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";
// const token = localStorage.getItem('token')

export const ValidateUser = createAsyncThunk(
  "dummyData/ValidateUser",
  async ({ email, token }) => {
    console.log(token, "token");
    let response = await axios.post(`${BASE_URL}/validateUser`, {
      // email,
      // token,
    });
    return response;
  }
);

const UserValidate = createSlice({
  name: "userValidate",
  initialState: {
    loading: false,
    UserValidate: [],
    error: "",
  },
  extraReducers: {
    [ValidateUser.fulfilled]: (state, action) => {
      state.UserValidate = action.payload;
      state.loading = false;
    },
    [ValidateUser.pending]: (state) => {
      state.loading = true;
    },
    [ValidateUser.rejected]: (state, action) => {
      state.UserValidate = [];
      state.error = action.error;
    },
  },
});
export default UserValidate.reducer;
