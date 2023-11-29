import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const ElectricBill = createAsyncThunk("dummyData/ElectricReading", async ({values}) => {
       
    let response = await axios.post(`${BASE_URL}/electric-reading`,  {
       values
    });
    return response;
});



const ElectricReading = createSlice({
    name: "electricReading",
    initialState: {
        loading: false,
        ElectricReading: [],
        error: ""
    },
    extraReducers: {
        [ElectricBill.fulfilled]: (state, action) => {
            state.ElectricReading = action.payload;
            state.loading = false;
        },
        [ElectricBill.pending]: (state) => {
            state.loading = true;
        },
        [ElectricBill.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default ElectricReading.reducer;