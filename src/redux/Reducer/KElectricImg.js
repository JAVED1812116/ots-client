import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const ElectricPhoto = createAsyncThunk("dummyData/Photo", async (val) => {
    const formData = new FormData();
    formData.append("photo", val);
    console.log(val,"val")
    let response = await axios.post(`${BASE_URL}/upload-elecPhoto`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }});
    return response;
});



const Photo = createSlice({
    name: "Photo",
    initialState: {
        loading: false,
        Photo: [],
        error: ""
    },
    extraReducers: {
        [ElectricPhoto.fulfilled]: (state, action) => {
            state.Photo = action.payload;
            state.loading = false;
        },
        [ElectricPhoto.pending]: (state) => {
            state.loading = true;
        },
        [ElectricPhoto.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default Photo.reducer;