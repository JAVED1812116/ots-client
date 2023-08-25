import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const UserAdd = createAsyncThunk("dummyData/UserAdd", async ({name,email,password}) => {
    let response = await axios.post(`${BASE_URL}/create-landlord`,  {
        name,
        email,
        password
    });
    return response;
});



const Signup = createSlice({
    name: "signup",
    initialState: {
        loading: false,
        signup: [],
        error: ""
    },
    extraReducers: {
        [UserAdd.fulfilled]: (state, action) => {
            state.signup = action.payload;
            state.loading = false;
        },
        [UserAdd.pending]: (state) => {
            state.loading = true;
        },
        [UserAdd.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default Signup.reducer;