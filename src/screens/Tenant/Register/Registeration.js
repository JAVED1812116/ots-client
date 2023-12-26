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
import { RegisterTenant } from "../../../Redux/Reducer/TenantRegestration";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { Input } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetProperty } from "../../../Redux/Reducer/GetPropertyDetails";
import Checkbox from "@mui/material/Checkbox";
export default function Registration() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const dispatch = useDispatch();
  const [error, setError] = React.useState({});
  const [detail, setDetail] = React.useState({
    name: "",
    fatherName: "",
    cnicNo: "",
    occupation: "",
    mobileNumber: "",
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
  const [familyMembers, setFamilyMembers] = React.useState({
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
  const [flatDetails, setFlatDetails] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleCheckboxChange = (event, row) => {
    console.log(event, row);
    if (event.target.checked) {
      // Add the selected row to the array
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row]);
    } else {
      // Remove the unselected row from the array
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((selectedRow) => selectedRow !== row)
      );
    }
  };
  console.log(selectedRows, "selectedRows");
  React.useEffect(() => {
    document.title = "Registration";
  }, []);
  React.useEffect(() => {
    dispatch(GetProperty({ userId: sessionStorage.getItem("code") })).then(
      (res) => {
        console.log(res);
        setFlatDetails(res?.payload?.data?.data);
        // setData(res?.payload?.data?.data)

        // if (res?.payload?.data?.data[0]?.monthlyRent !== "") {
        // setFieldDisable(true)
        // }
        // let { monthlyRent, advance, maintenanceCharges, trashCharges } =res?.payload?.data?.data[0];
        // setDetail({
        //   monthlyRent,
        //   advance,
        //   maintenanceCharges,
        //   trashCharges,
        // });
      }
    );
  }, []);
  console.log(flatDetails, "flatDetails");
  React.useEffect(() => {
    const numToShow = parseInt(detail?.adultFamilyMembers, 10) || 0;

    const newRows = Array.from({ length: numToShow }, (_, index) => ({
      id: index,
    }));

    setFamilyMembers(
      Array.from({ length: numToShow }, (_, index) => ({
        id: index,
      }))
    );

    setGeneratedAdultRows(newRows);
  }, [detail?.adultFamilyMembers]);
  React.useEffect(() => {
    const numToShow = parseInt(detail?.childrenFamilyMembers, 10) || 0;

    const newRows = Array.from({ length: numToShow }, (_, index) => ({
      id: index,
    }));

    setChildrenRows(
      Array.from({ length: numToShow }, (_, index) => ({
        id: index,
      }))
    );

    setGeneratedChildrenRows(newRows);
  }, [detail?.childrenFamilyMembers]);

  const handleFamilyMembersCellChange = (i, e) => {
    // Update the state with the new value
    const { name, value } = e.target;
    setFamilyMembers((prevRows) => {
      return prevRows.map((row) =>
        row.id === i ? { ...row, [name]: value } : row
      );
    });
  };
  const handleChildrenCellChange = (i, e) => {
    // Update the state with the new value
    const { name, value } = e.target;
    setChildrenRows((prevRows) => {
      return prevRows.map((row) =>
        row.id === i ? { ...row, [name]: value } : row
      );
    });
  };

  const renderFamilyMemberGrid = () => {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <Box sx={{ height: 400, width: "auto" }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="propertyTable"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Father Name</TableCell>
                    <TableCell>Cnic</TableCell>
                    <TableCell>Relation</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Occupation</TableCell>
                    <TableCell>Company Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {generatedAdultRows.map((e, i) => (
                    <TableRow
                      // key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{i + 1}.</TableCell>
                      <TableCell component="th" scope="row">
                        <Input
                          name="familyMembersName"
                          onChange={(e) => handleFamilyMembersCellChange(i, e)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Input
                          name="familyMembersFatherName"
                          onChange={(e) => handleFamilyMembersCellChange(i, e)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Input
                          name="familyMembersCnic"
                          onChange={(e) => handleFamilyMembersCellChange(i, e)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Input
                          name="familyMembersRelation"
                          onChange={(e) => handleFamilyMembersCellChange(i, e)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Input
                          name="familyMembersAge"
                          onChange={(e) => handleFamilyMembersCellChange(i, e)}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row">
                        <Select
                          name="familyMembersOccupation"
                          onChange={(e) => handleFamilyMembersCellChange(i, e)}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={0}>Nothing</MenuItem>
                          <MenuItem value={1}>Student</MenuItem>
                          <MenuItem value={2}>Work</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Input
                          name="familyMembersCompanyName"
                          onChange={(e) => handleFamilyMembersCellChange(i, e)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    );
  };

  const renderChildrenGrid = () => {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <Box sx={{ height: 400, width: "auto" }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="propertyTable"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Father Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Occupation</TableCell>
                    <TableCell>Institute Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {generatedChildrenRows.map((e, i) => (
                    <TableRow
                      // key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{i + 1}.</TableCell>
                      <TableCell component="th" scope="row">
                        <Input
                          name="childrenName"
                          onChange={(e) => handleChildrenCellChange(i, e)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Input
                          name="childrenFatherName"
                          onChange={(e) => handleChildrenCellChange(i, e)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Input
                          type="number"
                          name="childrenAge"
                          onChange={(e) => handleChildrenCellChange(i, e)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Select
                          name="childrenOccupation"
                          onChange={(e) => handleChildrenCellChange(i, e)}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={0}>Nothing</MenuItem>
                          <MenuItem value={1}>Student</MenuItem>
                          <MenuItem value={2}>Work</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Input
                          name="childrenInstituteName"
                          onChange={(e) => handleChildrenCellChange(i, e)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === 2) {
      const keysToCheck = ["advance", "rent"];

      // Assuming your detail data is stored in a state variable named detail
      const emptyFields = keysToCheck
        .filter((key) => !detail[key]) // Check if the value of the specified key is falsy (empty)
        .map((key) => key);

      if (emptyFields.length > 0) {
        const errorMessage = `Please fill in the following fields: ${emptyFields.join(
          ", "
        )}.`;
        toast.error(errorMessage, {
          position: "top-center",
        });
        return;
      } else {
        setActiveStep(activeStep + 1);
      }
    }
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
      adultDetail: familyMembers,
      childrenDetail: childrenRows,
      userId: sessionStorage.getItem("user_id"),
      userName: sessionStorage.getItem("name"),
      flatDetails: flatDetails
    };
    dispatch(RegisterTenant({ values })).then((res) => {
      if (res?.payload?.data?.message === "Tenant Registered Successfully") {
        toast.success("Form Submitted", {
          position: "top-center",
        });
      } else {
        console.log("else");
      }
    });
  };

  // console.log(detail,"saeed")
  const handleNext = () => {
    if (activeStep === 0) {
      const keysToCheck = [
        "name",
        "fatherName",
        "cnicNo",
        "occupation",
        "mobileNumber",
        "permanentAddress",
        "gender",
        "maritialStatus",
      ];

      // Assuming your detail data is stored in a state variable named detail
      const emptyFields = keysToCheck
        .filter((key) => !detail[key]) // Check if the value of the specified key is falsy (empty)
        .map((key) => key);

      if (emptyFields.length > 0) {
        const errorMessage = `Please fill in the following fields: ${emptyFields.join(
          ", "
        )}.`;
        toast.error(errorMessage, {
          position: "top-center",
        });
        return;
      } else {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep === 1) {
      const keysToCheck = [
        "adultFamilyMembers",
        "childrenFamilyMembers",
        "language",
        "cast",
      ];

      // Assuming your detail data is stored in a state variable named detail
      const emptyFields = keysToCheck
        .filter((key) => !detail[key]) // Check if the value of the specified key is falsy (empty)
        .map((key) => key);

      if (emptyFields.length > 0) {
        const errorMessage = `Please fill in the following fields: ${emptyFields.join(
          ", "
        )}.`;
        toast.error(errorMessage, {
          position: "top-center",
        });
        return;
      } else {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getSteps() {
    return ["Basic Information", "Personal Information", "Booking"];
  }
  const isCnicValid = (cnicNo) => {
    // Regular expression for CNIC validation (e.g., 12345-6789012-3)
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    return cnicRegex.test(cnicNo);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "name" ||
        name === "fatherName" ||
        name === "occupation" ||
        name === "language" ||
        name === "cast") &&
      !/^[A-Za-z\s]*$/.test(value)
    ) {
      setError((prev) => ({ ...prev, [name]: true }));
      // If it's not a valid number, you can choose to ignore the Input or show an error message.
      return;
    }
    if (name === "mobileNumber" && !/^[0-9]*$/.test(value)) {
      setError((prev) => ({ ...prev, [name]: true }));
      // If it's not a valid number, you can choose to ignore the Input or show an error message.
      return;
    }
    if (name === "cnicNo" && !isCnicValid(value)) {
      setError((prev) => ({ ...prev, cnicNo: true }));
      return;
    }

    setError((prev) => ({ ...prev, [name]: false }));
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
              error={error.name}
              helperText={error.name ? "Please enter a valid Name" : ""}
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
              error={error.fatherName}
              helperText={
                error.fatherName ? "Please enter a valid Father Name" : ""
              }
            />
            <TextField
              id="standard-multiline-flexible"
              label="CNIC Number"
              variant="outlined"
              data-inputmask="'mask': '99999-9999999-9'"
              placeholder="XXXXX-XXXXXXX-X"
              fullWidth
              margin="normal"
              name="cnicNo"
              error={error.cnicNo}
              helperText={error.cnicNo ? "Please enter a valid CNIC" : ""}
              onChange={handleChange}
            />
            <TextField
              id="occupation"
              label="Occupation"
              variant="outlined"
              placeholder="Enter Your Occupation"
              fullWidth
              margin="normal"
              name="occupation"
              error={error.occupation}
              helperText={
                error.occupation ? "Please enter a valid Occupation" : ""
              }
              onChange={handleChange}
            />
            <TextField
              id="mobileNumber"
              label="Mobile Number"
              variant="outlined"
              placeholder="Enter Your Mobile Number"
              fullWidth
              margin="normal"
              name="mobileNumber"
              error={error.mobileNumber}
              helperText={
                error.mobileNumber ? "Please enter a valid Mobile Number" : ""
              }
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
                type="number"
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
                type="number"
                margin="normal"
                name="childrenFamilyMembers"
                onChange={handleChange}
              />
              {detail?.childrenFamilyMembers === 0 ||
              detail?.childrenFamilyMembers?.length === 0
                ? " "
                : renderChildrenGrid()}
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
              error={error.language}
              helperText={error.language ? "Please enter a valid Language" : ""}
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
              error={error.cast}
              helperText={error.cast ? "Please enter a valid Cast" : ""}
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
              type="number"
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
              type="number"
              name="rent"
              onChange={handleChange}
            />
            <Box sx={{ height: 400, width: "auto" }}>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 400 }}>
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    className="propertyTable"
                    stickyHeader
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>No.</TableCell>
                        <TableCell>Flat Name</TableCell>
                        <TableCell>Flat Number</TableCell>
                        <TableCell>Flat Floor</TableCell>
                        <TableCell>Rooms</TableCell>
                        <TableCell>Toilet</TableCell>
                        <TableCell>Kitchen</TableCell>
                        <TableCell>Rent</TableCell>
                        <TableCell>Advance</TableCell>
                        <TableCell>Maintainance Charges</TableCell>
                        <TableCell>Trash Charges</TableCell>
                        <TableCell>Security Charges</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {flatDetails.map((e, i) => (
                        <TableRow
                          // key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedRows.includes(e)}
                              onChange={(event) =>
                                handleCheckboxChange(event, e)
                              }
                            />
                          </TableCell>
                          <TableCell>{i + 1}.</TableCell>
                          <TableCell component="th" scope="row">
                            {e.flatName}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {e.flatNumber}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {e.flatFloor}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {e.flatRooms}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {e.flatToilet}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {e.flatKitchen}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {e.flatRent}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {e.flatAdvance}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {e.flatMaintananceCharges}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {e.flatTrashCharges}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            {e.flatSecurityCharges}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
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
        <Typography variant="h1" align="center">
          Pending
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
              </Box>
            </>
          </Box>
        </Container>
      )}
      <ToastContainer />
    </div>
  );
}
