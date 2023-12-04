import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import { useLocation } from "react-router";
import title from "../../../components/title";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import "./uploadBill.css";
import moment from "moment";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ElectricBill } from "../../../redux/Reducer/ElectricReading";
import { SsgcBill } from "../../../redux/Reducer/SsgcReading";
import { WaterReadings } from "../../../redux/Reducer/WaterReading";
import { MaintananceReadings } from "../../../redux/Reducer/MaintananceReading";
import { TrashReadings } from "../../../redux/Reducer/TrashReading";
import { ElectricPhoto } from "../../../redux/Reducer/KElectricImg";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [billDate, setBillDate] = React.useState(dayjs());
  const [dueDate, setDueDate] = React.useState(dayjs());
  const [url, setUrl] = useState();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [inputs, setInputs] = useState({
//     kElectricEnterBill:"",
//     kElectricPreviousReading:"",
// kElectricCurrentReading:"",
// kElectricPerUnit:"",
// kElectricBillDate:"",
// kElectricDueDate:"",
// kElectricTotalUnits:"",
// kElectricTotalBill:"",
// kElectricBillImage:"",
// kElectricEnterBill:""
  });

  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInputs({ ...inputs, [name]: value });
  };

  const dispatch = useDispatch();
  const imgUpload = (e) => {
    dispatch(ElectricPhoto(e.target.files[0])).then((res) => {
      setUrl(res?.payload?.data?.url);
    });
  };

  const handleBillKELECReading = (e) => {
    if (selectedValue === "byUnitReading") {
      let values = {
        kElectricPreviousReading: inputs?.kElectricPreviousReading,
        kElectricCurrentReading: inputs?.kElectricCurrentReading,
        kElectricPerUnit: inputs?.kElectricPerUnit,
        kElectricBillDate: moment(billDate).format("DD-MM-YYYY"),
        kElectricDueDate: dueDate.format("DD-MM-YYYY"),
        kElectricTotalUnits:
          inputs?.kElectricCurrentReading - inputs?.kElectricPreviousReading,
        kElectricTotalBill:
          parseInt(
            inputs?.kElectricCurrentReading - inputs?.kElectricPreviousReading
          ) * parseInt(inputs?.kElectricPerUnit) || 0,
        //extra fields
        kElectricBillImage: "",
        kElectricEnterBill: "",
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      if(values.kElectricPreviousReading&&values.kElectricCurrentReading&&values.kElectricPerUnit!==''){
      dispatch(ElectricBill({ values })).then((res) => {
        if (res?.payload?.data?.message === "Reading Saved Successfully") {
          toast.success("Bill Uploaded Successfully!", {
            autoClose: 300,
          });

         //////saeed isay dekh lena
          // setInputs({
          //   kElectricPreviousReading: "",
          //   kElectricCurrentReading: "",
          //   kElectricPerUnit: "",
          //   // ... (other fields)
          // });
         
          // setInputs()
        } else {
          toast.error("Something Wrong", {
            position: "top-center",
          });
        }
      })
    }
    else
    {
        toast.error("Fill All Fields", {
          position: "top-center",
        });
      }
    } else if (selectedValue === "byBill") {
      let values = {
        kElectricEnterBill: inputs.kElectricEnterBill,
        kElectricBillDate: moment(billDate).format("DD-MM-YYYY"),
        kElectricDueDate: dueDate.format("DD-MM-YYYY"),
        kElectricTotalBill: inputs.kElectricEnterBill,
        //extra fields
        kElectricBillImage: "",
        kElectricPreviousReading: "",
        kElectricCurrentReading: "",
        kElectricPerUnit: "",
        kElectricTotalUnits: "",
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      
      if(values?.kElectricEnterBill!==""&&values?.kElectricEnterBill!==undefined){
      dispatch(ElectricBill({ values })).then((res)=>{
        if (res?.payload?.data?.message === "Reading Saved Successfully") {
          toast.success("Bill Uploaded Successfully!", {
            autoClose: 300,
          });

         //////saeed isay dekh lena
          // setInputs({
          //   kElectricPreviousReading: "",
          //   kElectricCurrentReading: "",
          //   kElectricPerUnit: "",
          //   // ... (other fields)
          // });
         
          // setInputs()
        } else {
          toast.error("Something Wrong", {
            position: "top-center",
          });
        }
      })
      }else
        {
            toast.error("Fill All Fields", {
              position: "top-center",
            });
          }
      
    } else if (selectedValue === "byPicture") {
      let values = {
        kElectricEnterBill: "",
        kElectricBillDate: "",
        kElectricDueDate: "",
        kElectricTotalBill: "",
        //extra fields
        kElectricBillImage: url,
        kElectricPreviousReading: "",
        kElectricCurrentReading: "",
        kElectricPerUnit: "",
        kElectricTotalUnits: "",
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      
      if(values?.kElectricBillImage!==""&&values?.kElectricBillImage!==undefined){
        dispatch(ElectricBill({ values })).then((res)=>{
          console.log(res?.payload?.data?.message,"res?.payload?.data?.message")
          if (res?.payload?.data?.message === "Reading Saved Successfully") {
            toast.success("Bill Uploaded Successfully!", {
              autoClose: 300,
            });
  setUrl()
           //////saeed isay dekh lena
            // setInputs({
            //   kElectricPreviousReading: "",
            //   kElectricCurrentReading: "",
            //   kElectricPerUnit: "",
            //   // ... (other fields)
            // });
           
            // setInputs()
          } else {
            toast.error("Something Wrong", {
              position: "top-center",
            });
          }
        })
        }else
          {
              toast.error("Upload Image", {
                position: "top-center",
              });
            }
    }
  };
  const handleBillSSGCReading = (e) => {
    if (selectedValue === "byGasUnitReading") {
      let values = {
        currentReadingSsg: inputs.currentReadingSsg,
        previousReadingSsg: inputs.previousReadingSsg,
        perUnitSsgCharges: inputs.perUnitSsgCharges,
        ssgcBillDate: moment(billDate).format("DD-MM-YYYY"),
        ssgcDueDate: dueDate.format("DD-MM-YYYY"),
        ssgcTotalUnits: inputs.currentReadingSsg - inputs.previousReadingSsg,
        ssgcTotalBill:
          parseInt(inputs.currentReadingSsg - inputs.previousReadingSsg) *
            parseInt(inputs.perUnitSsgCharges) || 0,
        //extra fields
        ssgcBillImage: "",
        ssgcEnterBill: "",
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      dispatch(SsgcBill({ values }));
    } else if (selectedValue === "byGassBill") {
      let values = {
        ssgcEnterBill: inputs.ssgcEnterBill,
        ssgcBillDate: moment(billDate).format("DD-MM-YYYY"),
        ssgcDueDate: dueDate.format("DD-MM-YYYY"),
        ssgcTotalBill: inputs.ssgcEnterBill,
        //extra fields
        ssgcBillImage: "",
        prevReadingSsgc: "",
        currentReadingSsg: "",
        perUnitSsgCharges: "",
        ssgcTotalUnits: "",
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      dispatch(SsgcBill({ values }));
    } else if (selectedValue === "byGassPicture") {
      let values = {
        ssgcEnterBill: "",
        ssgcBillDate: "",
        ssgcDueDate: "",
        ssgcTotalBill: "",
        //extra fields
        ssgcBillImage: url,
        prevReadingSsgc: "",
        currentReadingSsg: "",
        perUnitSsgCharges: "",
        ssgcTotalUnits: "",
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      dispatch(SsgcBill({ values }));
    }
  };
  const handleBillWaterReading = (e) => {
    if (selectedValue === "byWaterBill") {
      let values = {
        waterEnterBill: inputs.waterEnterBill,
        waterBillDate: moment(billDate).format("DD-MM-YYYY"),
        waterDueDate: dueDate.format("DD-MM-YYYY"),
        waterTotalBill: inputs.waterEnterBill,
        //extra fields
        waterBillImage: "",
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      dispatch(WaterReadings({ values }));
    } else if (selectedValue === "byWaterPicture") {
      let values = {
        waterEnterBill: "",
        waterBillDate: "",
        waterDueDate: "",
        waterTotalBill: "",
        //extra fields
        waterBillImage: url,
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      dispatch(WaterReadings({ values }));
    }
  };
  const handleMaintainanceReading = (e) => {
    if (selectedValue === "byMaintainanceBill") {
      let values = {
        maintananceEnterBill: inputs.maintananceEnterBill,
        maintananceBillDate: moment(billDate).format("DD-MM-YYYY"),
        maintananceDueDate: dueDate.format("DD-MM-YYYY"),
        maintananceTotalBill: inputs.maintananceEnterBill,
        //extra fields
        maintananceBillImage: "",
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      dispatch(MaintananceReadings({ values }));
    } else if (selectedValue === "byMaintainancePicture") {
      let values = {
        maintananceEnterBill: "",
        maintananceBillDate: "",
        maintananceDueDate: "",
        maintananceTotalBill: "",
        //extra fields
        maintananceBillImage: url,
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      dispatch(MaintananceReadings({ values }));
    }
  };
  const handleTrashReading = (e) => {
    if (selectedValue === "byTrashBill") {
      let values = {
        trashEnterBill: inputs.trashEnterBill,
        trashBillDate: moment(billDate).format("DD-MM-YYYY"),
        trashDueDate: dueDate.format("DD-MM-YYYY"),
        trashTotalBill: inputs.trashEnterBill,
        //extra fields
        trashBillImage: "",
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      dispatch(TrashReadings({ values }));
    } else if (selectedValue === "byTrashPicture") {
      let values = {
        trashEnterBill: "",
        trashBillDate: "",
        trashDueDate: "",
        trashTotalBill: "",
        //extra fields
        trashBillImage: url,
        userId: localStorage.getItem("user_id"),
        userName: localStorage.getItem("name"),
      };
      dispatch(TrashReadings({ values }));
    }
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" colSpan={6}>
          {row.name}
        </TableCell>
        {/* <TableCell align="right">{row.calories}</TableCell>*/}
      </TableRow>
      {row?.type === "kelectric" ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <div>
                  <FormControl component="fieldset">
                    <Typography variant="h6">Select Bill Type</Typography>
                    <RadioGroup
                      aria-label="options"
                      name="options"
                      style={{ flexDirection: "row" }}
                      // value={selectedValue}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="byUnitReading"
                        control={<Radio />}
                        label="Enter Unit Reading"
                      />
                      <FormControlLabel
                        value="byBill"
                        control={<Radio />}
                        label="Enter Bill"
                      />
                      <FormControlLabel
                        value="byPicture"
                        control={<Radio />}
                        label="Insert Picture"
                      />
                    </RadioGroup>
                  </FormControl>

                  {/* Conditional rendering based on the selected radio button */}
                  {selectedValue === "byUnitReading" && (
                    <div>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Previous Reading</TableCell>
                            <TableCell>Current Reading</TableCell>
                            <TableCell>Per Unit</TableCell>
                            <TableCell>Bill Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell align="right">Total Unit</TableCell>
                            <TableCell>Total Bill</TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* {row.history.map((historyRow) => ( */}
                          <TableRow>
                            <TableCell component="th" scope="row">
                              <TextField
                                id="outlined-number"
                                label="Previous Reading"
                                type="number"
                                size="small"
                                name="kElectricPreviousReading"
                                // onChange={(e) => {
                                //   setprevReadingKelectric(e.target.value);
                                // }}
                                onChange={handleInputs}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="outlined-number"
                                label="Current Reading"
                                type="number"
                                size="small"
                                name="kElectricCurrentReading"
                                // onChange={(e) => {
                                //   setCurrentReadingKelectric(e.target.value);
                                // }}
                                onChange={handleInputs}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id="outlined-number"
                                label="Per Unit"
                                type="number"
                                size="small"
                                // onChange={(e) => {
                                //   setPerUnitCharges(e.target.value);
                                // }}
                                name="kElectricPerUnit"
                                onChange={handleInputs}
                              />
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  disabled={true}
                                  value={billDate}
                                  onChange={(newValue) => setBillDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  value={dueDate}
                                  onChange={(newValue) => setDueDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell align="right">
                              {inputs?.kElectricCurrentReading -
                                inputs?.kElectricPreviousReading}
                            </TableCell>
                            {/* <TableCell>{historyRow.enterBill}</TableCell> */}
                            <TableCell>
                              {parseInt(
                                inputs?.kElectricCurrentReading -
                                  inputs?.kElectricPreviousReading
                              ) * parseInt(inputs?.kElectricPerUnit) || 0}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 2,
                          marginRight: 1,
                          background: "black",
                        }}
                        onClick={handleBillKELECReading}
                      >
                        Post
                      </Button>
                    </div>
                  )}
                  {selectedValue === "byBill" && (
                    <div>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Enter Bill</TableCell>
                            <TableCell>Bill Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Total Bill</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {/* <input
                                placeholder="Enter Bill"
                                onChange={(e) => {
                                  setKElectricBillEntry(e.target.value);
                                }}
                              /> */}
                              <TextField
                                id="outlined-number"
                                label="Enter Bill"
                                type="number"
                                size="small"
                                // onChange={(e) => {
                                //   setKElectricBillEntry(e.target.value);
                                // }}
                                name="kElectricEnterBill"
                                onChange={handleInputs}
                              />
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  disabled={true}
                                  value={billDate}
                                  onChange={(newValue) => setBillDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  value={dueDate}
                                  onChange={(newValue) => setDueDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              {inputs.kElectricEnterBill || 0}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 2,
                          marginRight: 1,
                          background: "black",
                        }}
                        onClick={handleBillKELECReading}
                      >
                        Post
                      </Button>
                    </div>
                  )}
                  {selectedValue === "byPicture" && (
                    <div>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Button variant="contained" component="label">
                          Upload
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => imgUpload(e)}
                          />
                        </Button>
                        {url?.length>0?
                        <Button
                          variant="contained"
                          sx={{
                            marginTop: 2,
                            marginRight: 1,
                            background: "black",
                          }}
                          onClick={handleBillKELECReading}
                        >
                          Post
                        </Button>:""
}
                      </Stack>
                    </div>
                  )}
                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : row?.type === "ssgc" ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <div>
                  <FormControl component="fieldset">
                    <Typography variant="h6">Select Bill Type</Typography>
                    <RadioGroup
                      aria-label="options"
                      name="options"
                      style={{ flexDirection: "row" }}
                      // value={selectedValue}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="byGasUnitReading"
                        control={<Radio />}
                        label="Enter Unit Reading"
                      />
                      <FormControlLabel
                        value="byGassBill"
                        control={<Radio />}
                        label="Enter Bill"
                      />
                      <FormControlLabel
                        value="byGassPicture"
                        control={<Radio />}
                        label="Insert Picture"
                      />
                    </RadioGroup>
                  </FormControl>

                  {/* Conditional rendering based on the selected radio button */}
                  {selectedValue === "byGasUnitReading" && (
                    <div>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Previous Reading</TableCell>
                            <TableCell>Current Reading</TableCell>
                            <TableCell>Per Unit</TableCell>
                            <TableCell>Bill Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell align="right">Total Unit</TableCell>
                            <TableCell>Total Bill</TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.history.map((historyRow) => (
                            <TableRow key={historyRow.previousReadingSsg}>
                              <TableCell component="th" scope="row">
                                <TextField
                                  id="outlined-number"
                                  label="Previous Reading"
                                  type="number"
                                  size="small"
                                  name="previousReadingSsg"
                                  onChange={handleInputs}
                                />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <TextField
                                  id="outlined-number"
                                  label="Current Reading"
                                  type="number"
                                  size="small"
                                  name="currentReadingSsg"
                                  onChange={handleInputs}
                                />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <TextField
                                  id="outlined-number"
                                  label="Per Unit"
                                  type="number"
                                  size="small"
                                  name="perUnitSsgCharges"
                                  onChange={handleInputs}
                                />
                              </TableCell>
                              <TableCell>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    className="fulldate"
                                    disabled={true}
                                    value={billDate}
                                    onChange={(newValue) =>
                                      setBillDate(newValue)
                                    }
                                  />
                                </LocalizationProvider>
                              </TableCell>
                              <TableCell>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    className="fulldate"
                                    value={dueDate}
                                    onChange={(newValue) =>
                                      setDueDate(newValue)
                                    }
                                  />
                                </LocalizationProvider>
                              </TableCell>
                              <TableCell align="right">
                                {historyRow.totalSsgUnit || 0}
                              </TableCell>
                              {/* <TableCell>{historyRow.enterBill}</TableCell> */}
                              <TableCell>
                                {historyRow.showSsgcUnit || 0}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 2,
                          marginRight: 1,
                          background: "black",
                        }}
                        onClick={handleBillSSGCReading}
                      >
                        Post
                      </Button>
                    </div>
                  )}
                  {selectedValue === "byGassBill" && (
                    <div>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Enter Bill</TableCell>
                            <TableCell>Bill Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Total Bill</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <TextField
                                id="outlined-number"
                                label="Enter Bill"
                                type="number"
                                size="small"
                                name="ssgcEnterBill"
                                onChange={handleInputs}
                              />
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  disabled={true}
                                  value={billDate}
                                  onChange={(newValue) => setBillDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  value={billDate}
                                  onChange={(newValue) => setBillDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>{inputs.ssgcEnterBill || 0}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 2,
                          marginRight: 1,
                          background: "black",
                        }}
                        onClick={handleBillSSGCReading}
                      >
                        Post
                      </Button>
                    </div>
                  )}
                  {selectedValue === "byGassPicture" && (
                    <div>
                      {" "}
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Button variant="contained" component="label">
                          Upload
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => imgUpload(e)}
                          />
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            marginTop: 2,
                            marginRight: 1,
                            background: "black",
                          }}
                          onClick={handleBillSSGCReading}
                        >
                          Post
                        </Button>
                      </Stack>
                    </div>
                  )}
                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : row?.type === "water" ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <div>
                  <FormControl component="fieldset">
                    <Typography variant="h6">Select Bill Type</Typography>
                    <RadioGroup
                      aria-label="options"
                      name="options"
                      style={{ flexDirection: "row" }}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="byWaterBill"
                        control={<Radio />}
                        label="Enter Bill"
                      />
                      <FormControlLabel
                        value="byWaterPicture"
                        control={<Radio />}
                        label="Insert Picture"
                      />
                    </RadioGroup>
                  </FormControl>

                  {/* Conditional rendering based on the selected radio button */}
                  {selectedValue === "byWaterBill" && (
                    <div>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Enter Bill</TableCell>
                            <TableCell>Bill Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Total Bill</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <TextField
                                id="outlined-number"
                                label="Enter Bill"
                                type="number"
                                size="small"
                                name="waterEnterBill"
                                onChange={handleInputs}
                              />
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  disabled={true}
                                  value={billDate}
                                  onChange={(newValue) => setBillDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  value={billDate}
                                  onChange={(newValue) => setDueDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>{inputs.waterEnterBill || 0}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 2,
                          marginRight: 1,
                          background: "black",
                        }}
                        onClick={handleBillWaterReading}
                      >
                        Post
                      </Button>
                    </div>
                  )}
                  {selectedValue === "byWaterPicture" && (
                    <div>
                      {" "}
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Button variant="contained" component="label">
                          Upload
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => imgUpload(e)}
                          />
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            marginTop: 2,
                            marginRight: 1,
                            background: "black",
                          }}
                          onClick={handleBillWaterReading}
                        >
                          Post
                        </Button>
                      </Stack>
                    </div>
                  )}
                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : row?.type === "maintainance" ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <div>
                  <FormControl component="fieldset">
                    <Typography variant="h6">Select Bill Type</Typography>
                    <RadioGroup
                      aria-label="options"
                      name="options"
                      style={{ flexDirection: "row" }}
                      // value={selectedValue}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="byMaintainanceBill"
                        control={<Radio />}
                        label="Enter Bill"
                      />
                      <FormControlLabel
                        value="byMaintainancePicture"
                        control={<Radio />}
                        label="Insert Picture"
                      />
                    </RadioGroup>
                  </FormControl>

                  {/* Conditional rendering based on the selected radio button */}
                  {selectedValue === "byMaintainanceBill" && (
                    <div>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Enter Bill</TableCell>
                            <TableCell>Bill Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Total Bill</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <TextField
                                id="outlined-number"
                                label="Enter Bill"
                                type="number"
                                size="small"
                                name="maintananceEnterBill"
                                onChange={handleInputs}
                              />
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  disabled={true}
                                  value={billDate} // Set the value to the current date
                                  onChange={(newValue) => setBillDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  value={billDate}
                                  onChange={(newValue) => setBillDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              {inputs.maintananceEnterBill || 0}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 2,
                          marginRight: 1,
                          background: "black",
                        }}
                        onClick={handleMaintainanceReading}
                      >
                        Post
                      </Button>
                    </div>
                  )}
                  {selectedValue === "byMaintainancePicture" && (
                    <div>
                      {" "}
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Button variant="contained" component="label">
                          Upload
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => imgUpload(e)}
                          />
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            marginTop: 2,
                            marginRight: 1,
                            background: "black",
                          }}
                          onClick={handleMaintainanceReading}
                        >
                          Post
                        </Button>
                      </Stack>
                    </div>
                  )}
                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : row?.type === "trash" ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {/* <Typography variant="h6" gutterBottom component="div">
                    History
                  </Typography> */}
                <div>
                  <FormControl component="fieldset">
                    <Typography variant="h6">Select Bill Type</Typography>
                    <RadioGroup
                      aria-label="options"
                      name="options"
                      style={{ flexDirection: "row" }}
                      // value={selectedValue}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="byTrashBill"
                        control={<Radio />}
                        label="Enter Bill"
                      />
                      <FormControlLabel
                        value="byTrashPicture"
                        control={<Radio />}
                        label="Insert Picture"
                      />
                    </RadioGroup>
                  </FormControl>

                  {/* Conditional rendering based on the selected radio button */}
                  {selectedValue === "byTrashBill" && (
                    <div>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Enter Bill</TableCell>
                            <TableCell>Bill Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Total Bill</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <TextField
                                id="outlined-number"
                                label="Enter Bill"
                                type="number"
                                size="small"
                                // onChange={(e) => {
                                //   setKElectricBillEntry(e.target.value);
                                // }}
                                name="trashEnterBill"
                                onChange={handleInputs}
                              />
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  disabled={true}
                                  value={billDate}
                                  onChange={(newValue) => setBillDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="fulldate"
                                  value={billDate}
                                  onChange={(newValue) => setBillDate(newValue)}
                                />
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>{inputs.trashEnterBill || 0}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 2,
                          marginRight: 1,
                          background: "black",
                        }}
                        onClick={handleTrashReading}
                      >
                        Post
                      </Button>
                    </div>
                  )}
                  {selectedValue === "byTrashPicture" && (
                    <div>
                      {" "}
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Button variant="contained" component="label">
                          Upload
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => imgUpload(e)}
                          />
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            marginTop: 2,
                            marginRight: 1,
                            background: "black",
                          }}
                          onClick={handleTrashReading}
                        >
                          Post
                        </Button>
                      </Stack>
                    </div>
                  )}
                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
export default function UploadBill() {
  title("Upload Bill");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  ///////////////KELECTRIC//////////////////
  const [prevReadingKelectric, setprevReadingKelectric] = useState();
  const [currentReadingKelectric, setCurrentReadingKelectric] = useState();
  const [perUnitCharges, setPerUnitCharges] = useState();
  ////////////////SSGC////////////////////////
  const [prevReadingSsgc, setprevReadingSsgc] = useState();
  const [currentReadingSsgc, setCurrentReadingSsgc] = useState();
  const [perUnitSsgCharge, setPerUnitSsgCharges] = useState();
  ///////////////TRASH CHARGES///////////////
  const [trashCharge, setTrashCharge] = useState();
  ///////////////WATER CHARGES/////////////////
  const [waterCharge, setWaterCharge] = useState();
  //////////////MAINTAINANCECHARGES////////////
  const [maintainanceCharge, setMaintainanceCharge] = useState();

  const [inputs, setInputs] = useState({
    kElectricPreviousReading: "",
    kElectricCurrentReading: "",
    kElectricPerUnit: "",
  });

  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInputs({ ...inputs, [name]: value });
  };

  function kElectric(name, type, index) {
    return {
      name,
      type,
      history: [
        {
          previousReading: (
            <TextField
              id="outlined-number"
              label="Previous Reading"
              type="number"
              size="small"
              name="kElectricPreviousReading"
              onChange={handleInputs}
            />
          ),
          currentReading: (
            <TextField
              id="outlined-number"
              label="Current Reading"
              type="number"
              size="small"
              name="kElectricCurrentReading"
              onChange={handleInputs}
            />
          ),
          perUnitCharge: (
            <TextField
              id="outlined-number"
              label="Per Unit"
              type="number"
              size="small"
              name="kElectricPerUnit"
              onChange={handleInputs}
            />
          ),
          totalUnit:
            inputs.kElectricCurrentReading - inputs.kElectricPreviousReading,
          showElectricUnit:
            parseInt(
              inputs.kElectricCurrentReading - inputs.kElectricPreviousReading
            ) * parseInt(inputs.kElectricPerUnit),
        },
      ],
    };
  }
  function ssgc(name, type) {
    return {
      name,
      type,
      history: [
        {
          previousReadingSsg: (
            <input
              placeholder="Previous Reading"
              onChange={(e) => {
                setprevReadingSsgc(e.target.value);
              }}
            ></input>
          ),
          currentReadingSsg: (
            <input
              placeholder="current Reading"
              onChange={(e) => {
                setCurrentReadingSsgc(e.target.value);
              }}
            ></input>
          ),
          perUnitSsgCharges: (
            <input
              placeholder="Per Unit"
              onChange={(e) => {
                setPerUnitSsgCharges(e.target.value);
              }}
            ></input>
          ),
          totalSsgUnit: currentReadingSsgc - prevReadingSsgc,
          showSsgcUnit:
            parseInt(currentReadingSsgc - prevReadingSsgc) *
            parseInt(perUnitSsgCharge),
        },
      ],
    };
  }
  function trashCharges(name, type) {
    return {
      name,
      type,
      history: [
        {
          trashCharges: (
            <input
              placeholder="Trash Charges"
              onChange={(e) => {
                setTrashCharge(e.target.value);
              }}
            ></input>
          ),
        },
      ],
    };
  }
  function waterCharges(name, type) {
    return {
      name,
      type,
      history: [
        {
          waterCharges: (
            <input
              placeholder="water Charges"
              onChange={(e) => {
                setWaterCharge(e.target.value);
              }}
            ></input>
          ),
        },
      ],
    };
  }
  function maintainanceCharges(name, type) {
    return {
      name,
      type,
      history: [
        {
          maintainanceCharges: (
            <input
              placeholder="Maintainance Charges"
              onChange={(e) => {
                setMaintainanceCharge(e.target.value);
              }}
            ></input>
          ),
        },
      ],
    };
  }
  const rows = [
    kElectric("K-ELECTRIC", "kelectric"),
    ssgc("SSGC", "ssgc"),
    waterCharges("WATER", "water"),
    maintainanceCharges("MAINTAINANCE", "maintainance"),
    trashCharges("TRASH CHARGES", "trash"),
  ];
  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <TableContainer
          component={Paper}
          // sx={{ marginTop: 4 }}
        >
          <Table aria-label="collapsible table">
            <TableHead sx={{ background: "black" }}>
              <TableRow>
                <TableCell />
                <TableCell sx={{ color: "white" }} align="center">
                  Bill Type
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} inputs={inputs} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ToastContainer />
      </div>
    </>
  );
}
