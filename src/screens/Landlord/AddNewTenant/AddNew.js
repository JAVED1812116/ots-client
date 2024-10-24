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
  FormHelperText,
} from "@mui/material";
import { useSelector } from "react-redux";

import MarkunreadIcon from "@mui/icons-material/Markunread";
import SendIcon from "@mui/icons-material/Send";
import title from "../../../components/title";
import "./newRequest.css";
import { SendMail } from "../../../Redux/Reducer/SendEmail";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../../config/config";
import axios from "axios";
import AddNewTenantValidation from "../../../Validation/AddNewTenantValidation";
import { GetLandlordEmails } from "../../../Redux/Reducer/GetLandlordEmails";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";

export default function AddNew() {
  title("Add New Tenant");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [rows, setRows] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isBank, setIsBank] = useState(false);
  const [loader, setLoader] = useState(true);
  const [tableLoader, setTableLoader] = useState(false);
  const [emailError, setEmailError] = useState("");
  const validationSchema=AddNewTenantValidation();
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
    setEmailError("");
    validationSchema
      .validate({ email }, { abortEarly: false })
      .then(async (e) => {
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
            toast.error("Something went wrong", {
              position: "top-center",
            });
          }
        });
      })
      .catch((err) => {
        if (err.inner) {
          const emailValidationError = err.inner.find(
            (error) => error.path === "email"
          );
          if (emailValidationError) {
            setEmailError(emailValidationError.message); 
          }
        }
      });
  };

  const columns = [
    {
      field: "sNo",
      headerName: "S.No",
      width: 100, 
      headerClassName: "header-bg",
    },
    {
      field: "date",
      headerName: "Date",
      // width: 220,
      flex: 1,
      headerClassName: "header-bg",
      //  headerAlign: "center",
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
      headerAlign: "right",
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
          className="add-new-tenant-datagrid"
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
    );
  };

  return (
    <>
      <Wrapper open={open} setOpen={setOpen}/>
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>Add New Tenant</h1>
        </div>
        {loader ? (
          <div className="flex">
            <CircularProgress size={42} color="inherit" />
          </div>
        ) :
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
            <FormControl className="w100 mb-10" error={!!emailError}>
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
                  setEmailError("");
                }}
              />
                {emailError && (
              <FormHelperText style={{ color: "red" }}>
                {emailError}
              </FormHelperText>
            )}
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
