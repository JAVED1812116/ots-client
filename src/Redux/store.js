import { configureStore } from '@reduxjs/toolkit';
import CreateUser from "./Reducer/CreateUser";



export const store = configureStore({
  reducer: {
    "CreateUser": CreateUser,
  },
})