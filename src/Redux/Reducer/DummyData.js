import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const fetchOrders = createAsyncThunk("dummyData/fetchOrders", async ({name,email,password}) => {
    let response = await axios.post(`${BASE_URL}/create-landlord`,  {
        name,
        email,
        password
    });
    return response?.message;
});



const DummyData = createSlice({
    name: "dummyData",
    initialState: {
        loading: false,
        dummyData: [],
        error: ""
    },
    extraReducers: {
        [fetchOrders.fulfilled]: (state, action) => {
            state.dummyData = action.payload;
            state.loading = false;
        },
        [fetchOrders.pending]: (state) => {
            state.loading = true;
        },
        [fetchOrders.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default DummyData.reducer;