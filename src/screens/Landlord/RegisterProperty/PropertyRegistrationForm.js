import * as React from "react";
// import Grid from '@mui/material/Grid'; // Grid version 1
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
export default function PropertyRegister() {
  title("PropertyRegister");
  const [detail, setDetail] = React.useState({
    totalFlat: 0, // Set a default value for totalFlat
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "flatName",
      headerName: "Flat Name",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatName"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
        />
      ),
    },
    {
      field: "flatNumber",
      headerName: "Flat Number",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatNumber"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
        />
      ),
    },
    {
      field: "flatFloor",
      headerName: "Floor",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatFloor"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
        />
      ),
    },
    {
      field: "room",
      headerName: "Room",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="room"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
        />
      ),
    },
    {
      field: "toilet",
      headerName: "Toilet",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="toilet"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
        />
      ),
    },
    {
      field: "kitchen",
      headerName: "Kitchen",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="kitchen"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
        />
      ),
    },
    {
      field: "flatRent",
      headerName: "Flat Rent",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatRent"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
        />
      ),
    },
    {
      field: "flatDeposit",
      headerName: "Deposit",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatDeposit"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
        />
      ),
    },
    {
      field: "flatMaintainanceCharges",
      headerName: "Maintainance Charges",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatMaintainanceCharges"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
        />
      ),
    },
    {
      field: "flattrashCharges",
      headerName: "Trash Charges",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flattrashCharges"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
        />
      ),
    },
    {
      field: "flatsecurityCharges",
      headerName: "Security Charges",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatsecurityCharges"
          // value={detail.maintenanceCharges}
          // disabled={fieldDisable===true}
          // onChange={handleChange}
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
          // value={age}
          // onChange={handleChange}
          autoWidth
          label="flatStatus"
        >
          <MenuItem value={0}>Vacant</MenuItem>
          <MenuItem value={1}>RentOut</MenuItem>
        </Select>
      ),
    },
  ];

  const renderDataGrid = () => {
    const numToShow = parseInt(detail?.totalFlat, 10) || 0;

    const generatedRows = Array.from({ length: numToShow }, (_, index) => ({
      id: index + 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
    }));

    return (
      <div style={{ height: 400, width: "100%" }}>
        <Box sx={{ height: 400, width: "auto" }}>
          <DataGrid
            rows={generatedRows}
            columns={columns}
            pageSize={5} // Set to the number of rows you want to display per page
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </div>
    );
  };

  const drawerWidth = 240;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

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
                  // value={detail.monthlyRent}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-textarea"
                  label="Father Name"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="fatherName"
                  // value={detail.advance}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
                />

                <TextField
                  id="standard-multiline-flexible"
                  label="CNIC"
                  multiline
                  maxRows={4}
                  variant="standard"
                  name="cnic"
                  // value={detail.maintenanceCharges}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-textarea"
                  label="Contact Number"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="contactNumber"
                  // value={detail.trashCharges}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-textarea"
                  label="Alternate Number"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="alternateNumber"
                  // value={detail.trashCharges}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-textarea"
                  label="Permenant Address"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="permenantAddress"
                  // value={detail.trashCharges}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-textarea"
                  label="Postal Address"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="postalAddress"
                  // value={detail.trashCharges}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-textarea"
                  label="Email"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="email"
                  // value={detail.trashCharges}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
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
                  // value={detail.maintenanceCharges}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-textarea"
                  label="Total Floor"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="totalFloor"
                  // value={detail.advance}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="Total Flat"
                  multiline
                  maxRows={4}
                  variant="standard"
                  name="totalFlat"
                  // value={detail.monthlyRent}
                  // disabled={fieldDisable===true}
                  onChange={handleChange}
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
        >
          Post
        </Button>
      </div>
    </>
  );
}
