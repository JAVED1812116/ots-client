import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetOneUploadBill = createAsyncThunk("dummyData/GetOneUploadBillDetail", async ({userId}) => {
    let response = await axios.get(`${BASE_URL}/getOneUpload-Bill/${userId}`,  {
        userId //body data but not used in get request
    });
    return response;
});



const GetOneUploadBillDetail = createSlice({
    name: "getOneUploadBillDetail",
    initialState: {
        loading: false,
        GetRentDetails: [],
        error: ""
    },
    extraReducers: {
        [GetOneUploadBill.fulfilled]: (state, action) => {
            state.GetOneUploadBillDetail = action.payload;
            state.loading = false;
        },
        [GetOneUploadBill.pending]: (state) => {
            state.loading = true;
        },
        [GetOneUploadBill.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetOneUploadBillDetail.reducer;