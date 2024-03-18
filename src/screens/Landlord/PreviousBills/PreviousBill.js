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
import { GetBill } from "../../../Redux/Reducer/GetBillDetails";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useParams } from "react-router-dom";
import { CircularProgress} from "@mui/material";
const electricityColumns = [
  {
    field: "date",
    headerName: "Post Date",
    width: 150,
    valueFormatter: (params) => moment(params.value).format("DD-MM-YYYY"),
  },
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
  {
    field: "kElectricBillImage",
    headerName: "Image",
    width: 150,
    renderCell: (params) =>
      params.value === "" ? (
        ""
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={params.value}
            alt="Electric Bill"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <a href={params.value}>
            <button
              className="download-button"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                opacity: 0,
              }}
            >
              <img style={{ width: "24px", height: "24px" }} />
            </button>
          </a>
        </div>
      ),
  },
];
const ssgcColumns = [
  {
    field: "date",
    headerName: "Post Date",
    width: 150,
    valueFormatter: (params) => moment(params.value).format("DD-MM-YYYY"),
  },
  { field: "ssgcDueDate", headerName: "Due Date", width: 150 },
  {
    field: "currentReadingSsg",
    headerName: "Current Reading",
    width: 150,
  },
  {
    field: "previousReadingSsg",
    headerName: "Previous Reading",
    width: 150,
  },
  { field: "perUnitSsgCharges", headerName: "Per Unit", width: 150 },
  { field: "ssgcTotalUnits", headerName: "Total Unit", width: 150 },
  { field: "ssgcTotalBill", headerName: "Total Bill", width: 150 },
  {
    field: "ssgcBillImage",
    headerName: "Image",
    width: 150,
    renderCell: (params) =>
      params.value === "" ? (
        ""
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={params.value}
            alt="Electric Bill"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <a href={params.value}>
            <button
              className="download-button"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                opacity: 0,
              }}
            >
              <img style={{ width: "24px", height: "24px" }} />
            </button>
          </a>
        </div>
      ),
  },
];
const waterColumns = [
  {
    field: "date",
    headerName: "Post Date",
    width: 150,
    valueFormatter: (params) => moment(params.value).format("DD-MM-YYYY"),
  },
  { field: "waterDueDate", headerName: "Due Date", width: 550 },
  {
    field: "waterTotalBill",
    headerName: "Total Bill",
    width: 550,
  },
  {
    field: "waterBillImage",
    headerName: "Image",
    width: 150,
    renderCell: (params) =>
      params.value === "" ? (
        ""
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={params.value}
            alt="Electric Bill"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <a href={params.value}>
            <button
              className="download-button"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                opacity: 0,
              }}
            >
              <img style={{ width: "24px", height: "24px" }} />
            </button>
          </a>
        </div>
      ),
  },
];
const maintainanceColumns = [
  {
    field: "date",
    headerName: "Post Date",
    width: 150,
    valueFormatter: (params) => moment(params.value).format("DD-MM-YYYY"),
  },
  { field: "maintananceDueDate", headerName: "Due Date", width: 550 },
  {
    field: "maintananceTotalBill",
    headerName: "Total Bill",
    width: 550,
  },
  {
    field: "maintananceBillImage",
    headerName: "Image",
    width: 150,
    renderCell: (params) =>
      params.value === "" ? (
        ""
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={params.value}
            alt="Electric Bill"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <a href={params.value}>
            <button
              className="download-button"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                opacity: 0,
              }}
            >
              <img style={{ width: "24px", height: "24px" }} />
            </button>
          </a>
        </div>
      ),
  },
];
const trashColumns = [
  {
    field: "date",
    headerName: "Post Date",
    width: 150,
    valueFormatter: (params) => moment(params.value).format("DD-MM-YYYY"),
  },
  { field: "trashDueDate", headerName: "Due Date", width: 550 },
  {
    field: "trashTotalBill",
    headerName: "Total Bill",
    width: 550,
  },
  {
    field: "trashBillImage",
    headerName: "Image",
    width: 150,
    renderCell: (params) =>
      params.value === "" ? (
        ""
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={params.value}
            alt="Electric Bill"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <a href={params.value}>
            <button
              className="download-button"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                opacity: 0,
              }}
            >
              <img style={{ width: "24%", height: "24px" }} />
            </button>
          </a>
        </div>
      ),
  },
];


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell style={{ width: "10px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props?.electricity
            ? "Electricity"
            : props?.ssgc
            ? "SSGC"
            : props?.water
            ? "Water"
            : props?.maintainance
            ? "Maintainance"
            : props?.trash
            ? "Trash"
            : ""}
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
              {props?.electricity ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <DataGrid
                        rows={props?.electricity}
                        columns={electricityColumns}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                        getRowId={(row) => row._id} 
                        // checkboxSelection
                      />
                    </TableRow>
                  </TableHead>
                </Table>
              ) : props?.ssgc ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <DataGrid
                        rows={props?.ssgc}
                        columns={ssgcColumns}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                        getRowId={(row) => row._id} 
                        // checkboxSelection
                      />
                    </TableRow>
                  </TableHead>
                </Table>
              ) : props?.water ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <DataGrid
                        rows={props?.water}
                        columns={waterColumns}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                        getRowId={(row) => row._id} 
                        // checkboxSelection
                      />
                    </TableRow>
                  </TableHead>
                </Table>
              ) : props?.maintainance ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <DataGrid
                        rows={props?.maintainance}
                        columns={maintainanceColumns}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                        getRowId={(row) => row._id} 
                        // checkboxSelection
                      />
                    </TableRow>
                  </TableHead>
                </Table>
              ) : props?.trash ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <DataGrid
                        rows={props?.trash}
                        columns={trashColumns}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                        }}
                        pageSizeOptions={[5, 10]}
                        getRowId={(row) => row._id} 
                        // checkboxSelection
                      />
                    </TableRow>
                  </TableHead>
                </Table>
              ) : (
                ""
              )}
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const dispatch = useDispatch();
  const { id } = useParams();
  let paramsID = id;
  const getId=window.location.pathname.replace("/previous-bill/", "")
  console.log(getId,"javed")
  React.useEffect(() => {
    setLoading(true)
    dispatch(
      // GetBill({ userId: localStorage.getItem("user_id"), paramsID: paramsID })
      GetBill({ id:getId })
    ).then((res) => {
      setData(res?.payload?.data?.data);
      setLoading(false)
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
    });
  }, []);
  data?.electricity?.map((e) => {
    if (e.kElectricBillDate === "") {
      delete data.electricity;
    }
  });
  data?.ssgc?.map((e) => {
    if (e.ssgcBillDate === "") {
      delete data.ssgc;
    }
  });
  data?.water?.map((e) => {
    if (e.waterBillDate === "") {
      delete data.water;
    }
  });
  data?.maintainance?.map((e) => {
    if (e.maintananceBillDate === "") {
      delete data.maintainance;
    }
  });
  data?.trash?.map((e) => {
    if (e.trashBillDate === "") {
      delete data.trash;
    }
  });
  console.log(data, "running");
  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
      {loading===true?
      <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
        <Typography sx={{ fontSize: 40 }}>
        <CircularProgress />
        </Typography>
      </Box> 
:
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
              {data?.electricity && <Row electricity={data?.electricity} />}
              {data?.ssgc && <Row ssgc={data?.ssgc} />}
              {data?.water && <Row water={data?.water} />}
              {data?.maintainance && <Row maintainance={data?.maintainance} />}
              {data?.trash && <Row trash={data?.trash} />}
              {(!data?.electricity &&
                !data?.ssgc &&
                !data?.water &&
                !data?.maintainance &&
                !data?.trash) && <>no record</>}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
}
    </>
  );
}
