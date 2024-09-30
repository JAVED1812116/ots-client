import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";
const token = localStorage.getItem('token')


export const PropertyRegisters = createAsyncThunk("dummyData/PropertyRegistration", async ({values}) => {
       console.log(values,"values")
       console.log(token,"token")
    let response = await axios.post(
        `${BASE_URL}/property-Registration`,  
        {values},
    {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    }
);
    return response;
});



const PropertyRegistration = createSlice({
    name: "propertyRegistration",
    initialState: {
        loading: false,
        PropertyRegistration: [],
        error: ""
    },
    extraReducers: {
        [PropertyRegisters.fulfilled]: (state, action) => {
            state.PropertyRegistration = action.payload;
            state.loading = false;
        },
        [PropertyRegisters.pending]: (state) => {
            state.loading = true;
        },
        [PropertyRegisters.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default PropertyRegistration.reducer;