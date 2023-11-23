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
import "./uploadBill.css"
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
import { useDispatch } from "react-redux";
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [kElectricBillEntry, setKElectricBillEntry] = useState();
  const [ssgcBillEntry, setSsgcBillEntry] = useState();
  const [waterBill, setWaterBill] = useState();
  const [maintainanceBill, setMaintainanceBill] = useState();
  const [trashBill, setTrashBill] = useState();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const dispatch = useDispatch();
  const handleBillReading = (e) => {
    console.log('', "test");
    // dispatch(ElectricBill({}));
    // if(detail.monthlyRent&&detail.advance&&detail.maintainanceChearges&&detail.trashCharges!=null||""){
    //   dispatch(RentSet({detail})).then((res)=>{
    //    if(res?.payload?.data?.message==="Rent Set Successfully"){
    //     toast.success(res?.payload?.data?.message, {
    //       autoClose: 300,
    //     });

    //   }else{
    //     toast.error(res?.payload?.data?.message,{
    //       autoClose:300,
    //     })

    //    }
    //     });
    // }else{
    //   toast.error("Empty Field are not allowed", {
    //     autoClose: 300,
    //   });
    // }
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
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        {/* <TableCell align="right">{row.calories}</TableCell>*/}
      </TableRow>
      {row?.type === "kelectric" ? (
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
                          {row.history.map((historyRow) => (
                            <TableRow key={historyRow.previousReading}>
                              <TableCell component="th" scope="row">
                                {historyRow.previousReading}
                              </TableCell>
                              <TableCell>{historyRow.currentReading}</TableCell>
                              <TableCell>{historyRow.perUnitCharge}</TableCell>
                              <TableCell>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker className="fulldate"/>
                                </LocalizationProvider>
                              </TableCell>
                              <TableCell>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker className="fulldate"/>
                                </LocalizationProvider>
                              </TableCell>
                              <TableCell align="right">
                                {historyRow.totalUnit || 0}
                              </TableCell>
                              {/* <TableCell>{historyRow.enterBill}</TableCell> */}
                              <TableCell>
                                {historyRow.showElectricUnit || 0}
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
                        onClick={handleBillReading}
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
                                onChange={(e) => {
                                  setKElectricBillEntry(e.target.value);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker  className="fulldate"/>
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker  className="fulldate"/>
                              </LocalizationProvider>
                            </TableCell>
                            <TableCell>{kElectricBillEntry || 0}</TableCell>
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
                          <input hidden accept="image/*" multiple type="file" />
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
        //   : row?.type === "ssgc" ? (
        //     <TableRow>
        //       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        //         <Collapse in={open} timeout="auto" unmountOnExit>
        //           <Box sx={{ margin: 1 }}>
        //             {/* <Typography variant="h6" gutterBottom component="div">
        //           History
        //         </Typography> */}
        //             <div>
        //               <FormControl component="fieldset">
        //                 <Typography variant="h6">Select Bill Type</Typography>
        //                 <RadioGroup
        //                   aria-label="options"
        //                   name="options"
        //                   style={{ flexDirection: "row" }}
        //                   // value={selectedValue}
        //                   onChange={handleChange}
        //                 >
        //                   <FormControlLabel
        //                     value="byGasUnitReading"
        //                     control={<Radio />}
        //                     label="Enter Unit Reading"
        //                   />
        //                   <FormControlLabel
        //                     value="byGasBill"
        //                     control={<Radio />}
        //                     label="Enter Bill"
        //                   />
        //                   <FormControlLabel
        //                     value="byGasPicture"
        //                     control={<Radio />}
        //                     label="Insert Picture"
        //                   />
        //                 </RadioGroup>
        //               </FormControl>

        //               {/* Conditional rendering based on the selected radio button */}
        //               {selectedValue === "byGasUnitReading" && (
        //                 <div>
        //                   <Table size="small" aria-label="purchases">
        //                     <TableHead>
        //                       <TableRow>
        //                         <TableCell>Previous Reading</TableCell>
        //                         <TableCell>Current Reading</TableCell>
        //                         <TableCell>Per Unit</TableCell>
        //                         <TableCell>Bill Date</TableCell>
        //                         <TableCell>Due Date</TableCell>
        //                         <TableCell align="right">Total Unit</TableCell>
        //                         <TableCell>Total Bill</TableCell>
        //                         <TableCell align="right"></TableCell>
        //                       </TableRow>
        //                     </TableHead>
        //                     <TableBody>
        //                       {row.history.map((historyRow) => (
        //                         <TableRow key={historyRow.previousReadingSsg}>
        //                           <TableCell component="th" scope="row">
        //                             {historyRow.previousReadingSsg}
        //                           </TableCell>
        //                           <TableCell>
        //                             {historyRow.currentReadingSsg}
        //                           </TableCell>
        //                           <TableCell>
        //                             {historyRow.perUnitSsgCharges}
        //                           </TableCell>
        //                           <TableCell>
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                           <DatePicker />
        //                         </LocalizationProvider>
        //                         </TableCell>
        //                         <TableCell>
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                           <DatePicker />
        //                         </LocalizationProvider>
        //                         </TableCell>
        //                           <TableCell align="right">
        //                             {historyRow.totalSsgUnit || 0}
        //                           </TableCell>
        //                           {/* <TableCell>{historyRow.enterBill}</TableCell> */}
        //                           <TableCell>
        //                             {historyRow.showSsgcUnit || 0}
        //                           </TableCell>
        //                         </TableRow>
        //                       ))}
        //                     </TableBody>
        //                   </Table>
        //                   <Button
        //                     variant="contained"
        //                     sx={{
        //                       marginTop: 2,
        //                       marginRight: 1,
        //                       background: "black",
        //                     }}
        //                   >
        //                     Post
        //                   </Button>
        //                 </div>
        //               )}
        //               {selectedValue === "byGasBill" && (
        //                 <div>
        //                   <Table size="small" aria-label="purchases">
        //                     <TableHead>
        //                       <TableRow>
        //                         <TableCell>Enter Bill</TableCell>
        //                         <TableCell>Bill Date</TableCell>
        //                         <TableCell>Due Date</TableCell>
        //                         <TableCell>Total Bill</TableCell>
        //                       </TableRow>
        //                     </TableHead>
        //                     <TableBody>
        //                       <TableRow>
        //                         <TableCell>
        //                           <input
        //                             placeholder="Enter Bill"
        //                             onChange={(e) => {
        //                               setSsgcBillEntry(e.target.value);
        //                             }}
        //                           />
        //                         </TableCell>
        //                         <TableCell>
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                           <DatePicker />
        //                         </LocalizationProvider>
        //                         </TableCell>
        //                         <TableCell>
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                           <DatePicker />
        //                         </LocalizationProvider>
        //                         </TableCell>
        //                         <TableCell>{ssgcBillEntry||0}</TableCell>
        //                       </TableRow>
        //                     </TableBody>
        //                   </Table>
        //                   <Button
        //                     variant="contained"
        //                     sx={{
        //                       marginTop: 2,
        //                       marginRight: 1,
        //                       background: "black",
        //                     }}
        //                   >
        //                     Post
        //                   </Button>
        //                 </div>
        //               )}
        //               {selectedValue === "byGasPicture" && <div> <Stack direction="row" alignItems="center" spacing={2}>
        //   <Button variant="contained" component="label">
        //     Upload
        //     <input hidden accept="image/*" multiple type="file" />
        //   </Button>
        // </Stack></div>}
        //             </div>
        //           </Box>
        //         </Collapse>
        //       </TableCell>
        //     </TableRow>
        //   ) : row?.type === "water" ? (
        //     <TableRow>
        //       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        //         <Collapse in={open} timeout="auto" unmountOnExit>
        //           <Box sx={{ margin: 1 }}>
        //             {/* <Typography variant="h6" gutterBottom component="div">
        //           History
        //         </Typography> */}
        //             <div>
        //               <FormControl component="fieldset">
        //                 <Typography variant="h6">Select Bill Type</Typography>
        //                 <RadioGroup
        //                   aria-label="options"
        //                   name="options"
        //                   style={{ flexDirection: "row" }}
        //                   // value={selectedValue}
        //                   onChange={handleChange}
        //                 >
        //                   <FormControlLabel
        //                     value="byWaterBill"
        //                     control={<Radio />}
        //                     label="Enter Bill"
        //                   />
        //                   <FormControlLabel
        //                     value="byWaterPicture"
        //                     control={<Radio />}
        //                     label="Insert Picture"
        //                   />
        //                 </RadioGroup>
        //               </FormControl>

        //               {/* Conditional rendering based on the selected radio button */}
        //               {selectedValue === "byWaterBill" && (
        //                 <div>
        //                   <Table size="small" aria-label="purchases">
        //                     <TableHead>
        //                       <TableRow>
        //                         <TableCell>Enter Bill</TableCell>
        //                         <TableCell>Bill Date</TableCell>
        //                         <TableCell>Due Date</TableCell>
        //                         <TableCell>Total Bill</TableCell>
        //                       </TableRow>
        //                     </TableHead>
        //                     <TableBody>
        //                       <TableRow>
        //                         <TableCell>
        //                           <input
        //                             placeholder="Enter Bill"
        //                             onChange={(e) => {
        //                               setWaterBill(e.target.value);
        //                             }}
        //                           />
        //                         </TableCell>
        //                         <TableCell>
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                           <DatePicker />
        //                         </LocalizationProvider>
        //                         </TableCell>
        //                         <TableCell>
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                           <DatePicker />
        //                         </LocalizationProvider>
        //                         </TableCell>
        //                         <TableCell>{waterBill||0}</TableCell>
        //                       </TableRow>
        //                     </TableBody>
        //                   </Table>
        //                   <Button
        //                     variant="contained"
        //                     sx={{
        //                       marginTop: 2,
        //                       marginRight: 1,
        //                       background: "black",
        //                     }}
        //                   >
        //                     Post
        //                   </Button>
        //                 </div>
        //               )}
        //               {selectedValue === "byWaterPicture" && <div> <Stack direction="row" alignItems="center" spacing={2}>
        //   <Button variant="contained" component="label">
        //     Upload
        //     <input hidden accept="image/*" multiple type="file" />
        //   </Button>
        // </Stack></div>}
        //             </div>
        //           </Box>
        //         </Collapse>
        //       </TableCell>
        //     </TableRow>
        //   ) : row?.type === "maintainance" ? (
        //     <TableRow>
        //       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        //         <Collapse in={open} timeout="auto" unmountOnExit>
        //           <Box sx={{ margin: 1 }}>
        //             {/* <Typography variant="h6" gutterBottom component="div">
        //             History
        //           </Typography> */}
        //             <div>
        //               <FormControl component="fieldset">
        //                 <Typography variant="h6">Select Bill Type</Typography>
        //                 <RadioGroup
        //                   aria-label="options"
        //                   name="options"
        //                   style={{ flexDirection: "row" }}
        //                   // value={selectedValue}
        //                   onChange={handleChange}
        //                 >
        //                   <FormControlLabel
        //                     value="byMaintainanceBill"
        //                     control={<Radio />}
        //                     label="Enter Bill"
        //                   />
        //                   <FormControlLabel
        //                     value="byMaintainancePicture"
        //                     control={<Radio />}
        //                     label="Insert Picture"
        //                   />
        //                 </RadioGroup>
        //               </FormControl>

        //               {/* Conditional rendering based on the selected radio button */}
        //               {selectedValue === "byMaintainanceBill" && (
        //                 <div>
        //                   <Table size="small" aria-label="purchases">
        //                     <TableHead>
        //                       <TableRow>
        //                         <TableCell>Enter Bill</TableCell>
        //                         <TableCell>Bill Date</TableCell>
        //                         <TableCell>Due Date</TableCell>
        //                         <TableCell>Total Bill</TableCell>
        //                       </TableRow>
        //                     </TableHead>
        //                     <TableBody>
        //                       <TableRow>
        //                         <TableCell>
        //                           <input
        //                             placeholder="Enter Bill"
        //                             onChange={(e) => {
        //                               setMaintainanceBill(e.target.value);
        //                             }}
        //                           />
        //                         </TableCell>
        //                         <TableCell>
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                           <DatePicker />
        //                         </LocalizationProvider>
        //                         </TableCell>
        //                         <TableCell>
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                           <DatePicker />
        //                         </LocalizationProvider>
        //                         </TableCell>
        //                         <TableCell>{maintainanceBill||0}</TableCell>
        //                       </TableRow>
        //                     </TableBody>
        //                   </Table>
        //                   <Button
        //                     variant="contained"
        //                     sx={{
        //                       marginTop: 2,
        //                       marginRight: 1,
        //                       background: "black",
        //                     }}
        //                   >
        //                     Post
        //                   </Button>
        //                 </div>
        //               )}
        //               {selectedValue === "byMaintainancePicture" && (
        //                 <div> <Stack direction="row" alignItems="center" spacing={2}>
        //                 <Button variant="contained" component="label">
        //                   Upload
        //                   <input hidden accept="image/*" multiple type="file" />
        //                 </Button>
        //               </Stack></div>
        //               )}
        //             </div>
        //           </Box>
        //         </Collapse>
        //       </TableCell>
        //     </TableRow>
        //   ) : row?.type === "trash" ? (
        //     <TableRow>
        //       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        //         <Collapse in={open} timeout="auto" unmountOnExit>
        //           <Box sx={{ margin: 1 }}>
        //             {/* <Typography variant="h6" gutterBottom component="div">
        //             History
        //           </Typography> */}
        //             <div>
        //               <FormControl component="fieldset">
        //                 <Typography variant="h6">Select Bill Type</Typography>
        //                 <RadioGroup
        //                   aria-label="options"
        //                   name="options"
        //                   style={{ flexDirection: "row" }}
        //                   // value={selectedValue}
        //                   onChange={handleChange}
        //                 >
        //                   <FormControlLabel
        //                     value="byTrashBill"
        //                     control={<Radio />}
        //                     label="Enter Bill"
        //                   />
        //                   <FormControlLabel
        //                     value="byTrashPicture"
        //                     control={<Radio />}
        //                     label="Insert Picture"
        //                   />
        //                 </RadioGroup>
        //               </FormControl>

        //               {/* Conditional rendering based on the selected radio button */}
        //               {selectedValue === "byTrashBill" && (
        //                 <div>
        //                   <Table size="small" aria-label="purchases">
        //                     <TableHead>
        //                       <TableRow>
        //                         <TableCell>Enter Bill</TableCell>
        //                         <TableCell>Bill Date</TableCell>
        //                         <TableCell>Due Date</TableCell>
        //                         <TableCell>Total Bill</TableCell>
        //                       </TableRow>
        //                     </TableHead>
        //                     <TableBody>
        //                       <TableRow>
        //                         <TableCell>
        //                           <input
        //                             placeholder="Enter Bill"
        //                             onChange={(e) => {
        //                               setTrashBill(e.target.value);
        //                             }}
        //                           />
        //                         </TableCell>
        //                         <TableCell>
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                           <DatePicker />
        //                         </LocalizationProvider>
        //                         </TableCell>
        //                         <TableCell>
        //                         <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                           <DatePicker />
        //                         </LocalizationProvider>
        //                         </TableCell>
        //                         <TableCell>{trashBill||0}</TableCell>
        //                       </TableRow>
        //                     </TableBody>
        //                   </Table>
        //                   <Button
        //                     variant="contained"
        //                     sx={{
        //                       marginTop: 2,
        //                       marginRight: 1,
        //                       background: "black",
        //                     }}
        //                   >
        //                     Post
        //                   </Button>
        //                 </div>
        //               )}
        //               {selectedValue === "byTrashPicture" && <div> <Stack direction="row" alignItems="center" spacing={2}>
        //   <Button variant="contained" component="label">
        //     Upload
        //     <input hidden accept="image/*" multiple type="file" />
        //   </Button>
        // </Stack></div>}
        //             </div>
        //           </Box>
        //         </Collapse>
        //       </TableCell>
        //     </TableRow>
        //   )
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
  function kElectric(name, type, index) {
    return {
      name,
      type,
      history: [
        {
          previousReading: (
            // <input
            //   placeholder="Previous Reading"
            //   onChange={(e) => {
            //     setprevReadingKelectric(e.target.value);
            //   }}
            // ></input>
            <TextField
              id="outlined-number"
              label="Previous Reading"
              type="number"
              size="small"
              onChange={(e) => {
                setprevReadingKelectric(e.target.value);
              }}
            />
          ),
          currentReading: (
            // <input
            //   placeholder="current Reading"
            //   onChange={(e) => {
            //     setCurrentReadingKelectric(e.target.value);
            //   }}
            // ></input>
            <TextField
              id="outlined-number"
              label="Current Reading"
              type="number"
              size="small"
              onChange={(e) => {
                setCurrentReadingKelectric(e.target.value);
              }}
            />
          ),
          perUnitCharge: (
            // <input
            //   placeholder="Per Unit"
            //   onChange={(e) => {
            //     setPerUnitCharges(e.target.value);
            //   }}
            // ></input>
            <TextField
              id="outlined-number"
              label="Per Unit"
              type="number"
              size="small"
              onChange={(e) => {
                setPerUnitCharges(e.target.value);
              }}
            />
          ),
          totalUnit: currentReadingKelectric - prevReadingKelectric,
          showElectricUnit:
            parseInt(currentReadingKelectric - prevReadingKelectric) *
            parseInt(perUnitCharges),
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
                {/* <TableCell sx={{ color: "white" }} align="right">
                  Year
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Date
                </TableCell> */}
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
