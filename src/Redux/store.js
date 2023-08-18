import { configureStore } from '@reduxjs/toolkit';
import DummyData from "./Reducer/DummyData";



export const store = configureStore({
  reducer: {
    "dummyData": DummyData,
  },
})