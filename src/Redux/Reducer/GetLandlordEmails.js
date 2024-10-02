import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetLandlordEmails = createAsyncThunk("dummyData/GetLandlordEmails", async ({email, userId, userName,accept,data}) => {
    let response = await axios.post(`${BASE_URL}/landlord-emails`,  {
        // email,
        // userId, 
        // userName,
        // accept,
        // data
    });
    return response;
});



const GetLandlordEmail = createSlice({
    name: "GetLandlordEmail",
    initialState: {
        loading: false,
        GetLandlordEmail: [],
        error: ""
    },
    extraReducers: {
        [GetLandlordEmails.fulfilled]: (state, action) => {
            state.GetLandlordEmail = action.payload;
            state.loading = false;
        },
        [GetLandlordEmails.pending]: (state) => {
            state.loading = true;
        },
        [GetLandlordEmails.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetLandlordEmail.reducer;