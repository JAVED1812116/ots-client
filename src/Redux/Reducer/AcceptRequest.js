import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const RequestAccept = createAsyncThunk("dummyData/AcceptRequest", async ({row}) => {
       console.log(row,"platter")
    let response = await axios.post(`${BASE_URL}/accept-Request`,  {
       row
    });
    return response;
});



const AcceptRequest = createSlice({
    name: "propertyRegistration",
    initialState: {
        loading: false,
        AcceptRequest: [],
        error: ""
    },
    extraReducers: {
        [RequestAccept.fulfilled]: (state, action) => {
            state.AcceptRequest = action.payload;
            state.loading = false;
        },
        [RequestAccept.pending]: (state) => {
            state.loading = true;
        },
        [RequestAccept.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default AcceptRequest.reducer;