import React from "react";
import "./MainPageCss.css"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  let type=""
  const navigate = useNavigate();
  return (
    <>
      <div className="mainpagebg">
        <div 
        className="rectangle1"
        >
          <Button 
          id="landlord" 
          onClick={() => navigate("/login",{state:{type:"Landlord"}})}>
            LANDLORD
          </Button>
        </div>
        <div 
        className="rectangle2"
        >
          <Button 
          id="tenant"
          onClick={() => navigate("/login",{state:{type:"Tenant"}})}
          >Tenant</Button>
        </div>
        <div 
        className="rectangle3"
        >
          <Button 
          id="admin"
          >ADMIN</Button>
        </div>
      </div>
    </>
  );
};

export default MainPage;
/* Rectangle 1 */
