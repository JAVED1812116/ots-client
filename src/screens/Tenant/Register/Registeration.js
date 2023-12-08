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
import { RegisterTenant } from "../../../redux/Reducer/TenantRegestration";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
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
  const [rows, setRows] = React.useState({
    flatName: "",
    flatNumber: "",
    flatFloor: "",
    flatRoom: "",
    flatToilet: "",
    flatKitchen: "",
    flatRent: "",
    flatDeposit: "",
    flatMaintainanceCharges: "",
    flattrashCharges: "",
    flatsecurityCharges: "",
    flatStatus: "",
  });
  const [generatedRows, setGeneratedRows] = React.useState([]);
  const [generatedEmployedRows, setGeneratedEmployedRows] = React.useState([]);
  useEffect(() => {
    document.title = "Registration";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleCellChange = (rowId, field, value) => {
    // Update the state with the new value
    setRows((prevRows) => {
      return prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      );
    });
  };
  const familyColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: 'familyMembersName',
      headerName: 'Name',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          style={{width:125}}
          value={params.row.familyMembersName || ''}
          onChange={(e) =>
                    handleCellChange(params.row.id, "familyMembersName", e.target.value)
                  }
        />
      ),
    },
    {
      field: "familyMembersFatherName",
      headerName: "Father Name",
      width: 150,
      editable: true,
      renderCell: (params) => (
        console.log(params,"baba"),
        <input
        type="text"
        style={{width:125}}
        value={params.row.familyMembersFatherName || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "familyMembersFatherName", e.target.value)
                }
      />
      ),
    },

    {
      field: "familyMembersCnic",
      headerName: "CNIC",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
        type="text"
        style={{width:125}}
        value={params.row.familyMembersCnic || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "familyMembersCnic", e.target.value)
                }
      />
      ),
    },
    {
      field: "familyMembersRelations",
      headerName: "Relation",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          style={{width:125}}
          value={params.row.familyMembersRelations || ''}
          onChange={(e) =>
                    handleCellChange(params.row.id, "familyMembersRelations", e.target.value)
                  }
        />
      ),
    },
    {
      field: "familyMembersAge",
      headerName: "Age",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
        type="text"
        style={{width:125}}
        value={params.row.familyMembersAge || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "familyMembersAge", e.target.value)
                }
      />
      ),
    },
    {
      field: "familyMembersAliveorDeath",
      headerName: "Alive/Death",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          style={{width:125}}
          onChange={(e) =>
            handleCellChange(params.row.id, "familyMembersAliveorDeath", e.target.value)
          }
          autoWidth
          label="Alive Or Death"
        >
          <MenuItem value={1}>Alive</MenuItem>
          <MenuItem value={0}>Death</MenuItem>
        </Select>
      ),
    },
   
   
  ];
  const employeeColumns = [
    { field: "id", headerName: "ID", width: 70 },
    // {
    //   field: "flatName",
    //   headerName: "Flat Name",
    //   width: 150,
    //   renderCell: (params) => (
    //     <TextField
    //       id="standard-multiline-flexible"
    //       maxRows={4}
    //       variant="standard"
    //       name="flatName"
    //       required={true}
    //       onChange={(e) =>
    //         handleCellChange(params.row.id, "flatName", e.target.value)
    //       }
    //     />
    //   ),
    // },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          value={params.row.firstName || ''}
          onChange={(e) =>
                    handleCellChange(params.row.id, "flatName", e.target.value)
                  }
        />
      ),
    },
    {
      field: "flatNumber",
      headerName: "Flat Number",
      width: 150,
      editable: true,
      renderCell: (params) => (
        console.log(params,"baba"),
        <input
        type="text"
        value={params.row.flatNumber || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "flatNumber", e.target.value)
                }
      />
      ),
    },
    {
      field: "flatFloor",
      headerName: "Floor",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
        type="text"
        value={params.row.flatFloor || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "flatFloor", e.target.value)
                }
      />
      ),
    },
    {
      field: "flatRoom",
      headerName: "Room",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
        type="text"
        value={params.row.flatRoom || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "flatRoom", e.target.value)
                }
      />
      ),
    },
    {
      field: "flatToilet",
      headerName: "Toilet",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          value={params.row.flatToilet || ''}
          onChange={(e) =>
                    handleCellChange(params.row.id, "flatToilet", e.target.value)
                  }
        />
      ),
    },
    {
      field: "flatKitchen",
      headerName: "Kitchen",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
        type="text"
        value={params.row.flatKitchen || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "flatKitchen", e.target.value)
                }
      />
      ),
    },
    {
      field: "flatRent",
      headerName: "Flat Rent",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
        type="text"
        value={params.row.flatRent || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "flatRent", e.target.value)
                }
      />
      ),
    },
    {
      field: "flatDeposit",
      headerName: "Deposit",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
        type="text"
        value={params.row.flatDeposit || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "flatDeposit", e.target.value)
                }
      />
      ),
    },
    {
      field: "flatMaintainanceCharges",
      headerName: "Maintainance Charges",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <input
        type="text"
        value={params.row.flatMaintainanceCharges || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "flatMaintainanceCharges", e.target.value)
                }
      />
      ),
    },
    {
      field: "flattrashCharges",
      headerName: "Trash Charges",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
        type="text"
        value={params.row.flattrashCharges || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "flattrashCharges", e.target.value)
                }
      />
      ),
    },
    {
      field: "flatsecurityCharges",
      headerName: "Security Charges",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
        type="text"
        value={params.row.flatsecurityCharges || ''}
        onChange={(e) =>
                  handleCellChange(params.row.id, "flatsecurityCharges", e.target.value)
                }
      />
      ),
    },
    {
      field: "flatStatus",
      headerName: "Flat Status",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={(e) =>
            handleCellChange(params.row.id, "flatStatus", e.target.value)
          }
          autoWidth
          label="flatStatus"
        >
          <MenuItem value={0}>Vacant</MenuItem>
          <MenuItem value={1}>RentOut</MenuItem>
        </Select>
      ),
    },
  ];
  useEffect(() => {
    const numToShow = parseInt(detail?.familyMembers, 10) || 0;

    const newRows = Array.from({ length: numToShow }, (_, index) => ({
      id: index + 1,
    }));

    setRows(
      Array.from({ length: numToShow }, (_, index) => ({
        id: index + 1,
      }))
    );

    setGeneratedRows(newRows);
  }, [detail?.familyMembers]);
  useEffect(() => {
    const numToShow = parseInt(detail?.employed, 10) || 0;

    const newRows = Array.from({ length: numToShow }, (_, index) => ({
      id: index + 1,
    }));

    setRows(
      Array.from({ length: numToShow }, (_, index) => ({
        id: index + 1,
      }))
    );

    setGeneratedEmployedRows(newRows);
  }, [detail?.employed]);
  const renderFamilyMemberGrid = () => {

    return (
      <div style={{ height: 400, width: "100%" }}>
        <Box sx={{ height: 400, width: "auto" }}>
          <DataGrid
            rows={generatedRows}
            columns={familyColumns}
            pageSize={5} // Set to the number of rows you want to display per page
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[2, 5, 10]}
          />
        </Box>
      </div>
    );
  };
  const renderEmployedMemberGrid = () => {

    return (
      <div style={{ height: 400, width: "100%" }}>
        <Box sx={{ height: 400, width: "auto" }}>
          <DataGrid
            rows={generatedEmployedRows}
            columns={employeeColumns}
            pageSize={5} // Set to the number of rows you want to display per page
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[2, 5, 10]}
          />
        </Box>
      </div>
    );
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
    return ["Basic Information", "Personal Information", "Booking"];
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
          <TextField
            id="familyMembers"
            label="Family Members"
            variant="outlined"
            placeholder="Total Family Members"
            fullWidth
            margin="normal"
            name="familyMembers"
            onChange={handleChange}
          />
          {detail?.familyMembers === 0 || detail?.familyMembers?.length === 0
                  ? " "
                  : renderFamilyMemberGrid()}
          </FormControl>
        <FormControl fullWidth margin="normal">
       
          <TextField
            id="employed"
            label="Employed"
            variant="outlined"
            placeholder="Total Employed Person"
            fullWidth
            margin="normal"
            name="employed"
            onChange={handleChange}
          />
          {detail?.employed === 0 || detail?.employed?.length === 0
                  ? " "
                  : renderEmployedMemberGrid()}
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

