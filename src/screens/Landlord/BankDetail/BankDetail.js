import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function BankDetail() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
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
    </Box>
    
  );
}