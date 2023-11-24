import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetAccount = createAsyncThunk("dummyData/GetAccountDetails", async ({userId}) => {
    let response = await axios.get(`${BASE_URL}/account-details/${userId}`,  {
        userId //body data but not used in get request
    });
    return response;
});



const GetAccountDetails = createSlice({
    name: "getAccountDetails",
    initialState: {
        loading: false,
        GetAccountDetails: [],
        error: ""
    },
    extraReducers: {
        [GetAccount.fulfilled]: (state, action) => {
            state.GetAccountDetails = action.payload;
            state.loading = false;
        },
        [GetAccount.pending]: (state) => {
            state.loading = true;
        },
        [GetAccount.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetAccountDetails.reducer;