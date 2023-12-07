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
export default function PropertyRegister() {
  title("PropertyRegister");
  const dispatch = useDispatch();
  const [detail, setDetail] = React.useState({
    totalFlat: 0, // Set a default value for totalFlat
  });
  const [rows, setRows] = React.useState();
  const [generatedRows, setGeneratedRows] = React.useState([]);
  const [error, setError] = React.useState({
   
    // other fields...
  });
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
   if ((name === 'contactNumber'|| name === 'alternateNumber'|| name === 'totalFloor'|| name === 'totalFlat') && !/^[0-9]*$/.test(value)) {
    setError((prev) => ({ ...prev, [name]: true }));
    // If it's not a valid number, you can choose to ignore the input or show an error message.
    return;
  }
   if ((name === 'ownerName'||name==='fatherName') && !/^[A-Za-z\s]*$/.test(value)) {
    setError((prev) => ({ ...prev, [name]: true }));
    // If it's not a valid number, you can choose to ignore the input or show an error message.
    return;
  }
  if (name === 'email' && !isEmailValid(value)) {
    setError((prev) => ({ ...prev, email: true }));
    return;
  }
  if (name === 'cnic' && !isCnicValid(value)) {
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

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "flatName",
      headerName: "Flat Name",
      width: 150,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatName"
        onChange={(e) => handleCellChange(params.row.id, "flatName", e.target.value)}
        />
      ),
    },
    {
      field: "flatNumber",
      headerName: "Flat Number",
      width: 150,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatNumber"
          onChange={(e) => handleCellChange(params.row.id, "flatNumber", e.target.value)}
        />
      ),
    },
    {
      field: "flatFloor",
      headerName: "Floor",
      width: 150,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatFloor"
          onChange={(e) => handleCellChange(params.row.id, "flatFloor", e.target.value)}
        />
      ),
    },
    {
      field: "flatRoom",
      headerName: "Room",
      width: 150,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatRoom"
          onChange={(e) => handleCellChange(params.row.id, "flatRoom", e.target.value)}
        />
      ),
    },
    {
      field: "flatToilet",
      headerName: "Toilet",
      width: 150,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatToilet"
          onChange={(e) => handleCellChange(params.row.id, "flatToilet", e.target.value)}
        />
      ),
    },
    {
      field: "flatKitchen",
      headerName: "Kitchen",
      width: 150,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatKitchen"
          onChange={(e) => handleCellChange(params.row.id, "flatKitchen", e.target.value)}
        />
      ),
    },
    {
      field: "flatRent",
      headerName: "Flat Rent",
      width: 150,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatRent"
          onChange={(e) => handleCellChange(params.row.id, "flatRent", e.target.value)}
        />
      ),
    },
    {
      field: "flatDeposit",
      headerName: "Deposit",
      width: 150,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatDeposit"
          onChange={(e) => handleCellChange(params.row.id, "flatDeposit", e.target.value)}
        />
      ),
    },
    {
      field: "flatMaintainanceCharges",
      headerName: "Maintainance Charges",
      width: 200,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatMaintainanceCharges"
          onChange={(e) => handleCellChange(params.row.id, "flatMaintainanceCharges", e.target.value)}
        />
      ),
    },
    {
      field: "flattrashCharges",
      headerName: "Trash Charges",
      width: 150,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flattrashCharges"
          onChange={(e) => handleCellChange(params.row.id, "flattrashCharges", e.target.value)}
        />
      ),
    },
    {
      field: "flatsecurityCharges",
      headerName: "Security Charges",
      width: 150,
      renderCell: (params) => (
        <TextField
          id="standard-multiline-flexible"
          // label="Property Address"
          multiline
          maxRows={4}
          variant="standard"
          name="flatsecurityCharges"
          onChange={(e) => handleCellChange(params.row.id, "flatsecurityCharges", e.target.value)}
        />
      ),
    },
    {
      field: "flatStatus",
      headerName: "Flat Status",
      width: 150,
      renderCell: (params) => (
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={(e) => handleCellChange(params.row.id, "flatStatus", e.target.value)}
          autoWidth
          label="flatStatus"
        >
          <MenuItem value={0}>Vacant</MenuItem>
          <MenuItem value={1}>RentOut</MenuItem>
        </Select>
      ),
    },
  ];

React.useEffect(() => {
  const numToShow = parseInt(detail?.totalFlat, 10) || 0;

  const newRows = Array.from({ length: numToShow }, (_, index) => ({
      id: index + 1,
    }));

  setRows(Array.from({ length: numToShow }, (_, index) => ({
    id: index + 1,
  })))

  setGeneratedRows(newRows);
}, [detail?.totalFlat]);


  const renderDataGrid = () => {
    //  numToShow = parseInt(detail?.totalFlat, 10) || 0;
    //  setRows(Array.from({ length: numToShow }, (_, index) => ({
    //   id: index + 1,
    // })))
    // const generatedRows = Array.from({ length: numToShow }, (_, index) => ({
    //   id: index + 1,
    //   lastName: "Snow",
    //   firstName: "Jon",
    //   age: 35,
    // }));

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
            pageSizeOptions={[2,5, 10]}
          />
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
fatherName:detail?.fatherName,
cnic:detail?.cnic,
contactNumber:detail?.contactNumber,
alternateNumber:detail?.alternateNumber,
permenantAddress:detail?.permenantAddress,
postalAddress:detail?.postalAddress,
email:detail?.email,
propertyAddress:detail?.propertyAddress,
totalFloor:detail?.totalFloor,
totalFlat:detail?.totalFlat,
flatDetail:rows,
userId: localStorage.getItem("user_id"),
userName: localStorage.getItem("name"),
  };
  dispatch(PropertyRegisters({values}))
}
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
                  helperText={error.ownerName ? 'Please enter a valid Owner Name' : ''}
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
                  helperText={error.fatherName ? 'Please enter a valid Father Name' : ''}
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
                  helperText={error.cnic ? 'Please enter a valid CNIC' : ''}
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
                  helperText={error.contactNumber ? 'Please enter a valid Contact Number' : ''}
                />
                 {/* <input type="text"  data-inputmask="'mask': '99999-9999999-9'"  placeholder="XXXXX-XXXXXXX-X"  name="cnic" required="" ></input> */}
                <TextField
                  id="standard-textarea"
                  label="Alternate Number"
                  placeholder="Placeholder"
                  multiline
                  variant="standard"
                  name="alternateNumber"
                  onChange={handleChange}
                  error={error.alternateNumber}
                  helperText={error.alternateNumber ? 'Please enter a valid Alternate Number' : ''}
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
                  helperText={error.email ? 'Please enter a valid Email Address' : ''}
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
                  helperText={error.totalFloor ? 'Please enter a valid Total Floor' : ''}
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
                  helperText={error.totalFlat ? 'Please enter a valid Total Flat' : ''}
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
    </>
  );
}
