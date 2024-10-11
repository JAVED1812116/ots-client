import React from "react";
import "./PendingRequest.css";
import { Button } from "@mui/base";
import { useLocation, useNavigate } from "react-router-dom";
import { ValidateUser } from "../../Redux/Reducer/ValidateUser";
import { useDispatch } from "react-redux";
import { reset } from "../../Redux/Reducer/LoginUser";
import LogoutHelper from "../../Helper/LogoutHelper";

const PendingRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      {/* <h1>404 Page Not Found</h1> */}
      {/* <p class="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p> */}
      <div className="pending-request-container">
        <div className="content">

        <h1 className="title">Pending Request</h1>
        <div className="loading-circle"></div>
        <p className="message">
          Your <b>Request</b> is in <b>pending</b> mode as soon admin process you will be able
          to join us...
        </p>
        </div>
        <Button className="LoginButton"   onClick={() => LogoutHelper.logout()}>Logout</Button>
      </div>
    </>
  );
};

export default PendingRequest;
