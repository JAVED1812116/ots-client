import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetAllTenant = createAsyncThunk("dummyData/AllTenant", async ({userId}) => {
    let response = await axios.get(`${BASE_URL}/all-tenant/${userId}`);
    return response;
});



const GetTenantAll = createSlice({
    name: "allTenant",
    initialState: {
        loading: false,
        GetTenantAll: [],
        error: ""
    },
    extraReducers: {
        [GetAllTenant.fulfilled]: (state, action) => {
            state.GetTenantAll = action.payload;
            state.loading = false;
        },
        [GetAllTenant.pending]: (state) => {
            state.loading = true;
        },
        [GetAllTenant.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetTenantAll.reducer;