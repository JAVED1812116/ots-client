import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Wrapper from '../../../components/Wrapper';
import { useState } from 'react';
import { Typography } from '@mui/material';
export default function RentSetting() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <Wrapper open={open} setOpen={setOpen} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      ml={80}
      mt={20}
    >
        <Typography variant="h2" mb={5} gutterBottom>
          Rent Setting
        </Typography>
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
    </Box>
    </div>
    </>
    
  );
}