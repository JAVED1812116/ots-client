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
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState('option1');
const [kElectricBillEntry,setKElectricBillEntry]=useState();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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
          style={{flexDirection:"row"}}
          // value={selectedValue}
          onChange={handleChange}
        >
          <FormControlLabel value="byUnitReading" control={<Radio />} label="Enter Unit Reading" />
          <FormControlLabel value="byBill" control={<Radio />} label="Enter Bill" />
          <FormControlLabel value="byPicture" control={<Radio />} label="Insert Picture" />
        </RadioGroup>
      </FormControl>
      
      {/* Conditional rendering based on the selected radio button */}
      {selectedValue === 'byUnitReading' && <div>
      <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Previous Reading</TableCell>
                      <TableCell>Current Reading</TableCell>
                      <TableCell>Per Unit</TableCell>
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
                        <TableCell align="right">
                          {historyRow.totalUnit || 0}
                        </TableCell>
                        {/* <TableCell>{historyRow.enterBill}</TableCell> */}
                        <TableCell >
                          {historyRow.showElectricUnit || 0}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginRight: 1, background: "black" }}
                >
                  Post
                </Button>
        </div>}
      {selectedValue === 'byBill' && <div>
      <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                     
                      <TableCell>Enter Bill</TableCell>
                      <TableCell>Total Bill</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                      <TableRow>                   
                        <TableCell><input placeholder="Enter Bill" onChange={(e)=>{setKElectricBillEntry(e.target.value)}}/></TableCell>
                        <TableCell>{kElectricBillEntry}</TableCell>
                      
                      </TableRow>
                   
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginRight: 1, background: "black" }}
                >
                  Post
                </Button>
        </div>}
      {selectedValue === 'byPicture' && <div>byPicture</div>}
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
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Previous Reading</TableCell>
                      <TableCell>Current Reading</TableCell>
                      <TableCell align="right">Enter Bill</TableCell>
                      <TableCell align="right">Total Unit</TableCell>
                      <TableCell align="right">SSGC Bill</TableCell>
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
                        <TableCell align="right">
                          {historyRow.enterBill}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.totalUnit}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.kElectricBill}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.permenantAddress}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginRight: 1, background: "black" }}
                >
                  Post
                </Button>
                {/* <Button
        variant="contained"
        sx={{ marginTop: 2, background: "black" }}
      >
        Reject
      </Button> */}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : row?.type === "water" ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Water Charges</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.waterCharges}>
                        <TableCell component="th" scope="row">
                          {historyRow.waterCharges}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginRight: 1, background: "black" }}
                >
                  Post
                </Button>
                {/* <Button
                variant="contained"
                sx={{ marginTop: 2, background: "black" }}
              >
                Reject
              </Button> */}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : row?.type === "maintainance" ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Maintainance Charges</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.waterCharges}>
                        <TableCell component="th" scope="row">
                          {historyRow.maintainanceCharges}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginRight: 1, background: "black" }}
                >
                  Post
                </Button>
                {/* <Button
        variant="contained"
        sx={{ marginTop: 2, background: "black" }}
      >
        Reject
      </Button> */}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : row?.type === "trash" ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Trash Charges</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.waterCharges}>
                        <TableCell component="th" scope="row">
                          {historyRow.trashCharges}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginRight: 1, background: "black" }}
                >
                  Post
                </Button>
                {/* <Button
        variant="contained"
        sx={{ marginTop: 2, background: "black" }}
      >
        Reject
      </Button> */}
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
  const [typeBillKelectric, setTypeBillKelectric] = useState();
  const [perUnitCharges, setPerUnitCharges] = useState();
  ////////////////SSGC////////////////////////
  const [prevReadingSsgc, setprevReadingSsgc] = useState();
  const [currentReadingSsgc, setCurrentReadingSsgc] = useState();
  const [typeBillSsgc, setTypeBillSsgc] = useState();
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
            <input
              placeholder="Previous Reading"
              onChange={(e) => {
                setprevReadingKelectric(e.target.value);
              }}
            ></input>
          ),
          currentReading: (
            <input
              placeholder="current Reading"
              onChange={(e) => {
                setCurrentReadingKelectric(e.target.value);
              }}
            ></input>
          ),
          perUnitCharge: (
            <input
              placeholder="Per Unit"
              onChange={(e) => {
                setPerUnitCharges(e.target.value);
              }}
            ></input>
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
          previousReading: (
            <input
              placeholder="Previous Reading"
              onChange={(e) => {
                setprevReadingSsgc(e.target.value);
              }}
            ></input>
          ),
          currentReading: (
            <input
              placeholder="current Reading"
              onChange={(e) => {
                setCurrentReadingSsgc(e.target.value);
              }}
            ></input>
          ),
          enterBill: (
            <input
              placeholder="Type Bill"
              onChange={(e) => {
                setTypeBillSsgc(e.target.value);
              }}
            ></input>
          ),
          totalUnit: 15000,
          kElectricBill: 1200,
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
                <TableCell sx={{ color: "white" }}>Bill Type</TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Year
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Date
                </TableCell>
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
