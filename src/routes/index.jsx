import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../screens/NotFound/NotFound";
import Dashboard from "../screens/Dashboard/Dashboard";
import LandlordSignUp from "../screens/Landlord/Auth/LandlordSignUp";
import LandlordLogin from "../screens/Landlord/Auth/LandlordLogin";
import LandLordDashboard from "../screens/Landlord/Dashboard/Dashboard";
import NewRequest from "../screens/Landlord/NewRequest/NewRequest";
import RequestUserDetail from "../screens/Landlord/RequestUserDetail/RequestUserDetail";
import AllTenant from "../screens/Landlord/AllTenant/AllTenant";
import RentSetting from "../screens/Landlord/RentSetting/RentSetting";
import BankDetail from "../screens/Landlord/BankDetail/BankDetail"
import LandlordFunctionality from "../screens/Landlord/LandlordFunction/landlordFunctionality";
import Agreement from "../screens/Landlord/Agreement/Agreements";
import UploadBill from "../screens/Landlord/UploadBills/UploadBill";
export default function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/landlord-signup" element={<LandlordSignUp />} />
        <Route path="/landlord-login" element={<LandlordLogin />} />
        <Route path="/landlord-dashboard" element={<LandLordDashboard />} />
        <Route path="/new-request" element={<NewRequest />} />
        <Route path="/user-detail" element={<RequestUserDetail />} />
        <Route path="/all-tenant" element={<AllTenant />} />
        <Route path="/rent-setting" element={<RentSetting />} />
        <Route path="/bank-detail" element={<BankDetail />} />
        <Route path="/landlord-functionality" element={<LandlordFunctionality />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/upload-Bill" element={<UploadBill />} />
        
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
