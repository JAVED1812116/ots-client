import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const UserAdd = createAsyncThunk("dummyData/UserAdd", async ({ values, code }) => {
    let response = await axios.post(`${BASE_URL}/createUser`, {
        name: values.name,
        email: values.email,
        password: values.password,
        code
    });
    return response;
});



const CreateUser = createSlice({
    name: "UserAdd",
    initialState: {
        loading: false,
        CreateUser: [],
        error: ""
    },
    extraReducers: {
        [UserAdd.fulfilled]: (state, action) => {
            state.CreateUser = action.payload;
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
export default CreateUser.reducer;