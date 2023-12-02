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
import { GetBill } from "../../../redux/Reducer/GetBillDetails";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

const electricityColumns = [
  { field: "kElectricBillDate", headerName: "Post Date", width: 150 },
  { field: "kElectricDueDate", headerName: "Due Date", width: 150 },
  {
    field: "kElectricCurrentReading",
    headerName: "Current Reading",
    width: 150,
  },
  {
    field: "kElectricPreviousReading",
    headerName: "Previous Reading",
    width: 150,
  },
  { field: "kElectricPerUnit", headerName: "Per Unit", width: 150 },
  { field: "kElectricTotalUnits", headerName: "Total Unit", width: 150 },
  { field: "kElectricTotalBill", headerName: "Total Bill", width: 150 },
];
const ssgcColumns = [
  { field: "ssgcBillDate", headerName: "Post Date", width: 150 },
  { field: "ssgcDueDate", headerName: "Due Date", width: 150 },
  {
    field: "currentReadingSsg",
    headerName: "Current Reading",
    width: 150,
  },
  {
    field: "prevReadingSsgc",
    headerName: "Previous Reading",
    width: 150,
  },
  { field: "perUnitSsgCharges", headerName: "Per Unit", width: 150 },
  { field: "ssgcTotalUnits", headerName: "Total Unit", width: 150 },
  { field: "ssgcTotalBill", headerName: "Total Bill", width: 150 },
];
const waterColumns = [
  { field: "waterBillDate", headerName: "Post Date", width: 550 },
  { field: "waterDueDate", headerName: "Due Date", width: 550 },
  {
    field: "waterTotalBill",
    headerName: "Total Bill",
    width: 550,
  },
  
];
const maintainanceColumns = [
  { field: "maintananceBillDate", headerName: "Post Date", width: 550 },
  { field: "maintananceDueDate", headerName: "Due Date", width: 550 },
  {
    field: "maintananceTotalBill",
    headerName: "Total Bill",
    width: 550,
  },
  
];
const trashColumns = [
  { field: "trashBillDate", headerName: "Post Date", width: 550 },
  { field: "trashDueDate", headerName: "Due Date", width: 550 },
  {
    field: "trashTotalBill",
    headerName: "Total Bill",
    width: 550,
  },
  
];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  

  return (
    <React.Fragment>
      {console.log(props,"props")}
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
          {"Electricity"}
        </TableCell>
        {/* <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
                {props?.electricity?
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <DataGrid
                      rows={props.electricity}
                      columns={electricityColumns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      checkboxSelection
                    />
                  </TableRow>
                </TableHead>
       
              </Table>:props?.ssgc?
              <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <DataGrid
                    rows={props.ssgc}
                    columns={ssgcColumns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                  />
                </TableRow>
              </TableHead>
     
            </Table>:props?.water?
            <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <DataGrid
                  rows={props.water}
                  columns={waterColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />
              </TableRow>
            </TableHead>
   
          </Table>:props?.maintainance?
            <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <DataGrid
                  rows={props.maintainance}
                  columns={maintainanceColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />
              </TableRow>
            </TableHead>
   
          </Table>:props?.trash?
            <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <DataGrid
                  rows={props.trash}
                  columns={trashColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />
              </TableRow>
            </TableHead>
   
          </Table>:""
}
             
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PreviousBillLandlordPage() {
  title("Previous Bill");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(GetBill({ userId: localStorage.getItem("user_id") })).then(
      (res) => {
        setData(res?.payload?.data?.data);

        if (res?.payload?.data?.data[0]?.monthlyRent !== "") {
          // setFieldDisable(true)
        }
        // let { monthlyRent, advance, maintenanceCharges, trashCharges } =res?.payload?.data?.data[0];
        // setDetail({
        //   monthlyRent,
        //   advance,
        //   maintenanceCharges,
        //   trashCharges,
        // });
      }
    );
  }, []);
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
                {/* <TableCell sx={{ color: "white" }} align="right">
                  Year
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Date
                </TableCell> */}
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Row electricity={data?.electricity} />
              <Row ssgc={data?.ssgc} />
              <Row water={data?.water} />
              <Row maintainance={data?.maintainance} />
              <Row trash={data?.trash} />

            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
