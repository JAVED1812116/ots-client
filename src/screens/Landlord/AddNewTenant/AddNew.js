import * as React from "react";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import { useLocation } from "react-router";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  Container,
} from "@mui/material";

import MarkunreadIcon from "@mui/icons-material/Markunread";
import SendIcon from "@mui/icons-material/Send";
import title from "../../../components/title";
import "./newRequest.css";
import { SendMail } from "../../../Redux/Reducer/SendEmail";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
export default function AddNew() {
  title("Add New Tenant");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [email, setEmail] = useState(null);
  const sendEMAIL = () => {
    if (email != null || "") {
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (regexEmail.test(email)) {
        dispatch(SendMail({ email, userId : localStorage.getItem("user_id"), userName : localStorage.getItem("name") })).then((res) => {
          console.log(res?.payload?.data, "ressssssssss");
          if (res?.payload?.data === "Email Recieved") {
            toast.success(res?.payload?.data, {
              position: "top-center",
            });
          } else {
            toast.error("Something Wrong", {
              position: "top-center",
            });
          }

        });
      }else{
        toast.error("Email is not valid", {
          position: "top-center",
        });
      }
    }
    else{
      toast.error("Empty Field are not allowed", {
        position: "top-center",
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
        <Container maxWidth="sm" className="add-new-container">
          <FormControl className="w100">
            {/* <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel> */}
            <Input
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
            className="addNewButton"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => {
              sendEMAIL();
            }}
          >
            Send
          </Button>
        </Container>
        <ToastContainer />
      </div>
    </>
  );
}
