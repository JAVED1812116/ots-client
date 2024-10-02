import * as React from "react";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  Container,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

import MarkunreadIcon from "@mui/icons-material/Markunread";
import SendIcon from "@mui/icons-material/Send";
import title from "../../../components/title";
import "./newRequest.css";
import { SendMail } from "../../../Redux/Reducer/SendEmail";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { ValidateUser } from "../../../Redux/Reducer/ValidateUser";
import { BASE_URL } from "../../../config/config";
import axios from "axios";
export default function AddNew() {
  title("Add New Tenant");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [email, setEmail] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isBank, setIsBank] = useState(false);
  const [loader, setLoader] = useState(true);
  const { validateUser, loginUser } = useSelector((state) => state);
  console.log(validateUser?.UserValidate, "validateUser");
  console.log(validateUser?.UserValidate?.length > 0, "validateUser123");
  console.log(loginUser?.login, "loginUser");
  console.log(
    loginUser?.login?.data?.data?.is_bank,
    "loginUser123"
  );


  React.useEffect(()=>{
    // setLoader(true)
    const token = sessionStorage.getItem("ots_token");
    axios({
      method: "POST",
      url: `${BASE_URL}/validateUser`,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      // httpAgent: agent, 
      // httpsAgent: agent,
    }).then((res)=> {
      console.log(res?.data?.user?.is_bank, 'resssss');
      setIsBank(res?.data?.user?.is_bank)
      setLoader(false)
    })
  },[])

  const sendEMAIL = () => {
    if (email != null || "") {
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (regexEmail.test(email)) {
        setBtnLoading(true);
        dispatch(
          SendMail({
            email,
            userId: localStorage.getItem("user_id"),
            userName: localStorage.getItem("name"),
          })
        ).then((res) => {
          console.log(res?.payload?.data, "ressssssssss");
          setBtnLoading(false);
          if (res?.payload?.data?.success) {
            setEmail("");
            toast.success(res?.payload?.data?.message, {
              position: "top-right",
              autoClose: 2000,
            });
          } else {
            toast.error("Something Wrong", {
              position: "top-center",
            });
          }
        });
      } else {
        toast.error("Email is not valid", {
          position: "top-center",
        });
      }
    } else {
      toast.error("Empty Field are not allowed", {
        position: "top-right",
      });
    }
  };





  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>Add New Tenant</h1>
        </div>
        {
        loader ?
        <div className="flex">
          <CircularProgress size={42} color="inherit" />
        </div>
        :
        // ((
        //   (loginUser?.login && typeof loginUser?.login === 'object') || (Array.isArray(loginUser?.login) &&
        //   loginUser?.login?.length > 0)) &&
        //   !loginUser?.login?.data?.data?.is_bank) ||
        // (((validateUser?.UserValidate && typeof validateUser.UserValidate === 'object') || (Array.isArray(validateUser?.UserValidate) &&
        //   validateUser?.UserValidate?.length > 0)) &&
        //   !validateUser?.UserValidate?.data?.user?.is_bank) 
          !isBank
          ? (
          <>
            <div className="flex">
              <h2 className="mx-2">
                Set bank details first in order to add any tenant
              </h2>
              <Button
                className="addNewButton"
                variant="contained"
                // endIcon={<SendIcon />}
                onClick={() => {
                  navigate("/bank-detail");
                }}
              >
                Setup Bank Details
              </Button>
            </div>
          </>
        ) : (
          <Container maxWidth="sm" className="add-new-container">
            <FormControl className="w100 mb-10">
              {/* <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel> */}
              <Input
                value={email}
                id="input-with-icon-adornment"
                placeholder={"Enter Email Address"}
                startAdornment={
                  <InputAdornment position="start">
                    <MarkunreadIcon />
                  </InputAdornment>
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <Button
              className={`addNewButton ${btnLoading && "no-cursor"}`}
              variant="contained"
              startIcon={
                btnLoading && <CircularProgress size={18} color="inherit" />
              }
              endIcon={<SendIcon />}
              onClick={() => {
                !btnLoading && sendEMAIL();
              }}
            >
              Send
            </Button>
          </Container>
        )}
        <ToastContainer />
      </div>
    </>
  );
}
