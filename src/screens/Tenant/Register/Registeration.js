import * as React from "react";
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
  Toolbar,
} from "@mui/material";
import Logo from "../../../assets/Logo.png";
import { RegisterTenant } from "../../../redux/Reducer/TenantRegestration";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
export default function Registration() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const dispatch = useDispatch();
  const [detail, setDetail] = React.useState({
    name: "",
    fatherName: "",
    cnicNo: "",
    occupation: "",
    permanentAddress: "",
    gender: "",
    maritalStatus: "",
    adultFamilyMembers: "",
    children: "",
    childrenFamilyMembers: "",
    language: "",
    cast: "",
    advance: "",
    rent: "",
  });
  const [rows, setRows] = React.useState({
    familyMembersName: "",
    familyMembersFatherName: "",
    familyMembersCnic: "",
    familyMembersRelations: "",
    familyMembersAge: "",
    adultOccupation: "",
    companyName: "",
  });
  const [childrenRows, setChildrenRows] = React.useState({
    childrenName: "",
    childrenFatherName: "",
    childrenAge: "",
    childrenOccupation: "",
    childrenInstituteName: "",
  });
  const [generatedAdultRows, setGeneratedAdultRows] = React.useState([]);
  const [generatedChildrenRows, setGeneratedChildrenRows] = React.useState([]);
  React.useEffect(() => {
    document.title = "Registration";
  }, []);

  const handleCellChange = (rowId, field, value) => {
    // Update the state with the new value
    console.log(value, "LLLLLLLLLLLLLLLLLLLLLL");
    setRows((prevRows) => {
      return prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      );
    });
  };
  const handleChildrenCellChange = (rowId, field, value) => {
    // Update the state with the new value
    setChildrenRows((prevRows) => {
      return prevRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row
      );
    });
  };

  const adultColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "familyMembersName",
      headerName: "Name",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          style={{ width: 125 }}
          value={params.row.familyMembersName || ""}
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
        console.log(params, "baba"),
        (
          <input
            type="text"
            style={{ width: 125 }}
            value={params.row.familyMembersFatherName || ""}
            onChange={(e) =>
              handleCellChange(
                params.row.id,
                "familyMembersFatherName",
                e.target.value
              )
            }
          />
        )
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
          style={{ width: 125 }}
          value={params.row.familyMembersCnic || ""}
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
          style={{ width: 125 }}
          value={params.row.familyMembersRelations || ""}
          onChange={(e) =>
            handleCellChange(
              params.row.id,
              "familyMembersRelations",
              e.target.value
            )
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
          style={{ width: 125 }}
          value={params.row.familyMembersAge || ""}
          onChange={(e) =>
            handleCellChange(params.row.id, "familyMembersAge", e.target.value)
          }
        />
      ),
    },
    {
      field: "adultOccupation",
      headerName: "Occupation",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={(e) =>
            handleCellChange(params.row.id, "adultOccupation", e.target.value)
          }
          autoWidth
          label="adultOccupation"
        >
          <MenuItem value={1}>Student</MenuItem>
          <MenuItem value={2}>Employeed</MenuItem>
          <MenuItem value={0}>Nothing</MenuItem>
        </Select>
      ),
    },
    {
      field: "companyName",
      headerName: "Company Name",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          style={{ width: 125 }}
          value={params.row.companyName || ""}
          onChange={(e) =>
            handleCellChange(params.row.id, "companyName", e.target.value)
          }
        />
      ),
    },
  ];
  const childrenColumns = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "childrenName",
      headerName: "Name",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          style={{ width: 125 }}
          value={params.row.childrenName || ""}
          onChange={(e) =>
            handleChildrenCellChange(
              params.row.id,
              "childrenName",
              e.target.value
            )
          }
        />
      ),
    },
    {
      field: "childrenFatherName",
      headerName: "Father Name",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          style={{ width: 125 }}
          value={params.row.childrenFatherName || ""}
          onChange={(e) =>
            handleChildrenCellChange(
              params.row.id,
              "childrenFatherName",
              e.target.value
            )
          }
        />
      ),
    },
    {
      field: "childrenAge",
      headerName: "Age",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          style={{ width: 125 }}
          value={params.row.childrenAge || ""}
          onChange={(e) =>
            handleChildrenCellChange(
              params.row.id,
              "childrenAge",
              e.target.value
            )
          }
        />
      ),
    },
    {
      field: "childrenOccupation",
      headerName: "Occupation",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={(e) =>
            handleChildrenCellChange(
              params.row.id,
              "childrenOccupation",
              e.target.value
            )
          }
          autoWidth
          label="childrenOccupation"
        >
          <MenuItem value={1}>Student</MenuItem>
          <MenuItem value={2}>Employeed</MenuItem>
          <MenuItem value={0}>Nothing</MenuItem>
        </Select>
      ),
    },
    {
      field: "childrenInstituteName",
      headerName: "Institute Name",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          style={{ width: 125 }}
          value={params.row.childrenInstituteName || ""}
          onChange={(e) =>
            handleChildrenCellChange(
              params.row.id,
              "childrenInstituteName",
              e.target.value
            )
          }
        />
      ),
    },
  ];
  React.useEffect(() => {
    const numToShow = parseInt(detail?.adultFamilyMembers, 10) || 0;

    const newRows = Array.from({ length: numToShow }, (_, index) => ({
      id: index + 1,
    }));

    setRows(
      Array.from({ length: numToShow }, (_, index) => ({
        id: index + 1,
      }))
    );

    setGeneratedAdultRows(newRows);
  }, [detail?.adultFamilyMembers]);
  React.useEffect(() => {
    const numToShow = parseInt(detail?.childrenFamilyMembers, 10) || 0;

    const newRows = Array.from({ length: numToShow }, (_, index) => ({
      id: index + 1,
    }));

    setChildrenRows(
      Array.from({ length: numToShow }, (_, index) => ({
        id: index + 1,
      }))
    );

    setGeneratedChildrenRows(newRows);
  }, [detail?.childrenFamilyMembers]);

  const renderFamilyMemberGrid = () => {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <Box sx={{ height: 400, width: "auto" }}>
          <DataGrid
            rows={generatedAdultRows}
            columns={adultColumns}
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
            rows={generatedChildrenRows}
            columns={childrenColumns}
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
    let values = {
      name: detail?.name,
      fatherName: detail?.fatherName,
      cnicNo: detail?.cnicNo,
      occupation: detail?.occupation,
      permanentAddress: detail?.permanentAddress,
      gender: detail?.gender,
      maritalStatus: detail?.maritalStatus,
      adultFamilyMembers: detail?.adultFamilyMembers,
      children: detail?.children,
      childrenFamilyMembers: detail?.childrenFamilyMembers,
      language: detail?.language,
      cast: detail?.cast,
      advance: detail?.advance,
      rent: detail?.rent,
      adultDetail: rows,
      childrenDetail: childrenRows,
      userId: localStorage.getItem("user_id"),
      userName: localStorage.getItem("name"),
    };
    dispatch(RegisterTenant({ values })).then((res) => {
      // console.log(res?.payload?.data?.message,"res?.payload?.data?.message")
      if (res?.payload?.data?.message === "Tenant Registered Successfully") {
      } else {
        console.log("else");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };
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
                id="adultFamilyMembers"
                label="Total Adult"
                variant="outlined"
                placeholder="Total Family Members"
                fullWidth
                margin="normal"
                name="adultFamilyMembers"
                onChange={handleChange}
              />
              {detail?.adultFamilyMembers === 0 ||
              detail?.adultFamilyMembers?.length === 0
                ? " "
                : renderFamilyMemberGrid()}
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="childrenFamilyMembers"
                label="Total Children"
                variant="outlined"
                placeholder="Total Employed Person"
                fullWidth
                margin="normal"
                name="childrenFamilyMembers"
                onChange={handleChange}
              />
              {detail?.childrenFamilyMembers === 0 ||
              detail?.childrenFamilyMembers?.length === 0
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
  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <div>
      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <Container maxWidth="sm">
          <AppBar position="fixed">
            <Toolbar style={{ backgroundColor: "black" }}>
              <Box
                component="img"
                sx={{
                  height: 56,
                  margin: 1,
                }}
                alt="Your logo."
                src={Logo}
              />
            </Toolbar>
          </AppBar>
          {/* Welcome {localStorage.getItem("name")} */}
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
                  onClick={
                    activeStep === steps.length - 1 ? handleSubmit : handleNext
                  }
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
                {console.log(steps.length, "activestep")}
              </Box>
            </>
          </Box>
        </Container>
      )}
    </div>
  );
}
