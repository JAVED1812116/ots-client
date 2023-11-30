import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const TrashReadings = createAsyncThunk("dummyData/TrashReading", async ({values}) => {
       
    let response = await axios.post(`${BASE_URL}/trash-reading`,  {
       values
    });
    return response;
});



const TrashReading = createSlice({
    name: "trashReading",
    initialState: {
        loading: false,
        TrashReading: [],
        error: ""
    },
    extraReducers: {
        [TrashReadings.fulfilled]: (state, action) => {
            state.TrashReading = action.payload;
            state.loading = false;
        },
        [TrashReadings.pending]: (state) => {
            state.loading = true;
        },
        [TrashReadings.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default TrashReading.reducer;