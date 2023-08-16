import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Wrapper from '../../../components/Wrapper';
import { useState } from 'react';
import { Container } from '@mui/material';
import { useLocation } from "react-router";
import title from '../../../components/title';
import "./bankDetails.css"
export default function BankDetail() {
  title("Account Detail")
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  return (
    <>
    <Wrapper open={open} setOpen={setOpen} mylocation= {mylocation}/>
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
      <div className="mainHeading">
          <h1>Account Detail</h1>
        </div>
      <Container maxWidth="sm" className="bank-details-container">

      <div className="bank-inputs">
        <TextField
          id="standard-multiline-flexible"
          label="Bank Name"
          multiline
          maxRows={4}
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Account Name"
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

        <TextField
          id="standard-multiline-flexible"
          label="Account Number"
          multiline
          maxRows={4}
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="IBAN Number"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
      </div>
      <Button className="bankButton" variant="contained" >
        Save
      </Button>
    </Container>
    </div>
    </>
  );
}