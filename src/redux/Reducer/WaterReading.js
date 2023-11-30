import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const WaterReadings = createAsyncThunk("dummyData/WaterReading", async ({values}) => {
       
    let response = await axios.post(`${BASE_URL}/water-reading`,  {
       values
    });
    return response;
});



const WaterReading = createSlice({
    name: "waterReading",
    initialState: {
        loading: false,
        WaterReading: [],
        error: ""
    },
    extraReducers: {
        [WaterReadings.fulfilled]: (state, action) => {
            state.WaterReading = action.payload;
            state.loading = false;
        },
        [WaterReadings.pending]: (state) => {
            state.loading = true;
        },
        [WaterReadings.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default WaterReading.reducer;