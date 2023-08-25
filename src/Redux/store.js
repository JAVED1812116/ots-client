import { configureStore } from '@reduxjs/toolkit';
import Signup from "./Reducer/Signup";



export const store = configureStore({
  reducer: {
    "signup": Signup,
  },
})