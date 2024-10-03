import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";
const token = sessionStorage.getItem("ots_token")


export const GetProperty = createAsyncThunk("dummyData/GetPropertyDetails", async ({userId}) => {
    let response = await axios.get(`${BASE_URL}/property-details/${userId}`,  {
        userId //body data but not used in get request
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
});



const GetPropertyDetails = createSlice({
    name: "getPropertyDetails",
    initialState: {
        loading: false,
        GetPropertyDetails: [],
        error: ""
    },
    extraReducers: {
        [GetProperty.fulfilled]: (state, action) => {
            state.GetPropertyDetails = action.payload;
            state.loading = false;
        },
        [GetProperty.pending]: (state) => {
            state.loading = true;
        },
        [GetProperty.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default GetPropertyDetails.reducer;