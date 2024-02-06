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
import { GetAllTenant } from "../../../Redux/Reducer/GetAllTenant";
import "./newRequest.css";
import { CircularProgress } from "@mui/material";
import { RequestAccept } from "../../../Redux/Reducer/AcceptRequest";
import { useNavigate } from "react-router-dom";
export default function NewRequest() {
  title("New Request");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    setLoading(true);
    dispatch(GetAllTenant({ userId: localStorage.getItem("user_id") })).then(
      (res) => {
        if (res?.payload?.data?.message === "Get All Tenant Successfully") {
          sessionStorage.setItem(
            "tenant_id",
            res?.payload?.data?.data?.data[0]?._id
          );
          setData(res?.payload?.data?.data?.data);
          setLoading(false);
        }
      }
    );
  }, []);

  function createData(
    email,
    name,
    fatherName,
    flatName,
    flatNumber,
    flatFloor,
    flatRent,
    flatAdvance,
    date,
    adultFamilyMembers,
    childrenFamilyMembers,
    occupation,
    gender,
    language,
    cast,
    permanentAddress,
    userId,
    id
  ) {
    return {
      email,
      name,
      fatherName,
      flatName,
      flatNumber,
      flatFloor,
      flatRent,
      flatAdvance,
      date,
      adultFamilyMembers,
      childrenFamilyMembers,
      occupation,
      gender,
      language,
      cast,
      permanentAddress,
      userId,
      id,
      history: [
        {
          date: data?.map((res) => {
            return res?.data?.map((e) => {
              return e.date;
            });
          }),
          totalFamilyMembers: data?.map((res) => {
            return res?.data?.map((e) => {
              return e.adultFamilyMembers;
            });
          }),
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
          <TableCell component="th" scope="row">
            {row.cnicNo}
            {console.log(row, "rowCell")}
          </TableCell>
          <TableCell align="right">{row.fatherName}</TableCell>
          <TableCell align="right">{row.flatDetail[0].flatName}</TableCell>
          <TableCell align="right">{row.flatDetail[0].flatNumber}</TableCell>
          <TableCell align="right">{row.flatDetail[0].flatFloor}</TableCell>
          <TableCell align="right">{row.flatDetail[0].flatRent}</TableCell>
          <TableCell align="right">{row.flatDetail[0].flatAdvance}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
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
                      <TableCell align="right">MaritalStatus</TableCell>
                      <TableCell align="right">Language</TableCell>
                      <TableCell align="right">Cast</TableCell>
                      <TableCell align="right">Permenant Address</TableCell>
                      <TableCell align="right">Total Family Members</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.date}
                      </TableCell>
                      <TableCell>{row.adultFamilyMembers}</TableCell>
                      <TableCell align="right">
                        {row.childrenFamilyMembers}
                      </TableCell>
                      <TableCell align="right">{row.occupation}</TableCell>
                      {/* <TableCell align="right">{row.gender}</TableCell> */}
                      <TableCell align="right">
                        {row.gender[0] === "1"
                          ? "Male"
                          : row.gender[0] === "0"
                          ? "Female"
                          : "Unknown"}
                      </TableCell>
                      <TableCell align="right">
                        {row.maritalStatus[0] === "1"
                          ? "Married"
                          : row.maritalStatus[0] === "0"
                          ? "Un-Married"
                          : "Unknown"}
                      </TableCell>
                      <TableCell align="right">{row.language}</TableCell>
                      <TableCell align="right">{row.cast}</TableCell>
                      <TableCell align="right">
                        {row.permanentAddress}
                      </TableCell>
                      <TableCell align="right">
                        {parseInt(row.adultFamilyMembers) +
                          parseInt(row.childrenFamilyMembers)}
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>

                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginRight: 1, background: "black" }}
                  // onClick={() => handleChange(row)}
                  onClick={() => navigate(`/landlord-functionality/${row._id}`)}
                >
                  View
                </Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  console.log(data, "dataSaeed");

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>All Tenants</h1>
        </div>
        {loading === true ? (
          <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
          <Typography sx={{ fontSize: 40 }}>
            <CircularProgress />
          </Typography>
        </Box>
        ) : data?.length > 0 ? (
          <TableContainer
          component={Paper}
          // sx={{ marginTop: 4 }}
        >
          <Table aria-label="collapsible table">
            <TableHead sx={{ background: "black" }}>
              <TableRow>
                <TableCell />
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>CNIC</TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {!data.includes(undefined) &&
                data.map((row) => <Row row={row} />)}
            </TableBody>
          </Table>
        </TableContainer>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
            <Typography sx={{ fontSize: 40 }}>
              <span className="noData">N</span>
              <span>o</span>
              <span className="noData">T</span>
              <span className="noData"> F</span>
              <span>o</span>
              <span className="noData">u</span>
              <span>n</span>
              <span className="noData">d</span>
            </Typography>
          </Box>
        )}
      </div>
    </>
  );
}
