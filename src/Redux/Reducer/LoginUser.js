import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const UserLogin = createAsyncThunk("dummyData/loginUser", async ({values}) => {
    let response = await axios.post(`${BASE_URL}/loginUser`,  {
        email:values?.email,
        password:values?.password,
    });
    return response;
});



const LoginUser = createSlice({
    name: "loginUser",
    initialState: {
        loading: false,
        login: [],
        error: ""
    },
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.login = [];
            state.error = "";
        }
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
export const { reset } = LoginUser.actions; //to reset this
export default LoginUser.reducer;