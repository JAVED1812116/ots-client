import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetTenantCurrentBill = createAsyncThunk("dummyData/GetTenantCurrentBillDetail", async ({id}) => {
    
    let response = await axios.get(`${BASE_URL}/tenant-current-bill/${id}`,  {
        id //body data but not used in get request
    });
    return response;
});



const GetTenantCurrentBillDetail = createSlice({
    name: "getTenantCurrentBill",
    initialState: {
        loading: false,
        GetRentDetails: [],
        error: ""
    },
    extraReducers: {
        [GetTenantCurrentBill.fulfilled]: (state, action) => {
            state.GetTenantCurrentBillDetail = action.payload;
            state.loading = false;
        },
        [GetTenantCurrentBill.pending]: (state) => {
            state.loading = true;
        },
        [GetTenantCurrentBill.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetTenantCurrentBillDetail.reducer;