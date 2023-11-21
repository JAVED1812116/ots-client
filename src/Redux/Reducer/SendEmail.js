import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";


export const SendMail = createAsyncThunk("dummyData/SendMail", async ({email}) => {
    let response = await axios.post(`${BASE_URL}/send-mail`,  {
        email,
    });
    return response;
});



const SendEmail = createSlice({
    name: "SendEmail",
    initialState: {
        loading: false,
        SendEmail: [],
        error: ""
    },
    extraReducers: {
        [SendMail.fulfilled]: (state, action) => {
            state.SendEmail = action.payload;
            state.loading = false;
        },
        [SendMail.pending]: (state) => {
            state.loading = true;
        },
        [SendMail.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default SendEmail.reducer;