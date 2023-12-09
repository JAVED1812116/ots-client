import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const RegisterTenant = createAsyncThunk("dummyData/RegisterTenant", async ({values}) => {
    let response = await axios.post(`${BASE_URL}/tenant-registerForm`,  {
        values
    });
    return response;
});



const TenantRegestration = createSlice({
    name: "TenantRegestration",
    initialState: {
        loading: false,
        TenantRegestration: [],
        error: ""
    },
    extraReducers: {
        [RegisterTenant.fulfilled]: (state, action) => {
            state.TenantRegestration = action.payload;
            state.loading = false;
        },
        [RegisterTenant.pending]: (state) => {
            state.loading = true;
        },
        [RegisterTenant.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default TenantRegestration.reducer;