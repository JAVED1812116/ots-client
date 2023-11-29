import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const SsgcBill = createAsyncThunk("dummyData/SsgcReading", async ({values}) => {
       
    let response = await axios.post(`${BASE_URL}/ssgc-reading`,  {
       values
    });
    return response;
});



const SsgcReading = createSlice({
    name: "ssgcReading",
    initialState: {
        loading: false,
        SsgcReading: [],
        error: ""
    },
    extraReducers: {
        [SsgcBill.fulfilled]: (state, action) => {
            state.SsgcReading = action.payload;
            state.loading = false;
        },
        [SsgcBill.pending]: (state) => {
            state.loading = true;
        },
        [SsgcBill.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default SsgcReading.reducer;