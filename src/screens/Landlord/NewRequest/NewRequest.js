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
import { useDispatch } from "react-redux";
import { GetTenant } from "../../../Redux/Reducer/GetTenantDetail";



export default function NewRequest() {
  title("New Request")
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [data, setData] = useState();
  const dispatch=useDispatch()
  React.useEffect(()=>{
    
    dispatch(GetTenant({ userId: localStorage.getItem("user_id") })).then((res)=>{
      console.log(res?.payload?.data?.data[0]?.data,"yy")
      setData(res?.payload?.data?.data[0]?.data)
    })
  },[])
  
function createData(name, fatherName, flatName, flatNumber, flatFloor, flatRent,flatAdvance) {
  return {
    name,
    fatherName,
    flatName,
    flatNumber,
    flatFloor,
    flatRent,
    flatAdvance,
    history: [
      {
        
        date:data?.map((e)=>{return e?.date}),
        totalFamilyMembers: data?.map((e)=>{return e?.adultFamilyMembers}),
        children: data?.map((e)=>{return e?.childrenFamilyMembers}),
        occupation: data?.map((e)=>{return e?.occupation}),
        gender: data?.map((e)=>{return e?.gender}),
        language: data?.map((e)=>{return e?.language}),
        cast: data?.map((e)=>{return e?.cast}),
        permanentAddress: data?.map((e)=>{return e?.permanentAddress}),
        // advance: data?.map((res)=>{return res?.flatDetail?.map((e)=>{return (e?.flatAdvance)})}),

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
        <TableCell align="right">{row.fatherName}</TableCell>
        <TableCell align="right">{row.flatName}</TableCell>
        <TableCell align="right">{row.flatNumber}</TableCell>
        <TableCell align="right">{row.flatFloor}</TableCell>
        <TableCell align="right">{row.flatRent}</TableCell>
        <TableCell align="right">{row.flatAdvance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Tenant Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Adult</TableCell>
                    <TableCell align="right">Children</TableCell>
                    <TableCell align="right">Occupation</TableCell>
                    <TableCell align="right">Gender</TableCell>
                    <TableCell align="right">Language</TableCell>
                    <TableCell align="right">Cast</TableCell>
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
                      <TableCell align="right">{historyRow.children}</TableCell>
                      <TableCell align="right">
                        {historyRow.occupation}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.gender}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.language}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.cast}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.permanentAddress}
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
    // console.log(data)
    createData(data?.map((e)=>{return e.name}), data?.map((e)=>{return e.fatherName}),data?.map((res)=>{return res?.flatDetail?.map((e)=>{return (e?.flatName)})}),data?.map((res)=>{return res?.flatDetail?.map((e)=>{return (e?.flatNumber)})}),data?.map((res)=>{return res?.flatDetail?.map((e)=>{return (e?.flatFloor)})}),data?.map((res)=>{return res?.flatDetail?.map((e)=>{return (e?.flatRent)})}),data?.map((res)=>{return res?.flatDetail?.map((e)=>{return (e?.flatAdvance)})})),

  ];

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
                  Flat Name
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Flat Number
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Floor
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Rent
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Advance
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {/* {console.log(data,"yyyy")} */}
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
