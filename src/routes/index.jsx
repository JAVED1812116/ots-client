import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../screens/NotFound/NotFound";
import Dashboard from "../screens/Dashboard/Dashboard";
import CreateUser from "../screens/Landlord/Auth/CreateUser";
import LoginUser from "../screens/Landlord/Auth/LoginUser";
import LandLordDashboard from "../screens/Landlord/Dashboard/Dashboard";
import NewRequest from "../screens/Landlord/NewRequest/NewRequest";
import RequestUserDetail from "../screens/Landlord/RequestUserDetail/RequestUserDetail";
import AllTenant from "../screens/Landlord/AllTenant/AllTenant";
import RentSetting from "../screens/Landlord/RentSetting/RentSetting";
import BankDetail from "../screens/Landlord/BankDetail/BankDetail"
import Agreement from "../screens/Landlord/Agreement/Agreements";
import UploadBill from "../screens/Landlord/UploadBills/UploadBill";
import LandlordFunctionality from "../screens/Landlord/LandlordFunction/LandlordFunctionality";
import AddNew from "../screens/Landlord/AddNewTenant/AddNew";
import Registeration from "../screens/Tenant/Register/Registeration";
import TenantFunctionality from "../screens/Tenant/TenantFunction/TenantFunctionality";
import PreviousBill from "../screens/Tenant/PreviousBill/PreviousBill";
import UploadBill2 from "../screens/Landlord/UploadBills/UploadBill2";
import PreviousBillLandlordPage from "../screens/Landlord/PreviousBills/PreviousBill";
export default function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/landlord-dashboard" element={<LandLordDashboard />} />
        <Route path="/new-request" element={<NewRequest />} />
        <Route path="/user-detail" element={<RequestUserDetail />} />
        <Route path="/all-tenant" element={<AllTenant />} />
        <Route path="/rent-setting" element={<RentSetting />} />
        <Route path="/bank-detail" element={<BankDetail />} />
        <Route path="/landlord-functionality" element={<LandlordFunctionality />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/upload-Bill" element={<UploadBill />} />
        <Route path="/previous-bill" element={<PreviousBillLandlordPage />} />
        <Route path="/upload-Bill2" element={<UploadBill2 />} />
        

        <Route path="/addNew-Tenant" element={<AddNew />} />
        <Route path="/tenant-registration" element={<Registeration />} />
        <Route path="/tenant-dashboard" element={<TenantFunctionality />} />
        <Route path="/previous-TenantBill" element={<PreviousBill />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
