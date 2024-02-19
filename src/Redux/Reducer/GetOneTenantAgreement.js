import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetOneTenantAgreement = createAsyncThunk("dummyData/GetOneTenantAgreementDetail", async ({id}) => {
    
    let response = await axios.get(`${BASE_URL}/tenant-agreement/${id}`,  {
        id //body data but not used in get request
    });
    return response;
});



const GetOneTenantAgreementDetail = createSlice({
    name: "getOneTenantAgreement",
    initialState: {
        loading: false,
        GetRentDetails: [],
        error: ""
    },
    extraReducers: {
        [GetOneTenantAgreement.fulfilled]: (state, action) => {
            state.GetOneTenantAgreementDetail = action.payload;
            state.loading = false;
        },
        [GetOneTenantAgreement.pending]: (state) => {
            state.loading = true;
        },
        [GetOneTenantAgreement.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetOneTenantAgreementDetail.reducer;