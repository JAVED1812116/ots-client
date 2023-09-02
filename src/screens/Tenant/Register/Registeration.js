import React, { useState, useEffect } from "react";
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
import { RegisterTenant } from "../../../Redux/Reducer/TenantRegestration";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
export default function Registration() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
const dispatch = useDispatch();
  const [detail, setDetail] = useState({
    name: "",
    fatherName: "",
    cnicNo: "",
    occupation: "",
    permanentAddress: "",
    gender: "",
    maritalStatus: "",
    familyMembers: "",
    children: "",
    employed: "",
    language: "",
    cast: "",
    advance: "",
    rent: "",
  });

  useEffect(() => {
    document.title = "Registration";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        dispatch(RegisterTenant({detail})).then((res)=>{
          // console.log(res?.payload?.data?.message,"res?.payload?.data?.message")
         if(res?.payload?.data?.message==="Tenant Registered Successfully"){
          
         }else{
          console.log("else")
         }
          });
  };

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
            required={true}
            onChange={handleChange}
            />
          <TextField
            id="fatherName"
            label="Father Name"
            variant="outlined"
            placeholder="Enter Your Father Name"
            fullWidth
            margin="normal"
            name="fatherName"
            onChange={handleChange}
            />
          <TextField
            id="cnicNo"
            label="CNIC Number"
            variant="outlined"
            placeholder="Enter Your CNIC Number"
            fullWidth
            margin="normal"
            name="cnicNo"
            onChange={handleChange}
            />
          <TextField
            id="occupation"
            label="occupation"
            variant="outlined"
            placeholder="Enter Your Occupation"
            fullWidth
            margin="normal"
            name="occupation"
            onChange={handleChange}
            />
          <TextField
            id="permanentAddress"
            label="Permanent Address"
            variant="outlined"
            placeholder="Enter Your Permanent Address"
            fullWidth
            margin="normal"
            name="permanentAddress"
            onChange={handleChange}
            />

          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
              onChange={handleChange}
              name="gender"
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
              name="maritialStatus"
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
            name="familyMembers"
            onChange={handleChange}
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
            name="children"
            onChange={handleChange}
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
            name="employed"
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <TextField
            id="cast"
            label="Cast"
            variant="outlined"
            placeholder="Enter Your Cast"
            fullWidth
            margin="normal"
            name="cast"
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <TextField
            id="rent"
            label="Monthly Rent"
            variant="outlined"
            placeholder="Enter Your Monthly Rent"
            fullWidth
            margin="normal"
            name="rent"
            onChange={handleChange}
          />
         
          
        </>
      );
      default:
        return "Unknown Case";
      }
      

    }
  return (
    <div>
      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <Container maxWidth="sm">
          Welcome {localStorage.getItem("name")}
          <Box mt={20}>
            <>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form onSubmit={handleSubmit}>{stepContent(activeStep)}</form>
              <Box mt={2}>
                <Button
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  style={{ marginRight: 8 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
                {console.log(steps.length,"activestep")}
              </Box>
            </>
          </Box>
        </Container>
      )}
    </div>
  );
}

