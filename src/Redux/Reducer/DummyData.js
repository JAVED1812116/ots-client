import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const fetchOrders = createAsyncThunk("dummyData/fetchOrders", async (id) => {
    console.log(id,"id")
    let response = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    let data = await response.data.data;
    return data;
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