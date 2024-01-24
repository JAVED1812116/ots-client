import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetBill = createAsyncThunk("dummyData/GetBillDetails", async ({userId,paramsID}) => {
    let response = await axios.get(`${BASE_URL}/bill-details/${userId}-${paramsID}`,  {
        userId //body data but not used in get request
    });
    return response;
});



const GetBillDetails = createSlice({
    name: "getBillDetails",
    initialState: {
        loading: false,
        GetRentDetails: [],
        error: ""
    },
    extraReducers: {
        [GetBill.fulfilled]: (state, action) => {
            state.GetBillDetails = action.payload;
            state.loading = false;
        },
        [GetBill.pending]: (state) => {
            state.loading = true;
        },
        [GetBill.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetBillDetails.reducer;