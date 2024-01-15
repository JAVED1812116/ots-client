import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetOneAgreement = createAsyncThunk("dummyData/GetOneAgreementDetail", async ({id}) => {
    console.log(id,"gra")
    let response = await axios.get(`${BASE_URL}/getOne-agreement/${id}`,  {
        id //body data but not used in get request
    });
    return response;
});



const GetOneAgreementDetail = createSlice({
    name: "getOneAgreement",
    initialState: {
        loading: false,
        GetRentDetails: [],
        error: ""
    },
    extraReducers: {
        [GetOneAgreement.fulfilled]: (state, action) => {
            state.GetOneAgreementDetail = action.payload;
            state.loading = false;
        },
        [GetOneAgreement.pending]: (state) => {
            state.loading = true;
        },
        [GetOneAgreement.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetOneAgreementDetail.reducer;