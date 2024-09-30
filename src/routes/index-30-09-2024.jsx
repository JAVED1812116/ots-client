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
import PendingBillLandlordPage from "../screens/Landlord/PendingBill/PendingBill";
import PropertyRegister from "../screens/Landlord/RegisterProperty/PropertyRegistrationForm";
import PendingRequest from "../screens/PendingRequest/PendingRequest";
import { useEffect } from "react";
import LandingPage from "../screens/LandingPage/LandingPage";
import AboutUs from "../screens/AboutUs/AboutUs";
import { useSelector } from "react-redux";
import TenantDashboard from "../screens/Tenant/TenantDashboard/TenantDashboard";
import TenantAgreements from "../screens/Tenant/TenantAgreement/TenantAgreement";
import CurrentBill from "../screens/Tenant/CurrentBills/CurrentBill";
import axios from "axios";
import { useDispatch } from "react-redux";

import { ValidateUser } from "../Redux/Reducer/ValidateUser";
export default function AllRoutes() {
  const dispatch = useDispatch();

  const { loginUser, validateUser } = useSelector((state) => state);
  console.log(loginUser?.login?.data?.data, "loginUser?.login?.data?.data");
  console.log(validateUser?.UserValidate?.data?.data, "validateUser?.data");
  const token = localStorage.getItem('token')
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  useEffect(()=> {
    console.log('hello123');
    dispatch(ValidateUser({}))
  }, [])
  // if (registeredUser === null) {
  //   return (
  //     <Router>
  //       <Routes>
  //         <Route path="/" element={<LandingPage />} />
  //         <Route path="/login" element={<LoginUser />} />
  //         <Route path="/signup" element={<CreateUser />} />
  //         <Route path="/*" element={<NotFound />} />
  //       </Routes>
  //     </Router>
  //   );
  // } else
  if (loginUser?.login?.data?.result == "No User Found") {
    console.log("hello0");
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/signup" element={<CreateUser />} />
          <Route path="/signup/:id?" element={<CreateUser />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  } else if (
    (loginUser?.login?.data?.data.is_register == false &&
      loginUser?.login?.data?.data.is_active == false) &&
    (validateUser?.UserValidate?.data?.data?.is_register == false &&
      validateUser?.UserValidate?.data?.data?.is_active == false)
  ) {
    console.log('hello1');
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup/:id?" element={<CreateUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/property-reg" element={<PropertyRegister />} />
          <Route path="/tenant-registration" element={<Registeration />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  } else if (
    (loginUser?.login?.data?.data.is_register == true &&
      loginUser?.login?.data?.data.is_active == false)
  ) {
    console.log('hello2');
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup/:id?" element={<CreateUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/pending-request" element={<PendingRequest />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/signup/:id?" element={<CreateUser />} />
          <Route path="/pending-request" element={<PendingRequest />} />
          {/* <Route path="/signup/:id?" element={<CreateUser />} /> */}
          <Route path="/landlord-dashboard" element={<LandLordDashboard />} />
          <Route path="/new-request" element={<NewRequest />} />
          <Route path="/user-detail" element={<RequestUserDetail />} />
          <Route path="/all-tenant" element={<AllTenant />} />
          {/* <Route path="/rent-setting" element={<RentSetting />} /> */}
          <Route path="/bank-detail" element={<BankDetail />} />
          <Route
            path="/landlord-functionality/:id?/:id?"
            element={<LandlordFunctionality />}
          />
          <Route
            path="/tenant-functionality/:id?/:id?"
            element={<TenantFunctionality />}
          />
          <Route path="/agreement/:id?/:id?" element={<Agreement />} />
          <Route path="/upload-Bill/:tenantId?/:flatId?" element={<UploadBill />} />
          <Route
            path="/previous-bill/:id?/:id?"
            element={<PreviousBillLandlordPage />}
          />
          <Route
            path="/pending-bill/:id?/:id?"
            element={<PendingBillLandlordPage />}
          />
          {/* <Route path="/property-reg" element={<PropertyRegister />} /> */}

          <Route path="/add-new-tenant" element={<AddNew />} />
          <Route path="/property-reg" element={<PropertyRegister />} />
          <Route path="/tenant-registration" element={<Registeration />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
          <Route path="/current-Bill/:id?/:id?" element={<CurrentBill />} />
          <Route path="/previous-TenantBill" element={<PreviousBill />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/tenant-agreement/:id?/:id?" element={<TenantAgreements />} />
          {/* <Route path="/Landing-page" element={<LandingPage />} /> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
}
