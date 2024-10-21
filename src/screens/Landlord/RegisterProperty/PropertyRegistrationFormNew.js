import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Unstable_Grid2";
import title from "../../../components/title";
import Box from "@mui/material/Box";
import "./registerProperty.css";
import Toolbar from "@mui/material/Toolbar";
import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Logo from "../../../assets/Logo.png";
import { PropertyRegisters } from "../../../Redux/Reducer/PropertyRegistration";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Input } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ValidateUser } from "../../../Redux/Reducer/ValidateUser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./validationSchema";
import { useFormik } from "formik";

export default function PropertyRegister() {
  title("PropertyRegister");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [detail, setDetail] = React.useState({
    totalFlat: 0, // Set a default value for totalFlat
    ownerName: "",
    fatherName: "",
    cnic: "",
    contactNumber: "",
    alternateNumber: "",
    permenantAddress: "",
    postalAddress: "",
    email: "",
    propertyAddress: "",
    totalFloor: "",
  });
  const [rows, setRows] = React.useState({
    flatName: "",
    flatNumber: "",
    flatFloor: 0,
    flatRooms: "",
    flatToilet: "",
    flatKitchen: "",
    flatRent: "",
    flatAdvance: "",
    flatMaintananceCharges: "",
    flatTrashCharges: "",
    flatSecurityCharges: "",
    is_rent: 0,
  });
  const [generatedRows, setGeneratedRows] = React.useState([]);

  const [error, setError] = React.useState({});
  const { loginUser } = useSelector((state) => state);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDetail((prev) => {
  //     return { ...prev, [name]: value };
  //   });
  // };
  const formik = useFormik({
    initialValues: {
      ownerName: "",
      fatherName: "",
      cnic: "",
      contactNumber: "",
      alternateNumber: "",
      permenantAddress: "",
      postalAddress: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, 'values');
      alert(JSON.stringify(values, null, 2));
    },
  });

  function getSteps() {
    return ["Owner Detail", "Property Detail"];
  }
  function stepContent(
    step
    // handleChange,
    // handleBlur,
    // values,
    // errors,
    // touched,
    // setTouched
  ) {
    // console.log(errors, 'errors');
    switch (step) {
      case 0:
        return (
          <>
            <div className="property-inputs">
              <TextField
                fullWidth
                id="ownerName"
                name="ownerName"
                label="Owner Name"
                value={formik.values.ownerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ownerName && Boolean(formik.errors.ownerName)
                }
                helperText={formik.touched.ownerName && formik.errors.ownerName}
              />
              <TextField
                fullWidth
                id="fatherName"
                name="fatherName"
                label="Father Name"
                value={formik.values.fatherName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fatherName && Boolean(formik.errors.fatherName)
                }
                helperText={
                  formik.touched.fatherName && formik.errors.fatherName
                }
              />
              <TextField
                fullWidth
                id="CNIC"
                label="CNIC"
                multiline
                type="number"
                data-inputmask="'mask': '99999-9999999-9'"
                placeholder="XXXXX-XXXXXXX-X"
                maxRows={4}
                // variant="standard"
                value={formik.values.cnic}
                name="cnic"
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cnic && Boolean(formik.errors.cnic)}
                helperText={formik.touched.cnic && formik.errors.cnic}
              />
              <TextField
                fullWidth
                id="contactNumber"
                name="contactNumber"
                label="Contact Number"
                type="number"
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.contactNumber &&
                  Boolean(formik.errors.contactNumber)
                }
                helperText={
                  formik.touched.contactNumber && formik.errors.contactNumber
                }
              />
              {/* <TextField
                fullWidth
                id="alternateNumber"
                name="alternateNumber"
                label="Alternate Number"
                type="number"
                value={formik.values.alternateNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.alternateNumber &&
                  Boolean(formik.errors.alternateNumber)
                }
                helperText={
                  formik.touched.alternateNumber &&
                  formik.errors.alternateNumber
                }
              /> */}
              <TextField
                fullWidth
                id="permenantAddress"
                name="permenantAddress"
                label="Permenant Address"
                value={formik.values.permenantAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.permenantAddress &&
                  Boolean(formik.errors.permenantAddress)
                }
                helperText={
                  formik.touched.permenantAddress &&
                  formik.errors.permenantAddress
                }
              />
              <TextField
                fullWidth
                id="postalAddress"
                name="postalAddress"
                label="Postal Address"
                value={formik.values.postalAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.postalAddress &&
                  Boolean(formik.errors.postalAddress)
                }
                helperText={
                  formik.touched.postalAddress && formik.errors.postalAddress
                }
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              {/* 
              
              <Field
                as={TextField}
                label="Alternate Number"
                name="alternateNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.alternateNumber}
                error={!!errors.alternateNumber}
                helperText={<ErrorMessage name="alternateNumber" />}
              />
              <Field
                as={TextField}
                required
                label="Permanent Address"
                name="permenantAddress"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.permenantAddress}
                error={!!errors.permenantAddress}
                helperText={<ErrorMessage name="permenantAddress" />}
              />
              <Field
                as={TextField}
                required
                label="Postal Address"
                name="postalAddress"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.postalAddress}
                error={!!errors.postalAddress}
                helperText={<ErrorMessage name="postalAddress" />}
              />
              <Field
                as={TextField}
                required
                label="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={!!errors.email}
                helperText={<ErrorMessage name="email" />}
              /> */}
            </div>
          </>
        );
      default:
        return "Unknown Case";
    }
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleNext = () => {
    console.log(activeStep, "activeStep");
    if (activeStep === 0) {
    }
  };
  const handleSubmit = async (e) => {};
  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  console.log(formik.values, "formik");
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the entered value is not a valid number for "cnic" or "contactNumber" fields
    if (name === "totalFloor" && value === "0") {
      setError((prev) => ({ ...prev, totalFloor: true }));
      return;
    }
    if (
      (name === "contactNumber" ||
        name === "alternateNumber" ||
        name === "totalFloor" ||
        name === "totalFlat") &&
      !/^[0-9]*$/.test(value)
    ) {
      setError((prev) => ({ ...prev, [name]: true }));
      // If it's not a valid number, you can choose to ignore the Input or show an error message.
      return;
    }
    if (
      (name === "ownerName" || name === "fatherName") &&
      !/^[A-Za-z\s]*$/.test(value)
    ) {
      setError((prev) => ({ ...prev, [name]: true }));
      // If it's not a valid number, you can choose to ignore the Input or show an error message.
      return;
    }
    if (name === "email" && !isEmailValid(value)) {
      setError((prev) => ({ ...prev, email: true }));
      return;
    }
    if (
      name === "cnic"
      //  && !isCnicValid(value)
    ) {
      const numericCnic = value.replace(/\D/g, "");

      // Format CNIC as XXXXX-XXXXXXX-X
      const formattedCnic =
        numericCnic.slice(0, 5) +
        (numericCnic.length > 5 ? "-" + numericCnic.slice(5, 12) : "") +
        (numericCnic.length > 12 ? "-" + numericCnic.slice(12, 13) : "");

      setDetail((prev) => {
        return { ...prev, [name]: formattedCnic };
      });
      formik.setFieldValue("cnic", formattedCnic);

      // setError((prev) => ({ ...prev, cnic: true }));
      // return;
    }
    setError((prev) => ({ ...prev, [name]: false }));
    // Check if the entered value is a number for the "CNIC" field

    // Update the state

    if (name === "cnic") {
    } else {
      setDetail((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };
  const handleCellChange = (rowId, e) => {
    const { name, value } = e.target;

    if (
      (name === "flatNumber" ||
        name === "flatFloor" ||
        name === "flatRooms" ||
        name === "flatToilet" ||
        name === "flatKitchen" ||
        name === "flatRent" ||
        name === "flatAdvance" ||
        name === "flatMaintananceCharges" ||
        name === "flatTrashCharges" ||
        name === "flatSecurityCharges") &&
      !/^[0-9]*$/.test(value)
    ) {
      // If it's not a valid number, you can choose to ignore the Input or show an error message.
      return;
    }
    if (name === "flatName" && !/^[A-Za-z\s]*$/.test(value)) {
      // If it's not a valid number, you can choose to ignore the Input or show an error message.
      return;
    }
    // Update the state with the new value

    setRows((prevRows) => {
      return prevRows.map((row) =>
        row.id === rowId ? { ...row, [name]: value, tenantId: "" } : row
      );
    });
  };

  React.useEffect(() => {
    const numToShow = parseInt(detail?.totalFlat, 10) || 0;

    const newRows = Array.from({ length: numToShow }, (_, index) => ({
      id: index,
    }));

    setRows(
      Array.from({ length: numToShow }, (_, index) => ({
        id: index,
        flatName: "",
        flatNumber: "",
        flatFloor: 0,
        flatRooms: "",
        flatToilet: "",
        flatKitchen: "",
        flatRent: "",
        flatAdvance: "",
        flatMaintananceCharges: "",
        flatTrashCharges: "",
        flatSecurityCharges: "",
        is_rent: 0,
      }))
    );

    setGeneratedRows(newRows);
  }, [detail?.totalFlat]);

  const renderDataGrid = () => {
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
                {detail?.totalFloor === "" ? (
                  ""
                ) : (
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>Flat Name</TableCell>
                      <TableCell>Flat Number</TableCell>
                      {detail?.totalFloor == "0" ? (
                        ""
                      ) : detail?.totalFloor == "1" ? (
                        ""
                      ) : (
                        <TableCell>Flat Floor</TableCell>
                      )}
                      <TableCell>Rooms</TableCell>
                      <TableCell>Toilet</TableCell>
                      <TableCell>Kitchen</TableCell>
                      <TableCell>Rent</TableCell>
                      <TableCell>Advance</TableCell>
                      <TableCell>Maintainance Charges</TableCell>
                      <TableCell>Trash Charges</TableCell>
                      <TableCell>Security Charges</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                )}
                {detail?.totalFloor === "" ? (
                  ""
                ) : (
                  <TableBody>
                    {generatedRows.map((e, i) => (
                      <TableRow
                        // key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{i + 1}.</TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Name"
                            name="flatName"
                            required
                            onChange={(e) => handleCellChange(i, e)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Number"
                            type="number"
                            name="flatNumber"
                            required
                            onChange={(e) => handleCellChange(i, e)}
                          />
                        </TableCell>
                        {detail?.totalFloor == "0" ? (
                          ""
                        ) : detail?.totalFloor == "1" ? (
                          ""
                        ) : (
                          <TableCell component="th" scope="row">
                            <Select
                              defaultValue={1}
                              // value={age}
                              name="flatFloor"
                              onChange={(e) => handleCellChange(i, e)}
                              displayEmpty
                              // inputProps={{ "aria-label": "Without label" }}
                            >
                              {Array.from(
                                {
                                  length:
                                    detail?.totalFloor?.length > 0
                                      ? detail?.totalFloor
                                      : 1,
                                },
                                (_, index) => ({
                                  id: index,
                                })
                              ).map((e, i) => {
                                return (
                                  <MenuItem key={i} value={i}>
                                    {i === 0 ? "Ground Floor" : `${i} floor`}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </TableCell>
                        )}
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Rooms"
                            type="number"
                            required
                            name="flatRooms"
                            onChange={(e) => handleCellChange(i, e)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Toilet"
                            type="number"
                            required
                            name="flatToilet"
                            onChange={(e) => handleCellChange(i, e)}
                          />
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Kitchen"
                            type="number"
                            required
                            name="flatKitchen"
                            onChange={(e) => handleCellChange(i, e)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Rent"
                            type="number"
                            required
                            name="flatRent"
                            onChange={(e) => handleCellChange(i, e)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Advance"
                            type="number"
                            required
                            name="flatAdvance"
                            onChange={(e) => handleCellChange(i, e)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Maintainance Charges"
                            type="number"
                            required
                            name="flatMaintananceCharges"
                            onChange={(e) => handleCellChange(i, e)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Trash Charges"
                            type="number"
                            required
                            name="flatTrashCharges"
                            onChange={(e) => handleCellChange(i, e)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Security Charges"
                            type="number"
                            required
                            name="flatSecurityCharges"
                            onChange={(e) => handleCellChange(i, e)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                          <Select
                            defaultValue={0}
                            // value={age}
                            name="is_rent"
                            onChange={(e) => handleCellChange(i, e)}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
                            <MenuItem value={0}>Vacant</MenuItem>
                            <MenuItem value={1}>RentOut</MenuItem>
                          </Select>
                          {/* </FormControl> */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    );
  };

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
  const onFinish = (e) => {
    e.preventDefault();
    if (Object.values(error).some((value) => value !== true)) {
      let values = {
        ownerName: detail?.ownerName,
        fatherName: detail?.fatherName,
        cnic: detail?.cnic,
        contactNumber: detail?.contactNumber,
        alternateNumber: detail?.alternateNumber,
        permenantAddress: detail?.permenantAddress,
        postalAddress: detail?.postalAddress,
        email: detail?.email,
        propertyAddress: detail?.propertyAddress,
        totalFloor: detail?.totalFloor,
        totalFlat: detail?.totalFlat,
        flatDetail: rows,
        userId: sessionStorage.getItem("user_id"),
        userName: sessionStorage.getItem("name"),
      };
      // const isEmptyField = Object.values(values).some(value => !value);

      // if (isEmptyField) {
      //   toast.error("Please fill in all fields.", {
      //     position: "top-center",
      //   });
      //   return;
      // }
      const emptyFields = Object.entries(values)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

      if (emptyFields.length > 0) {
        const errorMessage = `Please fill in the following fields: ${emptyFields.join(
          ", "
        )}.`;
        toast.error(errorMessage, {
          position: "top-center",
        });
        return;
      }

      if (
        values?.totalFlat !== 0 ||
        values?.ownerName !== "" ||
        values?.fatherName !== "" ||
        values?.cnic !== "" ||
        values?.contactNumber !== "" ||
        values?.alternateNumber !== "" ||
        values?.permenantAddress !== "" ||
        values?.postalAddress !== "" ||
        values?.email !== "" ||
        values?.propertyAddress !== "" ||
        values?.totalFloor !== ""
      ) {
        // rows?.flatName!==undefined||rows?.flatNumber!==undefined||rows?.flatFloor!==undefined||rows?.flatRoom!==undefined||rows?.flatToilet!==undefined||rows?.flatKitchen!==undefined||rows?.flatRent!==undefined||rows?.flatDeposit!==undefined||rows?.flatMaintainanceCharges!==undefined||rows?.flattrashCharges!==undefined||rows?.flatsecurityCharges!==undefined||rows?.is_rent!==undefined
        if (values?.flatDetail !== "") {
          dispatch(PropertyRegisters({ values })).then((res) => {
            if (res?.payload?.data?.message === "Property Set Successfully") {
              toast.success("Property Register Successfully", {
                position: "top-center",
              });
              sessionStorage.setItem("is_register", true);
              let token = loginUser?.login?.data?.data?.password;
              dispatch(
                ValidateUser({
                  email: loginUser?.login?.data?.data?.email,
                  token,
                })
              ).then((re) => {
                if (re) {
                  // setTimeout(() => {
                  navigate("/pending-request");
                  // }, 2200);
                }
              });
            }
          });
        } else {
          toast.error("Please fill all flat detail", {
            position: "top-center",
          });
        }
      } else {
        toast.error("Please fill in all required fields.", {
          position: "top-center",
        });
      }
    } else {
      toast.error("Please enter valid values.", {
        position: "top-center",
      });
    }
  };
  return (
    <>
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
          <Box mt={20}>
            <>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {/* <Formik
                initialValues={detail}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                // validateOnBlur={false} // Disable validation on blur
                // validateOnChange={false} // Disable validation on change
              >
                {({ handleChange, handleBlur, values, errors, touched, setTouched, handleSubmit  }) => ( */}
              <form onSubmit={formik.handleSubmit}>
                {stepContent(
                  activeStep
                  // handleChange,
                  // handleBlur,
                  // values,
                  // errors,
                  // touched
                )}
                <Box mt={2}>
                  <Button
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    style={{ marginRight: 8 }}
                  >
                    Back
                  </Button>
                  <Button variant="contained" type="submit">
                    {activeStep === getSteps().length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </form>
              {/* )} */}
              {/* </Formik> */}
            </>
          </Box>
          {/* <Grid
            container
            spacing={0}
            className="propertyRegContainer"
            component="form"
            onSubmit={onFinish}
          >
            <Grid className="boxShadow" md={3} sm={12}>
              <div>
                <h1>Owner Detail</h1>
                <Container maxWidth="sm">
                  <div className="property-inputs">
                    <TextField
                      required
                      id="standard-multiline-flexible"
                      label="Owner Name"
                      multiline
                      maxRows={4}
                      variant="standard"
                      name="ownerName"
                      onChange={handleChange}
                      error={error.ownerName}
                      helperText={
                        error.ownerName ? "Please enter a valid Owner Name" : ""
                      }
                    />
                    <TextField
                      required
                      id="standard-textarea"
                      label="Father Name"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      name="fatherName"
                      onChange={handleChange}
                      error={error.fatherName}
                      helperText={
                        error.fatherName
                          ? "Please enter a valid Father Name"
                          : ""
                      }
                    />

                    <TextField
                      required
                      id="standard-multiline-flexible"
                      label="CNIC"
                      multiline
                      type="number"
                      data-inputmask="'mask': '99999-9999999-9'"
                      placeholder="XXXXX-XXXXXXX-X"
                      maxRows={4}
                      variant="standard"
                      value={detail?.cnic}
                      name="cnic"
                      onChange={handleChange}
                      error={error.cnic}
                      helperText={error.cnic ? "Please enter a valid CNIC" : ""}
                    />
                    <TextField
                      required
                      id="standard-textarea"
                      label="Contact Number"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      name="contactNumber"
                      onChange={handleChange}
                      error={error.contactNumber}
                      helperText={
                        error.contactNumber
                          ? "Please enter a valid Contact Number"
                          : ""
                      }
                    />
                    <TextField
                      id="standard-textarea"
                      label="Alternate Number"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      name="alternateNumber"
                      onChange={handleChange}
                      error={error.alternateNumber}
                      helperText={
                        error.alternateNumber
                          ? "Please enter a valid Alternate Number"
                          : ""
                      }
                    />
                    <TextField
                      required
                      id="standard-textarea"
                      label="Permenant Address"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      name="permenantAddress"
                      onChange={handleChange}
                    />
                    <TextField
                      required
                      id="standard-textarea"
                      label="Postal Address"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      name="postalAddress"
                      onChange={handleChange}
                    />
                    <TextField
                      required
                      id="standard-textarea"
                      label="Email"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      name="email"
                      onChange={handleChange}
                      error={error.email}
                      helperText={
                        error.email ? "Please enter a valid Email Address" : ""
                      }
                    />
                  </div>
                </Container>
              </div>
            </Grid>

            <Grid className="boxShadow " md={6} sm={12}>
              <div>
                <h1>Property Detail</h1>
                <Container maxWidth="sm">
                  <div className="property-inputs">
                    <TextField
                      required
                      id="standard-multiline-flexible"
                      label="Property Address"
                      multiline
                      maxRows={4}
                      variant="standard"
                      name="propertyAddress"
                      onChange={handleChange}
                    />
                    <TextField
                      required
                      id="standard-textarea"
                      label="Total Floor"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      name="totalFloor"
                      onChange={handleChange}
                      error={error.totalFloor}
                      helperText={
                        error.totalFloor
                          ? "Please enter a valid Total Floor"
                          : ""
                      }
                    />
                    {detail?.totalFloor === "" ? (
                      ""
                    ) : (
                      <TextField
                        required
                        id="standard-multiline-flexible"
                        label="Total Flat"
                        multiline
                        maxRows={4}
                        variant="standard"
                        name="totalFlat"
                        onChange={handleChange}
                        error={error.totalFlat}
                        helperText={
                          error.totalFlat
                            ? "Please enter a valid Total Flat"
                            : ""
                        }
                      />
                    )}

                    {detail?.totalFlat === 0 || detail?.totalFlat?.length === 0
                      ? " "
                      : renderDataGrid()}
                  </div>
                </Container>
              </div>
            </Grid>
            <div className="registerButton">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginTop: 1,
                  background: "black",
                }}
              >
                Register
              </Button>
            </div>
          </Grid> */}
        </Container>
      )}
      <ToastContainer />
    </>
  );
}
