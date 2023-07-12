import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../screens/NotFound/NotFound"
import Dashboard from "../screens/Dashboard/Dashboard"


export default function AllRoutes() {
	return (
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
	);
}