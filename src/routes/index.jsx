import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../screens/NotFound/NotFound";
import Dashboard from "../screens/Dashboard/Dashboard";
import LandlordSignUp from "../screens/Landlord/Auth/LandlordSignUp";
import LandlordLogin from "../screens/Landlord/Auth/LandlordLogin";
import LandLordDashboard from "../screens/Landlord/Dashboard/Dashboard";
export default function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/landlord-signup" element={<LandlordSignUp />} />
        <Route path="/landlord-login" element={<LandlordLogin />} />
        <Route path="/landlord-dashboard" element={<LandLordDashboard />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
