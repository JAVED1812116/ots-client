import React, { useState } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import title from "../../../components/title";
function getSteps() {
  return ["Basic Information", "Contact Information", "Personal Information"];
}
function stepContent(step) {
title("Registration")
  switch (step) {
    case 0:

      return (
        <>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            placeholder="Enter Your Name"
            fullWidth
            margin="normal"
            name="name"
          />
          <TextField
            id="fatherName"
            label="Father Name"
            variant="outlined"
            placeholder="Enter Your Father Name"
            fullWidth
            margin="normal"
            name="fatherName"
          />
          <TextField
            id="cnicNo"
            label="CNIC Number"
            variant="outlined"
            placeholder="Enter Your CNIC Number"
            fullWidth
            margin="normal"
            name="firstName"
          />
          <TextField
            id="occupation"
            label="Occupation"
            variant="outlined"
            placeholder="Enter Your Occupation"
            fullWidth
            margin="normal"
            name="occupation"
          />
          <TextField
            id="permanentAddress"
            label="Permanent Address"
            variant="outlined"
            placeholder="Enter Your Permanent Address"
            fullWidth
            margin="normal"
            name="permanentAddress"
          />
 
           <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
            <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={"Select"}
    // value={age}
    label="Age"
    // onChange={handleChange}
    style={{ width: '300px' }}
  >
    <MenuItem value={0}>Male</MenuItem>
    <MenuItem value={1}>Female</MenuItem>
  </Select>

  <InputLabel id="demo-simple-select-standard-label">Martial Status</InputLabel>
            <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={"Select"}
    // value={age}
    label="Age"
    // onChange={handleChange}
    style={{ width: '300px' }}
  >
    <MenuItem value={0}>Married</MenuItem>
    <MenuItem value={1}>UnMarried</MenuItem>
  </Select>
        </>
      );
      case 1: 
       return (
        <>
        <InputLabel id="demo-simple-select-standard-label">Total Family Members</InputLabel>
            <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={"Select"}
    // value={age}
    label="Age"
    // onChange={handleChange}
    style={{ width: '300px' }}
  >
    <MenuItem value={0}>1</MenuItem>
    <MenuItem value={1}>2</MenuItem>
    <MenuItem value={1}>3</MenuItem>
  </Select>
        <InputLabel id="demo-simple-select-standard-label">Total Children</InputLabel>
            <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={"Select"}
    // value={age}
    label="Age"
    // onChange={handleChange}
    style={{ width: '300px' }}
  >
    <MenuItem value={0}>1</MenuItem>
    <MenuItem value={1}>2</MenuItem>
    <MenuItem value={1}>3</MenuItem>
  </Select>
        <InputLabel id="demo-simple-select-standard-label">Employeed</InputLabel>
            <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={"Select"}
    // value={age}
    label="Age"
    // onChange={handleChange}
    style={{ width: '300px' }}
  >
    <MenuItem value={0}>1</MenuItem>
    <MenuItem value={1}>2</MenuItem>
    <MenuItem value={1}>3</MenuItem>
  </Select>
          <TextField
            id="language"
            label="Language"
            variant="outlined"
            placeholder="Enter Your Language"
            fullWidth
            margin="normal"
            name="language"
          />
          <TextField
            id="cast"
            label="Cast"
            variant="outlined"
            placeholder="Enter Your Cast"
            fullWidth
            margin="normal"
            name="cast"
          />
        </>
      );
      case 2: 
      return (
       <>
         <TextField
           id="advance"
           label="Advance"
           variant="outlined"
           placeholder="Enter Your Advance"
           fullWidth
           margin="normal"
           name="advance"
         />
         <TextField
           id="rent"
           label="Monthly Rent"
           variant="outlined"
           placeholder="Enter Your Monthly Rent"
           fullWidth
           margin="normal"
           name="rent"
         />
         <TextField
           id="firstName"
           label="First Name"
           variant="outlined"
           placeholder="Enter Your First Name"
           fullWidth
           margin="normal"
           name="firstName"
         />
       </>
     );
    default:
      return "Unknown Case";
  }
}
export default function Registeration() {
  const [activeStep, setActiveStep] = useState(0);
  const step = getSteps();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <div>
      {activeStep === 3 ? (
        <Typography variant="h3" align="center">
          Thankue
        </Typography>
      ) : (
        <>
          <Stepper activeStep={activeStep}>
            {step.map((step, index) => {
              return (
                <Step>
                  <StepLabel>step1</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <form>{stepContent(activeStep)}</form>
          <Button
            variant="contained"
            color="primary"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === 2 ? "Finish" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
}
