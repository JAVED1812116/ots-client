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
        date: "2020-01-05",
        totalFamilyMembers: 5,
        advance: 30000,
        monthlyRent: 15000,
        previousAddress: "naganChowrangi",
        permenantAddress: "Shikarpur",
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
                    <TableCell>Date</TableCell>
                    <TableCell>Total Family Members</TableCell>
                    <TableCell align="right">Advance</TableCell>
                    <TableCell align="right">Monthly Rent</TableCell>
                    <TableCell align="right">Prev Address</TableCell>
                    <TableCell align="right">Permenant Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.totalFamilyMembers}</TableCell>
                      <TableCell align="right">{historyRow.advance}</TableCell>
                      <TableCell align="right">
                        {historyRow.monthlyRent}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.previousAddress}
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
                Accept
              </Button>
              <Button
                variant="contained"
                sx={{ marginTop: 2, background: "black" }}
              >
                Reject
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Zia-ur-rehman", "Khalil-ur-rehman", 500),
  createData("Ritick", "Bhawani shankar", 420),
  createData("saeed", "afzal", 200),
  createData("shameel", "idrees", 100),
  createData("rahul", "Gianchandani", 50),
];

export default function NewRequest() {
  title("New Request")
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation= {mylocation}/>
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
      <div className="mainHeading">
          <h1>New Requests</h1>
        </div>
        <TableContainer component={Paper} 
        // sx={{ marginTop: 4 }}
        >
          <Table aria-label="collapsible table">
            <TableHead sx={{ background: "black" }}>
              <TableRow>
                <TableCell />
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Father Name
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  CNIC No
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
