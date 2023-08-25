import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const UserLogin = createAsyncThunk("dummyData/UserAdd", async ({email,password}) => {
    let response = await axios.post(`${BASE_URL}/landlord-login`,  {
        email,
        password
    });
    return response?.message;
});



const Login = createSlice({
    name: "login",
    initialState: {
        loading: false,
        login: [],
        error: ""
    },
    extraReducers: {
        [UserLogin.fulfilled]: (state, action) => {
            state.login = action.payload;
            state.loading = false;
        },
        [UserLogin.pending]: (state) => {
            state.loading = true;
        },
        [UserLogin.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default Login.reducer;