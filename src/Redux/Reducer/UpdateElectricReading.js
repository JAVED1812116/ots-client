import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const UpdateElectricBill = createAsyncThunk("dummyData/UpdateElectricReading", async ({id,values}) => {
       
    let response = await axios.post(`${BASE_URL}/update-electric-reading/${id}`,  {
       values
    });
    return response;
});



const UpdateElectricReading = createSlice({
    name: "updateElectricReading",
    initialState: {
        loading: false,
        UpdateElectricReading: [],
        error: ""
    },
    extraReducers: {
        [UpdateElectricBill.fulfilled]: (state, action) => {
            state.UpdateElectricReading = action.payload;
            state.loading = false;
        },
        [UpdateElectricBill.pending]: (state) => {
            state.loading = true;
        },
        [UpdateElectricBill.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default UpdateElectricReading.reducer;