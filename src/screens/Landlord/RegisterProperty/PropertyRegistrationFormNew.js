import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
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
import Logo from "../../../assets/Logo.png";
import { PropertyRegisters } from "../../../Redux/Reducer/PropertyRegistration";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Input } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { ValidateUser } from "../../../Redux/Reducer/ValidateUser";
import {
  landlordDetailSchema,
  landlordPropertySchema,
} from "./validationSchema";
import { useFormik } from "formik";

export default function PropertyRegister() {
  title("PropertyRegister");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const { loginUser } = useSelector((state) => state);
  const initialValues = {
    ownerName: "",
    fatherName: "",
    cnic: "",
    contactNumber: "03",
    alternateNumber: "",
    permenantAddress: "",
    postalAddress: "",
    email: "",
    propertyAddress: "",
    totalFloor: 1,
    totalFlat: 1,
    flats: [],
    is_rent: 0,
  }
  const { values, errors, handleBlur, handleChange, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: activeStep === 0 ? landlordDetailSchema : landlordPropertySchema,
    onSubmit: (values, action) => {
      if (Object.keys(errors).length === 0) {
        if (activeStep === steps.length - 1) {
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
                    handleNext();
                  }
                  // action.resetForm();
      }
    },
  })
  React.useEffect(() => {
    if (values.totalFloor) {
      const total = parseInt(values.totalFloor);
      const existingRows = values.flats || [];

      // Create a copy of existing rows
      const updatedRows = [...existingRows];

      // Add new empty rows if totalFloor increased
      while (updatedRows.length < total) {
        updatedRows.push({
          flatName: "",
          flatNumber: "",
          flatFloor: "",
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
      }

      // Optionally trim rows if totalFloor decreased
      if (updatedRows.length > total) {
        updatedRows.length = total;
      }

      setFieldValue("flats", updatedRows);
    }
  }, [values.totalFloor]);

  const handleCellChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFlats = [...values.flats];
    updatedFlats[index][name] = value;
    setFieldValue("flats", updatedFlats);
  };

  function getSteps() {
    return ["Owner Detail", "Property Detail"];
  }
  function stepContent(step) {
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
                value={values.ownerName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.ownerName && Boolean(errors.ownerName)
                }
                helperText={touched.ownerName && errors.ownerName}
              />
              <TextField
                fullWidth
                id="fatherName"
                name="fatherName"
                label="Father Name"
                value={values.fatherName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.fatherName && Boolean(errors.fatherName)
                }
                helperText={
                  touched.fatherName && errors.fatherName
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
                value={values.cnic}
                name="cnic"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cnic && Boolean(errors.cnic)}
                helperText={touched.cnic && errors.cnic}
              />
              <TextField
                fullWidth
                id="contactNumber"
                name="contactNumber"
                label="Contact Number"
                type="number"
                value={values.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.contactNumber &&
                  Boolean(errors.contactNumber)
                }
                helperText={
                  touched.contactNumber && errors.contactNumber
                }
              />
              <TextField
                fullWidth
                id="permenantAddress"
                name="permenantAddress"
                label="Permenant Address"
                value={values.permenantAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.permenantAddress &&
                  Boolean(errors.permenantAddress)
                }
                helperText={
                  touched.permenantAddress &&
                  errors.permenantAddress
                }
              />
              <TextField
                fullWidth
                id="postalAddress"
                name="postalAddress"
                label="Postal Address"
                value={values.postalAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.postalAddress &&
                  Boolean(errors.postalAddress)
                }
                helperText={
                  touched.postalAddress && errors.postalAddress
                }
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="property-inputs">
              <TextField
                fullWidth
                id="propertyAddress"
                name="propertyAddress"
                label="Property Address"
                value={values.propertyAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.propertyAddress &&
                  Boolean(errors.propertyAddress)
                }
                helperText={
                  touched.propertyAddress &&
                  errors.propertyAddress
                }
              />
              <TextField
                fullWidth
                id="totalFloor"
                name="totalFloor"
                label="Total Floor"
                type="number"
                value={values.totalFloor}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.totalFloor && Boolean(errors.totalFloor)
                }
                helperText={
                  touched.totalFloor && errors.totalFloor
                }
              />
              {values?.totalFloor === "" ||
                values?.totalFloor === 0 ? (
                ""
              ) : (
                <TextField
                  fullWidth
                  id="totalFlat"
                  label="Total Flat"
                  type="number"
                  name="totalFlat"
                  value={values.totalFlat}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.totalFlat && Boolean(errors.totalFlat)
                  }
                  helperText={
                    touched.totalFlat && errors.totalFlat
                  }
                />
              )}
              {values?.totalFlat === 0 ||
                values?.totalFlat <= 0 ||
                values?.totalFlat?.length === 0 ||
                values?.totalFloor === 0 ||
                values?.totalFloor <= 0 ||
                values?.totalFloor?.length === 0
                ? " "
                : renderDataGrid()}
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
    if (activeStep === 0) {
      setActiveStep(activeStep + 1);
    }
  };
  React.useEffect(() => {
    const numToShow = parseInt(values?.totalFlat, 10) || 0;
    const existingFlats = values.flats || [];

    const updatedFlats = [...existingFlats];

    while (updatedFlats.length < numToShow) {
      updatedFlats.push({
        flatName: "",
        flatNumber: "",
        flatFloor: "",
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
    }

    if (updatedFlats.length > numToShow) {
      updatedFlats.length = numToShow;
    }

    setFieldValue("flats", updatedFlats);
  }, [values.totalFlat]);


  const renderDataGrid = () => {
    return (
      <div style={{ height: "auto", width: "100%" }}>
        <Box sx={{ height: "auto", width: "auto" }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="propertyTable"
                stickyHeader
              >
                {values?.totalFloor === "" ? (
                  ""
                ) : (
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>Flat Name</TableCell>
                      <TableCell>Flat Number</TableCell>
                      {values?.totalFloor == "0" ? (
                        ""
                      ): (
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
                {values?.totalFloor === "" ? (
                  ""
                ) : (
                  <TableBody>
                    {values.flats.map((flat, i) => (
                      <TableRow
                        // key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{i + 1}.</TableCell>
                        <TableCell component="th" scope="row" style={{ height: 10 }}>
                          <Input
                            placeholder="Flat Name"
                            name="flatName"
                            required
                            onChange={(e) => handleCellChange(i, e)}
                            value={flat.flatName}
                            onBlur={handleBlur}
                          />
                            {errors.flats?.[i]?.flatName && touched.flats?.[i]?.flatName && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatName}
                            </div>
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Number"
                            type="number"
                            name="flatNumber"
                            value={flat.flatNumber}
                            onChange={(e) => handleCellChange(i, e)}
                            onBlur={handleBlur}
                          />
                          {errors.flats?.[i]?.flatNumber && touched.flats?.[i]?.flatNumber && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatNumber}
                            </div>
                          )}
                        </TableCell>

                        {values?.totalFloor == "0" ? (
                            ""
                        ) : values?.totalFloor == "1" ? (
                          <TableCell component="th" scope="row">
                          <Select
                            defaultValue={1}
                            name="flatFloor"
                            value={flat.flatFloor=0}
                            disabled={true}
                            onChange={(e) => handleCellChange(i, e)}
                            displayEmpty
                            onBlur={handleBlur}
                          // inputProps={{ "aria-label": "Without label" }}
                          >
                            {Array.from(
                              {
                                length:
                                  values?.totalFloor
                                    ? values?.totalFloor
                                    : 1,
                              },
                              (_, index) => ({
                                id: index,
                              })
                            ).map((e, i) => {
                              return (
                                <MenuItem key={i} value={i}>
                                  {i === 0 ? "Ground Floor" : `${i} Floor`}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {errors.flats?.[i]?.flatFloor && touched.flats?.[i]?.flatFloor && (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {errors.flats[i].flatFloor}
                          </div>
                        )}
                        </TableCell>
                        ) : (
                          <TableCell component="th" scope="row">
                            <Select
                              defaultValue={1}
                              name="flatFloor"
                              value={flat.flatFloor}
                              onChange={(e) => handleCellChange(i, e)}
                              displayEmpty
                              onBlur={handleBlur}
                            // inputProps={{ "aria-label": "Without label" }}
                            >
                              {Array.from(
                                {
                                  length:
                                    values?.totalFloor
                                      ? values?.totalFloor
                                      : 1,
                                },
                                (_, index) => ({
                                  id: index,
                                })
                              ).map((e, i) => {
                                return (
                                  <MenuItem key={i} value={i}>
                                    {i === 0 ? "Ground Floor" : `${i} Floor`}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                            {errors.flats?.[i]?.flatFloor && touched.flats?.[i]?.flatFloor && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatFloor}
                            </div>
                          )}
                          </TableCell>
                        )}
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Rooms"
                            type="number"
                            required
                            name="flatRooms"
                            onChange={(e) => handleCellChange(i, e)}
                            onBlur={handleBlur}
                          />
                           {errors.flats?.[i]?.flatRooms && touched.flats?.[i]?.flatRooms && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatRooms}
                            </div>
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Toilet"
                            type="number"
                            required
                            name="flatToilet"
                            onChange={(e) => handleCellChange(i, e)}
                            onBlur={handleBlur}
                          />
                           {errors.flats?.[i]?.flatToilet && touched.flats?.[i]?.flatToilet && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatToilet}
                            </div>
                          )}
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Kitchen"
                            type="number"
                            required
                            name="flatKitchen"
                            onChange={(e) => handleCellChange(i, e)}
                            onBlur={handleBlur}
                          />
                          {errors.flats?.[i]?.flatKitchen && touched.flats?.[i]?.flatKitchen && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatKitchen}
                            </div>
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Rent"
                            type="number"
                            required
                            name="flatRent"
                            onChange={(e) => handleCellChange(i, e)}
                            onBlur={handleBlur}
                          />
                          {errors.flats?.[i]?.flatRent && touched.flats?.[i]?.flatRent && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatRent}
                            </div>
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Flat Advance"
                            type="number"
                            required
                            name="flatAdvance"
                            onChange={(e) => handleCellChange(i, e)}
                            onBlur={handleBlur}
                          />
                          {errors.flats?.[i]?.flatAdvance && touched.flats?.[i]?.flatAdvance && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatAdvance}
                            </div>
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Maintainance Charges"
                            type="number"
                            required
                            name="flatMaintananceCharges"
                            onChange={(e) => handleCellChange(i, e)}
                            onBlur={handleBlur}
                          />
                           {errors.flats?.[i]?.flatMaintananceCharges && touched.flats?.[i]?.flatMaintananceCharges && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatMaintananceCharges}
                            </div>
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Trash Charges"
                            type="number"
                            required
                            name="flatTrashCharges"
                            onChange={(e) => handleCellChange(i, e)}
                            onBlur={handleBlur}
                          />
                           {errors.flats?.[i]?.flatTrashCharges && touched.flats?.[i]?.flatTrashCharges && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatTrashCharges}
                            </div>
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input
                            placeholder="Security Charges"
                            type="number"
                            required
                            name="flatSecurityCharges"
                            onChange={(e) => handleCellChange(i, e)}
                            onBlur={handleBlur}
                          />
                           {errors.flats?.[i]?.flatSecurityCharges && touched.flats?.[i]?.flatSecurityCharges && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].flatSecurityCharges}
                            </div>
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Select
                            defaultValue={0}
                            // value={age}
                            name="is_rent"
                            onChange={(e) => handleCellChange(i, e)}
                            onBlur={handleBlur}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value={0}>Vacant</MenuItem>
                            <MenuItem value={1}>RentOut</MenuItem>
                          </Select>
                           {errors.flats?.[i]?.is_rent && touched.flats?.[i]?.is_rent && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {errors.flats[i].is_rent}
                            </div>
                          )}
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
  // const onFinish = (e) => {
  //   e.preventDefault();
  //   if (Object.values(error).some((value) => value !== true)) {
  //     let values = {
  //       ownerName: detail?.ownerName,
  //       fatherName: detail?.fatherName,
  //       cnic: detail?.cnic,
  //       contactNumber: detail?.contactNumber,
  //       alternateNumber: detail?.alternateNumber,
  //       permenantAddress: detail?.permenantAddress,
  //       postalAddress: detail?.postalAddress,
  //       email: detail?.email,
  //       propertyAddress: detail?.propertyAddress,
  //       totalFloor: detail?.totalFloor,
  //       totalFlat: detail?.totalFlat,
  //       flatDetail: rows,
  //       userId: sessionStorage.getItem("user_id"),
  //       userName: sessionStorage.getItem("name"),
  //     };

  //     const emptyFields = Object.entries(values)
  //       .filter(([key, value]) => !value)
  //       .map(([key]) => key);

  //     if (emptyFields.length > 0) {
  //       const errorMessage = `Please fill in the following fields: ${emptyFields.join(
  //         ", "
  //       )}.`;
  //       toast.error(errorMessage, {
  //         position: "top-center",
  //       });
  //       return;
  //     }

  //     if (
  //       values?.totalFlat !== 0 ||
  //       values?.ownerName !== "" ||
  //       values?.fatherName !== "" ||
  //       values?.cnic !== "" ||
  //       values?.contactNumber !== "" ||
  //       values?.alternateNumber !== "" ||
  //       values?.permenantAddress !== "" ||
  //       values?.postalAddress !== "" ||
  //       values?.email !== "" ||
  //       values?.propertyAddress !== "" ||
  //       values?.totalFloor !== ""
  //     ) {
  //       if (values?.flatDetail !== "") {
  //         dispatch(PropertyRegisters({ values })).then((res) => {
  //           if (res?.payload?.data?.message === "Property Set Successfully") {
  //             toast.success("Property Register Successfully", {
  //               position: "top-center",
  //             });
  //             sessionStorage.setItem("is_register", true);
  //             let token = loginUser?.login?.data?.data?.password;
  //             dispatch(
  //               ValidateUser({
  //                 email: loginUser?.login?.data?.data?.email,
  //                 token,
  //               })
  //             ).then((re) => {
  //               if (re) {
  //                 // setTimeout(() => {
  //                 navigate("/pending-request");
  //                 // }, 2200);
  //               }
  //             });
  //           }
  //         });
  //       } else {
  //         toast.error("Please fill all flat detail", {
  //           position: "top-center",
  //         });
  //       }
  //     } else {
  //       toast.error("Please fill in all required fields.", {
  //         position: "top-center",
  //       });
  //     }
  //   } else {
  //     toast.error("Please enter valid values.", {
  //       position: "top-center",
  //     });
  //   }
  // };
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
          <Box mt={15}>
            <>
              <Typography mb={1} variant="h4" align="center" color="primary">
                LANDLORD REGISTRATION
              </Typography>
              <Typography
                mb={5}
                variant="h6"
                align="center"
                color="textPrimary"
              >
                Join OTS: Unlock Your Property's Potential!
              </Typography>
              <Stepper sx={{ marginBottom: 2 }} activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form onSubmit={handleSubmit}>
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
                  <Button
                    variant="contained"
                    type="submit"
                    // onClick={handleSubmit}

                  >
                    {activeStep === getSteps().length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </form>
            </>
          </Box>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}
