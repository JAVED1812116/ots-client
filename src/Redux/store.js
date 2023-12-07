import { configureStore } from '@reduxjs/toolkit';
import CreateUser from "./Reducer/CreateUser";
import TenantRegestration from './Reducer/TenantRegestration';
import RentSetting from './Reducer/RentSetting';
import AccountSetting from './Reducer/AccountSetting';
import ElectricReading from './Reducer/ElectricReading';
import SendEmail from './Reducer/SendEmail';
import KElectricImg from './Reducer/KElectricImg';
import SsgcReading from './Reducer/SsgcReading';
import WaterReading from './Reducer/WaterReading';
import MaintananceReading from './Reducer/MaintananceReading';
import TrashReading from './Reducer/TrashReading';
import GetOneUploadBill from './Reducer/GetOneUploadBill';
import PropertyRegistration from './Reducer/PropertyRegistration';
export const store = configureStore({
  reducer: {
    "CreateUser": CreateUser,
    "TenantRegestration": TenantRegestration,
    "rentSetting": RentSetting,
    "accountSetting": AccountSetting,
    "electricReading": ElectricReading,
    "ssgcReading": SsgcReading,
    "waterReading": WaterReading,
    "maintananceReading": MaintananceReading,
    "trashReading": TrashReading,
    "SendEmail":SendEmail,
    "Photo": KElectricImg,
    "getOneUploadBillDetail": GetOneUploadBill,
    "propertyRegistration": PropertyRegistration,
  },
})