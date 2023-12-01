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
import { GetRent } from "../../../redux/Reducer/GetRentDetails";
import moment from "moment/moment";
import { DataGrid } from '@mui/x-data-grid';
export default function RentSetting() {
  title("Rent Setting");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [fieldDisable, setFieldDisable] = useState(false);
  const [detail, setDetail] = useState({
    monthlyRent: "",
    advance: "",
    maintenanceCharges: "",
    trashCharges: "",
  });
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 280 },
    { field: 'date', headerName: 'Date', width: 280, valueFormatter: (params) => formatDate(params.value) },
    { field: 'monthlyRent', headerName: 'Monthly Rent', width: 280 },
    {
      field: 'advance',
      headerName: 'Advance',
      type: 'number',
      width: 280,
    },
    {
      field: 'maintenanceCharges',
      headerName: 'Maintanance Charges',
      type: 'number',
      width: 280,
    },
    {
      field: 'trashCharges',
      headerName: 'Trash Charges',
      type: 'number',
      width: 280,
    },
  ];



  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUpdate = () => {
    setFieldDisable(false)
  
  };
  const handleSubmit = () => {
    setFieldDisable(true)
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
              dispatch(GetRent({ userId: localStorage.getItem("user_id") })).then(
                (res) => {
                  setData(res?.payload?.data?.data)
                  
                  if (res?.payload?.data?.data[0]?.monthlyRent !== "") {
                  setFieldDisable(true)
                  }
                  let { monthlyRent, advance, maintenanceCharges, trashCharges } =res?.payload?.data?.data[0];
                  setDetail({
                    monthlyRent,
                    advance,
                    maintenanceCharges,
                    trashCharges,
                  });
                  
                }
                );
              
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
            
            if (res?.payload?.data?.data[0]?.monthlyRent !== "") {
            setFieldDisable(true)
            }
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
              disabled={fieldDisable===true}
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
              disabled={fieldDisable===true}
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
              disabled={fieldDisable===true}
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
              disabled={fieldDisable===true}
              onChange={handleChange}
            />
          </div>

          {
         data && data[0]?.monthlyRent === "" &&
         data && data[0]?.advance === "" &&
         data && data[0]?.maintenanceCharges === "" &&
         data && data[0]?.trashCharges === "" ? (
            <Button
            className="bankButton"
            variant="contained"
            onClick={handleSubmit}
            >
              Save
            </Button>
          ) : (
            " "
          )}

          {
          data && data[0]?.monthlyRent !== "" &&
          data && data[0]?.advance !== "" &&
          data && data[0]?.maintenanceCharges !== "" &&
          data && data[0]?.trashCharges !== "" ? (
            fieldDisable===false?   <Button
              className="bankButton"
              variant="contained"
              onClick={handleSubmit}
            >
              Update
            </Button>:<Button
              className="bankButton"
              variant="contained"
              onClick={handleUpdate}
            >
              Edit
            </Button>
          ) : (
            " "
          )}
        </Container>
       {data && data?.length>0?
<div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>:""
}
        <ToastContainer />
      </div>
    </>
  );
}
