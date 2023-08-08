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


function createData(name, calories, fat, carbs, protein, price) {
  
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        previousReading: <input placeholder="Previous Reading"></input>,
        currentReading:  <input placeholder="Previous Reading"></input>,
        enterBill:  <input placeholder="Type Bill"></input>,
        totalUnit: 15000,
        kElectricBill: 1200,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
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
                    <TableCell align="right">K-Electric Bill</TableCell>
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
                      <TableCell align="right">{historyRow.enterBill}</TableCell>
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
    </React.Fragment>
  );
}

const rows = [
  createData("K-ELECTRIC", "2023", "1-1-2023"),
  createData("SSGC", "2022", "5-1-2022"),
  createData("WATER", "2021", "3-2-2021"),
  createData("MAINTAINANCE", "2020", "2-3-2020"),
  createData("TRASH CHARGES", "2019", "3-3-2019"),
];

export default function NewRequest() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation= {mylocation}/>
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <TableContainer component={Paper} 
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
