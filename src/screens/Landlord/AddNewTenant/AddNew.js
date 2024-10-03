import * as React from "react";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  Container,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";

import MarkunreadIcon from "@mui/icons-material/Markunread";
import SendIcon from "@mui/icons-material/Send";
import title from "../../../components/title";
import "./newRequest.css";
import { SendMail } from "../../../Redux/Reducer/SendEmail";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { ValidateUser } from "../../../Redux/Reducer/ValidateUser";
import { BASE_URL } from "../../../config/config";
import axios from "axios";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { GetLandlordEmails } from "../../../Redux/Reducer/GetLandlordEmails";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";

export default function AddNew() {
  title("Add New Tenant");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [email, setEmail] = useState(null);
  const [rows, setRows] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isBank, setIsBank] = useState(false);
  const [loader, setLoader] = useState(true);
  const [tableLoader, setTableLoader] = useState(false);
  const { validateUser, loginUser } = useSelector((state) => state);

  React.useEffect(() => {
    // setLoader(true)
    const token = sessionStorage.getItem("ots_token");
    axios({
      method: "POST",
      url: `${BASE_URL}/validateUser`,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      // httpAgent: agent,
      // httpsAgent: agent,
    }).then((res) => {
      setIsBank(res?.data?.user?.is_bank);
      setLoader(false);
    });

    dispatch(
      GetLandlordEmails({
        // email,
        // userId: localStorage.getItem("user_id"),
        // userName: localStorage.getItem("name"),
      })
    ).then((res) => {
      setRows(res?.payload?.data?.data);
      setTableLoader(false);
    });
  }, []);

  const sendEMAIL = () => {
    if (email != null || "") {
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (regexEmail.test(email)) {
        setBtnLoading(true);
        dispatch(
          SendMail({
            email,
            userId: localStorage.getItem("user_id"),
            userName: localStorage.getItem("name"),
          })
        ).then((res) => {
          dispatch(GetLandlordEmails({})).then((resp) => {
            setRows(resp?.payload?.data?.data);
          });
          setBtnLoading(false);
          if (res?.payload?.data?.success) {
            setEmail("");
            toast.success(res?.payload?.data?.message, {
              position: "top-right",
              autoClose: 2000,
            });
          } else {
            toast.error("Something Wrong", {
              position: "top-center",
            });
          }
        });
      } else {
        toast.error("Email is not valid", {
          position: "top-center",
        });
      }
    } else {
      toast.error("Empty Field are not allowed", {
        position: "top-right",
      });
    }
  };
  const columns = [
    {
      field: "sNo",
      headerName: "S.No",
      width: 100, // Set a fixed width for the serial number column
      headerClassName: "header-bg",
    },
    {
      field: "date",
      headerName: "Date",
      // width: 220,
      flex: 1,
      headerClassName: "header-bg",
      //  headerAlign: "center", // Center align header text
      //   align: "center",
      renderCell: (params) =>
        moment(params.value).format("DD MMM YYYY, h:mm A"),
    },
    {
      field: "tenantEmail",
      headerName: "Tenant Email",
      flex: 1,
      // width: 400,
      //  headerAlign: "center", // Center align header text
      //   align: "center",
    },
    {
      field: "tenantEmailStatus",
      headerName: "Status",
      flex: 1,
      // width: 700,
      headerAlign: "right", // Center align header text
      align: "right",
      renderCell: (params) => (
        <Chip
          label={params.value === "active" ? "Active" : "Pending"}
          color={params.value === "active" ? "success" : "primary"}
        />
      ),
    },
  ];
  const DefaultTable = () => {
    return (
      <div style={{ height: 371, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}

          rowsPerPageOptions={[5, 10]}
          // checkboxSelection
          getRowId={(row) => row._id}
          sx={{ background: "white", border: "1px solid #ccc" }}
        />
      </div>
      // <TableContainer component={Paper} style={{ marginTop: "10px" }}>
      //   <Table aria-label="simple table">
      //     <TableHead >
      //       <TableRow>
      //         <TableCell sx={{ color: "white" }}>  <DataGrid
      //   rows={rows}
      //   columns={rows}
      //   // initialState={{ pagination: { paginationModel } }}
      //   pageSizeOptions={[5, 10]}
      //   checkboxSelection
      //   getRowId={(row) => row._id}
      //   sx={{ border: 0 }}
      // /></TableCell>
      //         <TableCell sx={{ color: "white" }}>Tenant Email</TableCell>
      //         <TableCell sx={{ color: "white" }}>Status</TableCell>
      //       </TableRow>
      //     </TableHead>
      //     <TableBody>
      //       {rows.map((row) => (
      //         <TableRow
      //           key={row.name}
      //           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      //         >
      //           <TableCell>
      //             {moment(row.date, "YYYY-MM-DDTHH:mm:ss.SSSZ").calendar(null, {
      //               lastDay: "[Yesterday at] h:mm A",
      //               sameDay: "[Today at] h:mm A",
      //               nextDay: "[Tomorrow at] h:mm A",
      //               lastWeek: "dddd [at] h:mm A", // Adjust this line
      //               nextWeek: "dddd [at] h:mm A",
      //               // sameElse: 'DD MMM [at] h:mm A',
      //               sameElse: function (now) {
      //                 if (this.isBefore(now, "year")) {
      //                   // For dates in the previous year
      //                   return "DD MMM YYYY [at] h:mm A";
      //                 } else {
      //                   // For all other dates
      //                   return "DD MMM [at] h:mm A";
      //                 }
      //               },
      //             })}
      //           </TableCell>
      //           <TableCell>{row.tenantEmail}</TableCell>
      //           <TableCell>
      //             {/* {row.tenantEmailStatus} */}
      //             <Chip
      //               label={
      //                 row.tenantEmailStatus === "active" ? "Active" : "Pending"
      //               }
      //               color={
      //                 row.tenantEmailStatus === "active" ? "success" : "primary"
      //               }
      //             />
      //           </TableCell>
      //         </TableRow>
      //       ))}
      //     </TableBody>
      //   </Table>
      // </TableContainer>
    );
  };

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>Add New Tenant</h1>
        </div>
        {loader ? (
          <div className="flex">
            <CircularProgress size={42} color="inherit" />
          </div>
        ) : // ((
        //   (loginUser?.login && typeof loginUser?.login === 'object') || (Array.isArray(loginUser?.login) &&
        //   loginUser?.login?.length > 0)) &&
        //   !loginUser?.login?.data?.data?.is_bank) ||
        // (((validateUser?.UserValidate && typeof validateUser.UserValidate === 'object') || (Array.isArray(validateUser?.UserValidate) &&
        //   validateUser?.UserValidate?.length > 0)) &&
        //   !validateUser?.UserValidate?.data?.user?.is_bank)
        !isBank ? (
          <>
            <div className="flex">
              <h2 className="mx-2">
                Set bank details first in order to add any tenant
              </h2>
              <Button
                className="addNewButton"
                variant="contained"
                // endIcon={<SendIcon />}
                onClick={() => {
                  navigate("/bank-detail");
                }}
              >
                Setup Bank Details
              </Button>
            </div>
          </>
        ) : (
          <Container maxWidth="sm" className="add-new-container">
            <FormControl className="w100 mb-10">
              {/* <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel> */}
              <Input
                value={email}
                id="input-with-icon-adornment"
                placeholder={"Enter Email Address"}
                startAdornment={
                  <InputAdornment position="start">
                    <MarkunreadIcon />
                  </InputAdornment>
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <Button
              className={`addNewButton ${btnLoading && "no-cursor"}`}
              variant="contained"
              startIcon={
                btnLoading && <CircularProgress size={18} color="inherit" />
              }
              endIcon={<SendIcon />}
              onClick={() => {
                !btnLoading && sendEMAIL();
              }}
            >
              Send
            </Button>
          </Container>
        )}
        <ToastContainer />
        {tableLoader ? (
          <div className="flex">
            <CircularProgress size={42} color="inherit" />
          </div>
        ) : (
          rows?.length > 0 && (
            <div>
              <h2>Sent Emails</h2>
              <DefaultTable />
            </div>
          )
        )}
      </div>
    </>
  );
}
