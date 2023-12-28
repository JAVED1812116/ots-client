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
import BankDetail from "../screens/Landlord/BankDetail/BankDetail";
import Agreement from "../screens/Landlord/Agreement/Agreements";
import UploadBill from "../screens/Landlord/UploadBills/UploadBill";
import LandlordFunctionality from "../screens/Landlord/LandlordFunction/LandlordFunctionality";
import AddNew from "../screens/Landlord/AddNewTenant/AddNew";
import Registeration from "../screens/Tenant/Register/Registeration";
import TenantFunctionality from "../screens/Tenant/TenantFunction/TenantFunctionality";
import PreviousBill from "../screens/Tenant/PreviousBill/PreviousBill";
import PreviousBillLandlordPage from "../screens/Landlord/PreviousBills/PreviousBill";
import PropertyRegister from "../screens/Landlord/RegisterProperty/PropertyRegistrationForm";
import PendingRequest from "../screens/PendingRequest/PendingRequest";
import { useEffect } from "react";
import LandingPage from "../screens/LandingPage/LandingPage";
export default function AllRoutes() {
  // console.log(
  //   localStorage.getItem("user_id"),
  //   'localStorage.getItem("user_id")'
  // );
  let savedUser;
  let registeredUser;
  // useEffect(() => {
  savedUser = localStorage.getItem("user_id");
  registeredUser = sessionStorage.getItem("is_register") || localStorage.getItem("is_register");
  // console.log(savedUser, "savedUser");
  // },[]);


  console.log(savedUser, "savedUser");
  console.log(registeredUser, "registeredUser1");
  useEffect(()=> {
    console.log(savedUser, "savedUser useeff");
    console.log(registeredUser, "registeredUser useeff");
  })

  console.log(typeof registeredUser, "registeredUser type");
  if (registeredUser === null) {
    console.log("hello1");
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/signup" element={<CreateUser />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  } else if (registeredUser === 'false') {
    console.log("hello2");
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup/:id?" element={<CreateUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/property-reg" element={<PropertyRegister />} />
          <Route path="/pending-request" element={<PendingRequest />} />
          <Route path="/tenant-registration" element={<Registeration />} />


          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  } else if (registeredUser === 'true' && savedUser === null) {
    console.log("hello3");
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup/:id?" element={<CreateUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/pending-request" element={<PendingRequest />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
  else{
    console.log("hello4");
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/landlord-dashboard" element={<LandLordDashboard />} />
        <Route path="/new-request" element={<NewRequest />} />
        <Route path="/user-detail" element={<RequestUserDetail />} />
        <Route path="/all-tenant" element={<AllTenant />} />
        {/* <Route path="/rent-setting" element={<RentSetting />} /> */}
        <Route path="/bank-detail" element={<BankDetail />} />
        <Route path="/landlord-functionality" element={<LandlordFunctionality />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/upload-Bill" element={<UploadBill />} />
        <Route path="/previous-bill" element={<PreviousBillLandlordPage />} />
        {/* <Route path="/property-reg" element={<PropertyRegister />} /> */}
        

        <Route path="/addNew-Tenant" element={<AddNew />} />
        <Route path="/tenant-registration" element={<Registeration />} />
        <Route path="/tenant-dashboard" element={<TenantFunctionality />} />
        <Route path="/previous-TenantBill" element={<PreviousBill />} />
        <Route path="/Landing-page" element={<LandingPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
    )
  }
}
