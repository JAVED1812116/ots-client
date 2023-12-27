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
  title("New Request");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(GetTenant({ userId: localStorage.getItem("user_id") })).then(
      (res) => {
        console.log(res?.payload?.data?.data, "yy");
        setData(res?.payload?.data?.data);
      }
    );
  }, []);

  function createData(
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
    permanentAddress
  ) {
    return {
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
    console.log(row, "22222222233333333333");
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
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
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
                    <TableRow
                    >
                      <TableCell component="th" scope="row">
                        {row.date}
                      </TableCell>
                      <TableCell>{row.adultFamilyMembers}</TableCell>
                      <TableCell align="right">
                        {row.childrenFamilyMembers}
                      </TableCell>
                      <TableCell align="right">{row.occupation}</TableCell>
                      <TableCell align="right">{row.gender}</TableCell>
                      <TableCell align="right">{row.language}</TableCell>
                      <TableCell align="right">{row.cast}</TableCell>
                      <TableCell align="right">
                        {row.permanentAddress}
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
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
    data?.map((resp) => {
      return createData(
        resp?.data?.map((e) => {
          return e.name;
        }),
        resp?.data?.map((e) => {
          return e.fatherName;
        }),
        resp?.data?.map((res) => {
          return res?.flatDetail?.map((e) => {
            return e?.flatName;
          });
        }),
        resp?.data?.map((res) => {
          return res?.flatDetail?.map((e) => {
            return e?.flatNumber;
          });
        }),
        resp?.data?.map((res) => {
          return res?.flatDetail?.map((e) => {
            return e?.flatFloor;
          });
        }),
        resp?.data?.map((res) => {
          return res?.flatDetail?.map((e) => {
            return e?.flatRent;
          });
        }),
        resp?.data?.map((res) => {
          return res?.flatDetail?.map((e) => {
            return e?.flatAdvance;
          });
        }),
        resp?.data?.map((e) => {
          return e.date;
        }),
        resp?.data?.map((e) => {
          return e.adultFamilyMembers;
        }),
        resp?.data?.map((e) => {
          return e.childrenFamilyMembers;
        }),
        resp?.data?.map((e) => {
          return e.occupation;
        }),
        resp?.data?.map((e) => {
          return e.gender;
        }),
        resp?.data?.map((e) => {
          return e.language;
        }),
        resp?.data?.map((e) => {
          return e.cast;
        }),
        resp?.data?.map((e) => {
          return e.permanentAddress;
        })
      );
    }),
  ];

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>New Requests</h1>
        </div>
        <TableContainer
          component={Paper}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {!rows.includes(undefined) &&
                rows[0].map((row) => (
                  <Row
                    row={row}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
