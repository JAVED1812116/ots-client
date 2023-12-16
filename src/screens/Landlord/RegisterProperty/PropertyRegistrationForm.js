import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Unstable_Grid2";
import title from "../../../components/title";
import Box from "@mui/material/Box";
import "./registerProperty.css";
import Toolbar from "@mui/material/Toolbar";
import { Button, Container, MenuItem, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Logo from "../../../assets/Logo.png";
import { PropertyRegisters } from "../../../redux/Reducer/PropertyRegistration";
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
export default function PropertyRegister() {
  title("PropertyRegister");
  const dispatch = useDispatch();
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
    flatName:"",
    flatNumber:"",
    flatFloor:"",
    flatRooms:"",
    flatToilet:"",
    flatKitchen:"",
    flatRent:"",
    flatAdvance:"",
    flatMaintananceCharges:"",
    flatTrashCharges:"",
    flatSecurityCharges:"",
    flatStatus:""
  });
  const [generatedRows, setGeneratedRows] = React.useState([]);
  console.log(generatedRows,"generatedRowsgeneratedRowsgeneratedRowsgeneratedRowsgeneratedRowsgeneratedRows")
  const [error, setError] = React.useState({});
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDetail((prev) => {
  //     return { ...prev, [name]: value };
  //   });
  // };
  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isCnicValid = (cnic) => {
    // Regular expression for CNIC validation (e.g., 12345-6789012-3)
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    return cnicRegex.test(cnic);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the entered value is not a valid number for "cnic" or "contactNumber" fields
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
    if (name === "cnic" && !isCnicValid(value)) {
      setError((prev) => ({ ...prev, cnic: true }));
      return;
    }
    setError((prev) => ({ ...prev, [name]: false }));
    // Check if the entered value is a number for the "CNIC" field

    // Update the state
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
  console.log(rows, "reeeee");
  React.useEffect(() => {
    const numToShow = parseInt(detail?.totalFlat, 10) || 0;

    const newRows = Array.from({ length: numToShow }, (_, index) => ({
      id: index,
    }));

    setRows(
      Array.from({ length: numToShow }, (_, index) => ({
        id: index,
      }))
    );

    setGeneratedRows(newRows);
  }, [detail?.totalFlat]);

  const renderDataGrid = () => {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <Box sx={{ height: 400, width: "auto" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="propertyTable">
              <TableHead>
                <TableRow>
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
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generatedRows.map((e, i) => (
                  <TableRow
                    // key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Flat Name"
                        onChange={(e) =>
                          handleCellChange(i, "flatName", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Flat Number"
                        type="number"
                        onChange={(e) =>
                          handleCellChange(i, "flatNumber", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Flat Floor"
                        type="number"
                        onChange={(e) =>
                          handleCellChange(i, "flatFloor", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Flat Rooms"
                        type="number"
                        onChange={(e) =>
                          handleCellChange(i, "flatRooms", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Flat Toilet"
                        type="number"
                        onChange={(e) =>
                          handleCellChange(i, "flatToilet", e.target.value)
                        }
                      />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Flat Kitchen"
                        type="number"
                        onChange={(e) =>
                          handleCellChange(i, "flatKitchen", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Flat Rent"
                        type="number"
                        onChange={(e) =>
                          handleCellChange(i, "flatRent", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Flat Advance"
                        type="number"
                        onChange={(e) =>
                          handleCellChange(i, "flatAdvance", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Maintainance Charges"
                        type="number"
                        onChange={(e) =>
                          handleCellChange(
                            i,
                            "flatMaintananceCharges",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Trash Charges"
                        type="number"
                        onChange={(e) =>
                          handleCellChange(
                            i,
                            "flatTrashCharges",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        placeholder="Security Charges"
                        type="number"
                        onChange={(e) =>
                          handleCellChange(
                            i,
                            "flatSecurityCharges",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                    {/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
  <Select
          // value={age}
          onChange={(e) =>
            handleCellChange(
              i,
              "flatStatus",
              e.target.value
            )
          }
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
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
            </Table>
          </TableContainer>

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
  const onFinish = () => {
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
      userId: localStorage.getItem("user_id"),
      userName: localStorage.getItem("name"),
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
    const requiredFields = [
      "flatName",
      "flatNumber",
      "flatFloor",
      "flatRooms",
      "flatToilet",
      "flatKitchen",
      "flatRent",
      "flatAdvance",
      "flatMaintananceCharges",
      "flatTrashCharges",
      "flatSecurityCharges",
      "flatStatus"
    ];

    // const areAllFieldsPresent = rows.every((row) =>
    //   requiredFields.every((field) => row.hasOwnProperty(field))
    // );
    // const areAllFieldsPresent = requiredFields.filter((field) => !rows[field]);

    // if (areAllFieldsPresent.length > 0) {
    //   const errorMessage = `Please fill in the following fields: ${areAllFieldsPresent.join(', ')}.`;
    //   toast.error(errorMessage, {
    //     position: "top-center",
    //   });
    // }
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
      // rows?.flatName!==undefined||rows?.flatNumber!==undefined||rows?.flatFloor!==undefined||rows?.flatRoom!==undefined||rows?.flatToilet!==undefined||rows?.flatKitchen!==undefined||rows?.flatRent!==undefined||rows?.flatDeposit!==undefined||rows?.flatMaintainanceCharges!==undefined||rows?.flattrashCharges!==undefined||rows?.flatsecurityCharges!==undefined||rows?.flatStatus!==undefined
      if (values?.flatDetail !== "") {
        dispatch(PropertyRegisters({ values })).then((res) => {
          console.log(res, "res");
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
  };
  return (
    <>
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
      <Grid container spacing={0} className="propertyRegContainer">
        <Grid className="boxShadow" md={3} sm={12}>
          <div>
            <h1>Owner Detail</h1>
            <Container maxWidth="sm">
              <div className="property-inputs">
                <TextField
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
                  id="standard-textarea"
                  label="Father Name"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="fatherName"
                  onChange={handleChange}
                  error={error.fatherName}
                  helperText={
                    error.fatherName ? "Please enter a valid Father Name" : ""
                  }
                />

                <TextField
                  id="standard-multiline-flexible"
                  label="CNIC"
                  multiline
                  type="number"
                  data-inputmask="'mask': '99999-9999999-9'"
                  placeholder="XXXXX-XXXXXXX-X"
                  maxRows={4}
                  variant="standard"
                  name="cnic"
                  onChange={handleChange}
                  error={error.cnic}
                  helperText={error.cnic ? "Please enter a valid CNIC" : ""}
                />
                <TextField
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
                {/* <Input type="text"  data-inputmask="'mask': '99999-9999999-9'"  placeholder="XXXXX-XXXXXXX-X"  name="cnic" required="" ></Input> */}
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
                  id="standard-textarea"
                  label="Permenant Address"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="permenantAddress"
                  onChange={handleChange}
                />
                <TextField
                  id="standard-textarea"
                  label="Postal Address"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="postalAddress"
                  onChange={handleChange}
                />
                <TextField
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
                  id="standard-multiline-flexible"
                  label="Property Address"
                  multiline
                  maxRows={4}
                  variant="standard"
                  name="propertyAddress"
                  onChange={handleChange}
                />
                <TextField
                  id="standard-textarea"
                  label="Total Floor"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="totalFloor"
                  onChange={handleChange}
                  error={error.totalFloor}
                  helperText={
                    error.totalFloor ? "Please enter a valid Total Floor" : ""
                  }
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="Total Flat"
                  multiline
                  maxRows={4}
                  variant="standard"
                  name="totalFlat"
                  onChange={handleChange}
                  error={error.totalFlat}
                  helperText={
                    error.totalFlat ? "Please enter a valid Total Flat" : ""
                  }
                />

                {detail?.totalFlat === 0 || detail?.totalFlat?.length === 0
                  ? " "
                  : renderDataGrid()}
              </div>
            </Container>
          </div>
        </Grid>
      </Grid>
      <div className="registerButton">
        <Button
          variant="contained"
          sx={{
            marginTop: 1,
            background: "black",
          }}
          onClick={onFinish}
        >
          Post
        </Button>
      </div>
      <ToastContainer />
    </>
  );
}
