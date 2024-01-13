import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const RequestReject = createAsyncThunk("dummyData/RejectRequest", async ({row}) => {
       console.log(row,"platter")
    let response = await axios.post(`${BASE_URL}/reject-Request`,  {
       row
    });
    return response;
});



const RejectRequest = createSlice({
    name: "propertyRegistration",
    initialState: {
        loading: false,
        RejectRequest: [],
        error: ""
    },
    extraReducers: {
        [RequestReject.fulfilled]: (state, action) => {
            state.RejectRequest = action.payload;
            state.loading = false;
        },
        [RequestReject.pending]: (state) => {
            state.loading = true;
        },
        [RequestReject.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default RejectRequest.reducer;