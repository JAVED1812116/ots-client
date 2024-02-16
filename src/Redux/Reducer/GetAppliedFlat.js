import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const GetAppliedFlat = createAsyncThunk("dummyData/AppliedFlatDetail", async ({userId}) => {
    let response = await axios.get(`${BASE_URL}/applied-flat/${userId}`);
    return response;
});



const GetAppliedFlatDetail = createSlice({
    name: "appliedFlatDetail",
    initialState: {
        loading: false,
        GetAppliedFlatDetail: [],
        error: ""
    },
    extraReducers: {
        [GetAppliedFlat.fulfilled]: (state, action) => {
            state.GetAppliedFlatDetail = action.payload;
            state.loading = false;
        },
        [GetAppliedFlat.pending]: (state) => {
            state.loading = true;
        },
        [GetAppliedFlat.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetAppliedFlatDetail.reducer;