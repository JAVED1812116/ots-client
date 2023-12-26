import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetTenant = createAsyncThunk("dummyData/TenantDetail", async ({userId}) => {
    let response = await axios.get(`${BASE_URL}/tenant-details/${userId}`);
    return response;
});



const GetTenantDetail = createSlice({
    name: "tenantDetail",
    initialState: {
        loading: false,
        GetTenantDetail: [],
        error: ""
    },
    extraReducers: {
        [GetTenant.fulfilled]: (state, action) => {
            state.GetTenantDetail = action.payload;
            state.loading = false;
        },
        [GetTenant.pending]: (state) => {
            state.loading = true;
        },
        [GetTenant.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetTenantDetail.reducer;