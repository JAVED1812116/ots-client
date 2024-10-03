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
// import { DataGrid } from "@mui/x-data-grid";
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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
    // gender: "",
    gender: 0,
    // maritalStatus: "",
    maritalStatus: 0,
    adultFamilyMembers: "",
    children: "",
    childrenFamilyMembers: "",
    language: "",
    cast: "",
    selectedRows: "",
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
  const navigate = useNavigate();
  const handleCheckboxChange = (event, row) => {
    console.log(event, row);
    if (event.target.checked) {
      // Add the selected row to the array
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row]);
    } 
    else {
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
  // React.useEffect(() => {
  //   dispatch(GetProperty({ userId: sessionStorage.getItem("code") })).then(
  //     (res) => {
  //       setLandlordId(res?.payload?.data?.landlordId);
  //       setFlatDetails(res?.payload?.data?.data);
  //       // setData(res?.payload?.data?.data)

  //       // if (res?.payload?.data?.data[0]?.monthlyRent !== "") {
  //       // setFieldDisable(true)
  //       // }
  //       // let { monthlyRent, advance, maintenanceCharges, trashCharges } =res?.payload?.data?.data[0];
  //       // setDetail({
  //       //   monthlyRent,
  //       //   advance,
  //       //   maintenanceCharges,
  //       //   trashCharges,
  //       // });
  //     }
  //   );
  // }, []);
  React.useEffect(() => {
    console.log(sessionStorage.getItem("code"), 'sessionStorage.getItem("code")');
    dispatch(GetProperty({ userId: sessionStorage.getItem("code") })).then(
      (res) => {
        
        const landlordId = res?.payload?.data?.landlordId;
        const updatedFlatDetails = res?.payload?.data?.data?.map((flat) => ({
          ...flat,
          landlordId: landlordId,
        }));
        console.log(updatedFlatDetails,"updatedFlatDetails")
        if(updatedFlatDetails !==undefined){
        setFlatDetails(updatedFlatDetails);
        }else{
          setFlatDetails([])
        }

      }
    );
  }, []);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedRows?.length > 0) {
      console.log("if");

      // for (let i = 0; i < selectedRows.length; i++) {

      //   values.flatDetails = []
      //   values.flatDetails = selectedRows[i]
      //   console.log(values.flatDetails, i);
      //   dispatch(RegisterTenant({ values })).then((res) => {
      //     if (res?.payload?.data?.message === "Tenant Registered Successfully") {
      //       toast.success("Form Submitted", {
      //         position: "top-center",
      //       });
      //     } else {
      //       console.log("else");
      //     }
      //   })
      // }

      const promises = selectedRows.map((selectedRow) => {
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
          adultDetail: familyMembers,
          childrenDetail: childrenRows,
          userId: sessionStorage.getItem("user_id"),
          userName: sessionStorage.getItem("name"),
          flatDetails: [selectedRow],
          is_accept:false,
          is_reject:false
        };
        return dispatch(RegisterTenant({ values })).then((res) => {
          if (
            res?.payload?.data?.message !== "Tenant Registered Successfully"
          ) {
            throw new Error("API call failed");
          }
        });
      });
      try {
        // Wait for all API calls to complete
        await Promise.all(promises);
        toast.success("Form Submitted", { position: "top-center" });
        setTimeout(() => {
          navigate("/pending-request");
        }, 2200);
      } catch (error) {
        console.error("Error during API calls:", error);

        // Rollback in case of an error
        // await rollback(selectedRows);

        // Handle error as needed
      }
    } else {
      toast.error("Select Atleast One Flat", {
        position: "top-center",
      });
    }
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
        "maritalStatus",
      ];
      // Assuming your detail data is stored in a state variable named detail
      const emptyFields = keysToCheck
        .filter((key) => !detail[key].toString()) // Check if the value of the specified key is falsy (empty)
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
      (name === "adultFamilyMembers"||name==="childrenFamilyMembers")) {
        if(value<0){
          setError((prev) => ({ ...prev, [name]: true }));
        }
        else{
        setError((prev) => ({ ...prev, [name]: false }));
        setDetail((prev) => {
          return { ...prev, [name]: value };
        });
        }
      // If it's not a valid number, you can choose to ignore the Input or show an error message.
      return;
    }

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
    if (name === "cnicNo") {
      const numericCnic = value.replace(/\D/g, "");
      const formattedCnic =
        numericCnic.slice(0, 5) +
        (numericCnic.length > 5 ? "-" + numericCnic.slice(5, 12) : "") +
        (numericCnic.length > 12 ? "-" + numericCnic.slice(12, 13) : "");
 
      setDetail((prev) => {
        return { ...prev, [name]: formattedCnic };
      });
      // setError((prev) => ({ ...prev, cnicNo: true }));
      // return;
    }

    setError((prev) => ({ ...prev, [name]: false }));
    if (name === "cnicNo") {
    } else {
      setDetail((prev) => {
        return { ...prev, [name]: value };
      });
    }

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
              value={detail?.cnicNo}
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
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                label="Gender"
                defaultValue={0}
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
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                defaultValue={0}
                label="Martial Status"
                name="maritalStatus"
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
                error={error.adultFamilyMembers}
                helperText={error.adultFamilyMembers ? "Can Not Enter Less Then Zero" : ""}
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
                error={error.childrenFamilyMembers}
                helperText={error.childrenFamilyMembers ? "Can Not Enter Less Then Zero" : ""}
                onChange={handleChange}
              />
              {detail?.childrenFamilyMembers === 0 ||
              detail?.childrenFamilyMembers?.length === 0
                ? " "
                : renderChildrenGrid()}
            </FormControl>
            <FormControl fullWidth margin="normal">
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
                helperText={
                  error.language ? "Please enter a valid Language" : ""
                }
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
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
            </FormControl>
          </>
        );
      case 2:
        return (
          
          <>
            {flatDetails?.length>0?
            <Typography
              sx={{ color: "black", display: "flex", justifyContent: "center" }}
            >
              These Flats Are Available
            </Typography>
            :""
            }
            {flatDetails?.length>0?
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
                    {console.log(flatDetails,"flatDetailsflatDetails")}
                      {flatDetails?.map((e, i) => (
                        e.is_rent===0?
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
                        </TableRow>:e.is_rent===1?"":"sorry"
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
    : <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
    <Typography sx={{ fontSize: 40 }}>
      <span className="noData">N</span>
      <span>O</span>
      <span className="noData">T</span>
      <span> A</span>
      <span className="noData">V</span>
      <span>A</span>
      <span className="noData">I</span>
      <span>L</span>
      <span className="noData">A</span>
      <span>B</span>
      <span className="noData">L</span>
      <span>E</span>
    </Typography>
  </Box> }
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
                  disabled={activeStep===2&&flatDetails?.length===0}
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
