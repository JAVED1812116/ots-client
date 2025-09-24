import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/config";
const token = sessionStorage.getItem("ots_token");

export const AccountSet = createAsyncThunk("dummyData/AccountSettings", async ({values}) => {
    console.log(token, 'account setting token');
    let response = await axios.post(`${BASE_URL}/account-setting`,  {
        values
    }
    // , {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     }
    // }

);
    return response;
});



const AccountSettings = createSlice({
    name: "accountSetting",
    initialState: {
        loading: false,
        AccountSettings: [],
        error: ""
    },
    extraReducers: {
        [AccountSet.fulfilled]: (state, action) => {
            state.AccountSettings = action.payload;
            state.loading = false;
        },
        [AccountSet.pending]: (state) => {
            state.loading = true;
        },
        [AccountSet.rejected]: (state, action) => {
            state.error = action.error.message;
        },
    }
});
export default AccountSettings.reducer;