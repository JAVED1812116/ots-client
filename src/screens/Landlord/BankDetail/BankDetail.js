import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Wrapper from '../../../components/Wrapper';
import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useLocation } from "react-router";
export default function BankDetail() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  return (
    <>
    <Wrapper open={open} setOpen={setOpen} mylocation= {mylocation}/>
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
      <Container maxWidth="sm">
      <Typography variant="h2" mb={5} gutterBottom>
          Account Detail
        </Typography>
      <div>
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
      </div>
      
      <div>
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
      <Button variant="contained" color="success">
        Save
      </Button>
    </Container>
    </div>
    </>
  );
}