import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetRent = createAsyncThunk("dummyData/GetRentDetails", async ({userId}) => {
    let response = await axios.get(`${BASE_URL}/rent-details/${userId}`,  {
        userId //body data but not used in get request
    });
    return response;
});



const GetRentDetails = createSlice({
    name: "getRentDetails",
    initialState: {
        loading: false,
        GetRentDetails: [],
        error: ""
    },
    extraReducers: {
        [GetRent.fulfilled]: (state, action) => {
            state.GetRentDetails = action.payload;
            state.loading = false;
        },
        [GetRent.pending]: (state) => {
            state.loading = true;
        },
        [GetRent.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetRentDetails.reducer;