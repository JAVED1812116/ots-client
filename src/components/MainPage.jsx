import React from "react";
import logo from "../assets/Logo.png";
import "./MainPageCss.css"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const navigate = useNavigate();
  return (
 <>
<div>
  <div className="rectangle1">
<Button id="landlord" onClick={()=> navigate("/landlord-login")}>LANDLORD</Button>
  </div>
  <div className="rectangle2">
      <Button id="tenant">Tenant</Button>
  </div>
  <div className="rectangle3">
      <Button id="admin">ADMIN</Button>
  </div>
</div>
  </>
  );
};

export default MainPage;
/* Rectangle 1 */

