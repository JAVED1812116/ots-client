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
import "./newRequest.css"

export default function AddNew() {
  title("Add New Tenant");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);

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
          />
        </FormControl>
        <Button className="addNewButton" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
        </Container>
      </div>
    </>
  );
}
