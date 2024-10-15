import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";



export const ProfileRegister = createAsyncThunk("dummyData/ProfileRegistration", async ({values}) => {
    let response = await axios.post(
        `${BASE_URL}/landlord-profile`,  
        {values},
    {
        headers: {
            Accept: "application/json",
            // Authorization: "Bearer " + token,
        },
    }
);
    return response;
});



const ProfileRegistration = createSlice({
    name: "profileRegistration",
    initialState: {
        loading: false,
        ProfileRegistration: [],
        error: ""
    },
    extraReducers: {
        [ProfileRegister.fulfilled]: (state, action) => {
            state.ProfileRegistration = action.payload;
            state.loading = false;
        },
        [ProfileRegister.pending]: (state) => {
            state.loading = true;
        },
        [ProfileRegister.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default ProfileRegistration.reducer;