import { configureStore } from '@reduxjs/toolkit';
import CreateUser from "./Reducer/CreateUser";
import TenantRegestration from './Reducer/TenantRegestration';
import RentSetting from './Reducer/RentSetting';
import AccountSetting from './Reducer/AccountSetting';

export const store = configureStore({
  reducer: {
    "CreateUser": CreateUser,
    "TenantRegestration": TenantRegestration,
    "rentSetting": RentSetting,
    "accountSetting": AccountSetting,
  },
})