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

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];



// const rows1 = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);


  console.log(props.electricity);

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
          {/* {row.firstName} */}
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
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <DataGrid
        rows={props.electricity}
        columns={columns}
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
                <TableBody>
                  {/* {rows1.history.map((historyRow) => (
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
                  ))} */}
                </TableBody>
              </Table>
              {/* <Button
                variant="contained"
                sx={{ marginTop: 2, marginRight: 1, background: "black" }}
              >
                Post
              </Button> */}
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




export default function PreviousBillLandlordPage() {
  title("Previous Bill")
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const dispatch = useDispatch();
  React.useEffect(() => {
        
    dispatch(GetBill({ userId: localStorage.getItem("user_id") })).then(
      (res) => {
        setData(res?.payload?.data?.data)
        
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
    const electricity = data?.electricity
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
              {console.log(data, 'data')}
              {/* {rows1.map((row) => (
                <Row key={row.firstName} rows1={rows1} />
              ))} */}
              <Row  electricity={data?.electricity} />
              {/* <Row  rows1={rows1} />
              <Row  rows1={rows1} />
              <Row  rows1={rows1} />
              <Row  rows1={rows1} /> */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
