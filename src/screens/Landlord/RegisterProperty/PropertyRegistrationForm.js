import * as React from "react";
// import Grid from '@mui/material/Grid'; // Grid version 1
import Grid from "@mui/material/Unstable_Grid2";
import title from "../../../components/title";
// import "./newRequest.css";
import { Button, Container, MenuItem, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
      </div>
    );
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={6} md={8}>
          <div>
            <h1>Owner Detail</h1>
            <Container maxWidth="sm" className="rent-setting-container">
              <div className="rent-inputs">
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

        <Grid xs={6} md={4}>
          <div>
            <h1>Property Detail</h1>
            <Container maxWidth="sm" className="rent-setting-container">
              <div className="rent-inputs">
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
      <Button
        variant="contained"
        sx={{
          marginTop: 10,
          marginLeft:120,
          background: "black",
        }}
      >
        Post
      </Button>
    </>
  );
}
