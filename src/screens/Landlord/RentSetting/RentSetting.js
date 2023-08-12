import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router";
export default function RentSetting() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>Rent Setting</h1>
        </div>
        <Container maxWidth="sm">
          <div>
            <TextField
              id="standard-multiline-flexible"
              label="Monthly Rent"
              multiline
              maxRows={4}
              variant="standard"
            />
            <TextField
              id="standard-textarea"
              label="Advance"
              placeholder="Placeholder"
              multiline
              variant="standard"
            />
            {/* <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="standard"
        /> */}
          </div>

          <div>
            <TextField
              id="standard-multiline-flexible"
              label="Maintenance Charges"
              multiline
              maxRows={4}
              variant="standard"
            />
            <TextField
              id="standard-textarea"
              label="Trash Charges"
              placeholder="Placeholder"
              multiline
              variant="standard"
            />
          </div>
          <Button variant="contained" color="success">
            Save
          </Button>
        </Container>
      </div>
    </>
  );
}
