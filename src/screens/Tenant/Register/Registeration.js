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
  Box,
  Container,
  FormControl,
} from "@mui/material";
import title from "../../../components/title";
import "./registration.css";

export default function Registeration() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [activeStep, setActiveStep] = useState(0);
  const step = getSteps();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getSteps() {
    return ["Basic Information", "Contact Information", "Personal Information"];
  }

  function stepContent(step) {
    title("Registration");
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

            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">
                Martial Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Martial Status"
                onChange={handleChange}
              >
                <MenuItem value={0}>Married</MenuItem>
                <MenuItem value={1}>UnMarried</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">
              Total Family Members
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Total Family Members"
              // onChange={handleChange}
            >
              <MenuItem value={0}>1</MenuItem>
              <MenuItem value={1}>2</MenuItem>
              <MenuItem value={1}>3</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-standard-label">
              Total Children
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"Select"}
              // value={age}
              label="Total Children"
              // onChange={handleChange}
            >
              <MenuItem value={0}>1</MenuItem>
              <MenuItem value={1}>2</MenuItem>
              <MenuItem value={1}>3</MenuItem>
            </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-standard-label">
              Employed
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"Select"}
              // value={age}
              label="Employed"
              // onChange={handleChange}
            >
              <MenuItem value={0}>1</MenuItem>
              <MenuItem value={1}>2</MenuItem>
              <MenuItem value={1}>3</MenuItem>
            </Select>
            </FormControl>
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

  return (
    <div>
      {activeStep === 3 ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <Container maxWidth="sm">
          <Box mt={20}>
            <>
              <Stepper activeStep={activeStep}>
                {step.map((step, index) => {
                  return (
                    <Step>
                      <StepLabel>Step {index + 1}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <form>{stepContent(activeStep)}</form>
              <Box
                // ml={48}
                mt={2}
              >
                <Button
                  variant="contained"
                  className="nextbtn"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  style={{ marginRight: 8 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  // color="primary"
                  onClick={handleNext}
                  className="nextbtn"
                >
                  {activeStep === 2 ? "Finish" : "Next"}
                </Button>
              </Box>
            </>
          </Box>
        </Container>
      )}
    </div>
  );
}
