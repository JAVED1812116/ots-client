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
import "./newRequest.css";
import { CircularProgress} from "@mui/material";
import { RequestAccept } from "../../../Redux/Reducer/AcceptRequest";
import { RequestReject } from "../../../Redux/Reducer/RejectRequest";
import { SendMail } from "../../../Redux/Reducer/SendEmail";
import Swal from 'sweetalert2'

export default function NewRequest() {
  title("New Request");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  React.useEffect(() => {
    setLoading(true)
    dispatch(GetTenant({ userId: localStorage.getItem("user_id") })).then(
      (res) => {
        if(res?.payload?.data?.message==="Get New Request Successfully"){
      
        setData(res?.payload?.data?.data);
        setLoading(false)
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
    id,
    _id,
    landlordId,
    flatId
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
      _id,
      landlordId,
      flatId,
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

  const handleAccept = (row) => {
    if (String(row?.id)) {
      Swal.fire({
        title: 'Do you want to accept this request?',
        showCancelButton: true,
        confirmButtonText: 'Accept',
        customClass: {
          actions: 'my-actions',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          
           dispatch(RequestAccept({ row })).then((res) => {
            if(res?.payload?.data?.message==="Accept Request Successfully"){
            let filterData = [];
            let rejectData = [];
            let rejectEmail = [];
            data.filter((item) =>
              item?.data?.map((val) => {
                val?.flatDetail?.map((v) => {
                  if (v.id !== row?.flatId[0][0]) {
                    filterData.push(item);
                  }
                  else{
                    if (item?.id !== row?.id) {
                      rejectData.push(item)
                    }
                  }
                });
              })
            );
            console.log(rejectData,"rejectData")
            setData(filterData)
            Swal.fire('Accepted!', '', 'success')
               dispatch(SendMail({ email:row.email[0],accept:true ,data:row})).then((res) => {
            });
            console.log(rejectData,"rejectData")
            rejectData?.map((m)=>{
              m.data.map((e)=>{
                rejectEmail.push(e.email)
              })
            })
            console.log(rejectEmail,"rejectEmail")
            dispatch(SendMail({email: rejectEmail ,accept:false,data:rejectData})).then((res) => {
            });
            console.log(rejectData,"rejectData")
            }  
        });
      
        
        } 
      })

  }
  else{
    console.log(0);
  }
}
  const handleReject = (row) => {
    if (row?.id) {
      Swal.fire({
        title: 'Do you want to Reject this request?',
        showCancelButton: true,
        confirmButtonText: 'Reject',
        customClass: {
          actions: 'my-actions',
        },
      }).then((result) => {
        if (result.isConfirmed) {
           dispatch(RequestReject({ row })).then((res) => {
        });
        let accept=false
        dispatch(SendMail({ email:row.email[0],accept })).then((res) => {
       
     });
    setData((prevData) => prevData.filter((item) => item?.id!== row?.id));
          Swal.fire('Rejected!', '', 'success')
        } 
      })
      
  }
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
            {row.email}
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
                  onClick={() => handleAccept(row)}
                >
                  Accept
                </Button>
                 {/* <Button variant="contained" sx={{ marginTop: 2, marginRight: 1, background: "black" }} onClick={handleAccept(row)}>
        Accept
      </Button> */}

                <Button
                  variant="contained"
                  sx={{ marginTop: 2, background: "black" }}
                  onClick={() => handleReject(row)}
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
          return e.email;
        }),
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
        }),
        resp?.data?.map((e) => {
          return e.userId;
        }),
        resp?.id,
        resp?.data?.map((e) => {
          return e._id;
        }),
        resp?.data?.map((e) => {
          return e.flatDetail[0]?.landlordId;
        }),
        resp?.data?.map((res) => {
          return res?.flatDetail?.map((e) => {
            return e?.id;
          });
        }),
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
       
        {data?.length > 0? (
          <TableContainer
            component={Paper}
          >
            <Table aria-label="collapsible table">
              <TableHead sx={{ background: "black" }}>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ color: "white" }}>Email</TableCell>
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
                  rows[0].map((row) => <Row row={row} />)}
              </TableBody>
            </Table>
          </TableContainer>
        ) :loading===true ?
        
        <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
        <Typography sx={{ fontSize: 40 }}>
        <CircularProgress />
        </Typography>
      </Box> 
        :
      
      <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
        <Typography sx={{ fontSize: 40 }}>
          <span className="noData">R</span>
          <span>e</span>
          <span className="noData">q</span>
          <span>u</span>
          <span className="noData">e</span>
          <span>s</span>
          <span className="noData">t</span>
          <span> N</span>
          <span className="noData">o</span>
          <span>T</span>
          <span className="noData"> F</span>
          <span>o</span>
          <span className="noData">u</span>
          <span>n</span>
          <span className="noData">d</span>
        </Typography>
      </Box> 
    }
    
      </div>
    </>
  );
}
