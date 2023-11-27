import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import { Container } from "@mui/material";
import { useLocation } from "react-router";
import title from "../../../components/title";
import "./rentSetting.css";
import { useDispatch } from "react-redux";
import { RentSet } from "../../../redux/Reducer/RentSetting";
import { toast, ToastContainer } from "react-toastify";
import GetRentDetails, { GetRent } from "../../../redux/Reducer/GetRentDetails";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import moment from "moment/moment";

export default function RentSetting() {
  title("Rent Setting");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [detail, setDetail] = useState({
    monthlyRent: "",
    advance: "",
    maintenanceCharges: "",
    trashCharges: "",
  });
  const columns = [
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'monthlyRent', label: 'Monthly Rent', minWidth: 100 },
    { id: 'advance', label: 'Advance', minWidth: 170 },
    { id: 'maintananceCharges', label: 'Maintainance Charges', minWidth: 100 },
    { id: 'trashCharges', label: 'Trash Charges', minWidth: 100 },
    
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = () => {
    if (
      (detail.monthlyRent &&
        detail.advance &&
        detail.maintenanceCharges &&
        detail.trashCharges != null) ||
        ""
        ) {
          detail.userId = localStorage.getItem("user_id");
          detail.userName = localStorage.getItem("name");
          dispatch(RentSet({ detail })).then((res) => {
            if (res?.payload?.data?.message === "Rent Set Successfully") {
              toast.success(res?.payload?.data?.message, {
                autoClose: 300,
              });
            } else {
              toast.error(res?.payload?.data?.message, {
                autoClose: 300,
              });
            }
          });
        } else {
          toast.error("Empty Field are not allowed", {
            autoClose: 300,
          });
        }
      };
      
      React.useEffect(() => {
      
        dispatch(GetRent({ userId: localStorage.getItem("user_id") })).then(
          (res) => {
            setData(res?.payload?.data?.data)
            
            let { monthlyRent, advance, maintenanceCharges, trashCharges } =res?.payload?.data?.data[0];
            setDetail({
              monthlyRent,
              advance,
              maintenanceCharges,
              trashCharges,
            });
          
      }
      );
    }, []);
    
    
    return (
      <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />

      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>Rent Setting</h1>
        </div>
        <Container maxWidth="sm" className="rent-setting-container">
          <div className="rent-inputs">
            <TextField
              id="standard-multiline-flexible"
              label="Monthly Rent"
              multiline
              maxRows={4}
              variant="standard"
              name="monthlyRent"
              value={detail.monthlyRent}
              onChange={handleChange}
            />
            <TextField
              id="standard-textarea"
              label="Advance"
              placeholder="Placeholder"
              multiline
              variant="standard"
              name="advance"
              value={detail.advance}
              onChange={handleChange}
            />

            <TextField
              id="standard-multiline-flexible"
              label="Maintenance Charges"
              multiline
              maxRows={4}
              variant="standard"
              name="maintenanceCharges"
              value={detail.maintenanceCharges}
              onChange={handleChange}
            />
            <TextField
              id="standard-textarea"
              label="Trash Charges"
              placeholder="Placeholder"
              multiline
              variant="standard"
              name="trashCharges"
              value={detail.trashCharges}
              onChange={handleChange}
            />
          </div>
          <Button
            className="rentButton"
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Container>
        
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        
          <TableBody>
              {data&&data?.map((column) => (
          <TableRow>
                  <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {moment(column.date).format("MM-DD-YYYY")}
                </TableCell>
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.monthlyRent}
                </TableCell>
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.advance}
                </TableCell>
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.maintenanceCharges}
                </TableCell>
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.trashCharges}
                </TableCell>
              
            </TableRow>
              ))}
         
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
        <ToastContainer />
      </div>
    </>
  );
}
