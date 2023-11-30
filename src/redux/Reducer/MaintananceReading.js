import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const MaintananceReadings = createAsyncThunk("dummyData/MaintananceReading", async ({values}) => {
       
    let response = await axios.post(`${BASE_URL}/maintanance-reading`,  {
       values
    });
    return response;
});



const MaintananceReading = createSlice({
    name: "maintananceReading",
    initialState: {
        loading: false,
        MaintananceReading: [],
        error: ""
    },
    extraReducers: {
        [MaintananceReadings.fulfilled]: (state, action) => {
            state.MaintananceReading = action.payload;
            state.loading = false;
        },
        [MaintananceReadings.pending]: (state) => {
            state.loading = true;
        },
        [MaintananceReadings.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default MaintananceReading.reducer;