import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const RentSet = createAsyncThunk("dummyData/RentSettings", async ({detail}) => {
    let response = await axios.post(`${BASE_URL}/rent-setting`,  {
        detail
    });
    return response;
});



const RentSettings = createSlice({
    name: "rentSetting",
    initialState: {
        loading: false,
        RentSettings: [],
        error: ""
    },
    extraReducers: {
        [RentSet.fulfilled]: (state, action) => {
            state.RentSettings = action.payload;
            state.loading = false;
        },
        [RentSet.pending]: (state) => {
            state.loading = true;
        },
        [RentSet.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default RentSettings.reducer;