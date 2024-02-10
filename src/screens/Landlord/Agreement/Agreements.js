import React, { useEffect } from "react";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress, Container } from "@mui/material";
import title from "../../../components/title";
import { GetOneAgreement } from "../../../Redux/Reducer/GetOneAgreement";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./agreement.css";
export default function Agreements() {
  title("Agreement");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [landlordData, setLandlordData] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetOneAgreement({ id: id })).then((res) => {
      setData(res?.payload?.data?.data[0]);
      setLandlordData(res?.payload?.data?.data[1]);
    });
  }, []);
  // console.log(data, "data");
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <Wrapper open={open} setOpen={setOpen} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        {data?.length === undefined ? (
          <Container
            className="abc"
            maxWidth="sm"
            sx={{ border: "1px solid", padding: "5px" }}
          >
            <Container className="displayInWeb">
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                  borderBottom: "1px solid",
                }}
              >
                <img
                  src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1631881/contract-clipart-xl.png"
                  width={50}
                />
                <Typography variant="h4" align="center" gutterBottom margin={0}>
                  AGREEMENT OF RENT
                  <br />
                  <Typography
                    sx={{
                      fontSize: "10",
                      fontWeight: "bold",
                      color: "grey",
                    }}
                  >
                    Created at:{" "}
                    {moment(data?.acceptedDate).format("DD-MMM-YYYY")}
                  </Typography>
                </Typography>
                <img
                  className="hideInPrint"
                  src="https://cdn-icons-png.flaticon.com/512/4305/4305613.png"
                  // src="https://www.freeiconspng.com/uploads/print-icon--universal-shop-iconset--aha-soft-29.png"
                  width={50}
                  onClick={handlePrint}
                />
              </Container>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography
                    variant="h6"
                    align="left"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      margin: "0",
                    }}
                  >
                    Flat Detail
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Container
                    padding={0}
                    width={100}
                    sx={{ display: "flex", padding: "0px" }}
                  >
                    <Container width={40}>
                      <Typography>Flat Name</Typography>
                      <Typography>Flat No.</Typography>
                      <Typography>Flat Floor</Typography>
                      <Typography>Flat Rooms</Typography>
                      <Typography>Flat Kitchen</Typography>
                      <Typography>Flat Rent</Typography>
                      <Typography>Flat Trash Charges</Typography>
                      <Typography>Flat Security Charges</Typography>
                      <Typography>Flat Maintainance Charges</Typography>
                    </Container>
                    <Container width={60}>
                      <Typography>{data?.flatDetail[0]?.flatName}</Typography>
                      <Typography>{data?.flatDetail[0]?.flatNumber}</Typography>
                      <Typography>{data?.flatDetail[0]?.flatFloor}</Typography>
                      <Typography>{data?.flatDetail[0]?.flatRooms}</Typography>
                      <Typography>
                        {data?.flatDetail[0]?.flatKitchen}
                      </Typography>
                      <Typography>
                        Rs. {data?.flatDetail[0]?.flatRent}
                      </Typography>
                      <Typography>
                        Rs. {data?.flatDetail[0]?.flatTrashCharges}
                      </Typography>
                      <Typography>
                        Rs. {data?.flatDetail[0]?.flatSecurityCharges}
                      </Typography>
                      <Typography>
                        Rs. {data?.flatDetail[0]?.flatMaintananceCharges}
                      </Typography>
                    </Container>
                  </Container>
                </AccordionDetails>
              </Accordion>
              <br />
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography
                    variant="h6"
                    align="left"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      margin: "0",
                    }}
                  >
                    Landlord Detail
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Container
                    padding={0}
                    width={100}
                    sx={{ display: "flex", padding: "0px" }}
                  >
                    <Container width={40}>
                      <Typography>Name</Typography>
                      <Typography>Father Name</Typography>
                      <Typography>CNIC No.</Typography>
                    </Container>
                    <Container width={60}>
                      <Typography>{landlordData?.userName}</Typography>
                      <Typography>{landlordData?.fatherName}</Typography>
                      <Typography>{landlordData?.cnic}</Typography>
                    </Container>
                  </Container>
                </AccordionDetails>
              </Accordion>
              <br />
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography
                    variant="h6"
                    align="left"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      margin: "0",
                    }}
                  >
                    Tenant Detail
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Container
                    padding={0}
                    width={100}
                    sx={{ display: "flex", padding: "0px" }}
                  >
                    <Container width={40}>
                      <Typography>Name</Typography>
                      <Typography>Father Name</Typography>
                      <Typography>CNIC No.</Typography>
                    </Container>
                    <Container width={60}>
                      <Typography>{data?.name}</Typography>
                      <Typography>{data?.fatherName}</Typography>
                      <Typography>{data?.cnicNo}</Typography>
                    </Container>
                  </Container>
                </AccordionDetails>
              </Accordion>

              <br />
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography
                    variant="h6"
                    align="left"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Agreement Detail
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <span>{landlordData?.userName}</span> and{" "}
                    <span>{data?.name}</span> are agreed to rent out the above
                    said flat for a period of <b>11 months</b> commencing{" "}
                    <b>
                      from{" "}
                      <u>{moment(data?.acceptedDate).format("DD-MM-YYYY")}</u>{" "}
                      To ______________{" "}
                    </b>
                    at the monthly rent of Rs.{" "}
                    <u>
                      <b> {data?.flatDetail[0]?.flatRent}</b>
                    </u>{" "}
                    per month will be paid on or before 5th of every month on
                    following terms and conditions.
                  </Typography>
                  <Typography variant="body1" gutterBottom mt={3}>
                    1. Advance Amount Rs.{" "}
                    <u>
                      <b>{data?.flatDetail[0]?.flatAdvance}</b>
                    </u>{" "}
                    {/* (_______________________){" "} */}
                    will be paid to landlord by tenant as security deposit
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    2. That the electricity bill / Sui gas bill shall pay by the
                    tenant.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    3. That the tenant shall not challenge the ownership of the
                    above said flat.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    4. That the tenant shall keep the said flat in the same
                    condition, which he has taken possession.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    5. That after expiring of the tenancy period he will restore
                    back the possession in the same condition and shall not
                    sublet the flat or any portion to anybody else.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    6. That either party shall serve one month’s prior notice in
                    advance the rent shall be recovered for the notice period
                    also.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    7. That if anybody else or any legal heir raised any
                    objection over the lease/rent of the said flat then the same
                    shall be got cleared by the landlord.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    8. If either party wants to continue this agreement, rent
                    will be increased by 15%, and make a new agreement.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Container>
            <Container className="displayInPrint">
              {/* <img src="http://localhost:3002/static/media/Logo.07d1ec09babf2f86fbb4.png" /> */}
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                  borderBottom: "1px solid",
                }}
              >
                <img
                  src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1631881/contract-clipart-xl.png"
                  width={50}
                />
                <Typography variant="h4" align="center" gutterBottom margin={0}>
                  AGREEMENT OF RENT
                  <br />
                  <Typography
                    sx={{
                      fontSize: "10",
                      fontWeight: "bold",
                      color: "grey",
                    }}
                  >
                    Created at:{" "}
                    {moment(data?.acceptedDate).format("DD-MMM-YYYY")}
                  </Typography>
                </Typography>
                <img
                  className="hideInPrint"
                  src="https://cdn-icons-png.flaticon.com/512/4305/4305613.png"
                  // src="https://www.freeiconspng.com/uploads/print-icon--universal-shop-iconset--aha-soft-29.png"
                  width={50}
                  onClick={handlePrint}
                />
              </Container>

              <Typography
                variant="h6"
                align="left"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  margin: "0",
                }}
              >
                Flat Detail
              </Typography>

              <Container
                padding={0}
                width={100}
                sx={{ display: "flex", padding: "0px" }}
              >
                <Container width={40}>
                  <Typography>Flat Name</Typography>
                  <Typography>Flat No.</Typography>
                  <Typography>Flat Floor</Typography>
                  <Typography>Flat Rooms</Typography>
                  <Typography>Flat Kitchen</Typography>
                  <Typography>Flat Rent</Typography>
                  <Typography>Flat Trash Charges</Typography>
                  <Typography>Flat Security Charges</Typography>
                  <Typography>Flat Maintainance Charges</Typography>
                </Container>
                <Container width={60}>
                  <Typography>{data?.flatDetail[0]?.flatName}</Typography>
                  <Typography>{data?.flatDetail[0]?.flatNumber}</Typography>
                  <Typography>{data?.flatDetail[0]?.flatFloor}</Typography>
                  <Typography>{data?.flatDetail[0]?.flatRooms}</Typography>
                  <Typography>{data?.flatDetail[0]?.flatKitchen}</Typography>
                  <Typography>Rs. {data?.flatDetail[0]?.flatRent}</Typography>
                  <Typography>
                    Rs. {data?.flatDetail[0]?.flatTrashCharges}
                  </Typography>
                  <Typography>
                    Rs. {data?.flatDetail[0]?.flatSecurityCharges}
                  </Typography>
                  <Typography>
                    Rs. {data?.flatDetail[0]?.flatMaintananceCharges}
                  </Typography>
                </Container>
              </Container>

              <br />

              <Typography
                variant="h6"
                align="left"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  margin: "0",
                }}
              >
                Landlord Detail
              </Typography>

              <Container
                padding={0}
                width={100}
                sx={{ display: "flex", padding: "0px" }}
              >
                <Container width={40}>
                  <Typography>Name</Typography>
                  <Typography>Father Name</Typography>
                  <Typography>CNIC No.</Typography>
                </Container>
                <Container width={60}>
                  <Typography>{landlordData?.userName}</Typography>
                  <Typography>{landlordData?.fatherName}</Typography>
                  <Typography>{landlordData?.cnic}</Typography>
                </Container>
              </Container>

              <br />

              <Typography
                variant="h6"
                align="left"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  margin: "0",
                }}
              >
                Tenant Detail
              </Typography>

              <Container
                padding={0}
                width={100}
                sx={{ display: "flex", padding: "0px" }}
              >
                <Container width={40}>
                  <Typography>Name</Typography>
                  <Typography>Father Name</Typography>
                  <Typography>CNIC No.</Typography>
                </Container>
                <Container width={60}>
                  <Typography>{data?.name}</Typography>
                  <Typography>{data?.fatherName}</Typography>
                  <Typography>{data?.cnicNo}</Typography>
                </Container>
              </Container>

              <br />

              <Typography
                variant="h6"
                align="left"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                }}
              >
                Agreement Detail
              </Typography>

              <Typography>
                <span>{landlordData?.userName}</span> and{" "}
                <span>{data?.name}</span> are agreed to rent out the above said
                flat for a period of <b>11 months</b> commencing{" "}
                <b>
                  from <u>{moment(data?.acceptedDate).format("DD-MM-YYYY")}</u>{" "}
                  To ______________{" "}
                </b>
                at the monthly rent of Rs.{" "}
                <u>
                  <b> {data?.flatDetail[0]?.flatRent}</b>
                </u>{" "}
                per month will be paid on or before 5th of every month on
                following terms and conditions.
              </Typography>
              <Typography variant="body1" gutterBottom mt={3}>
                1. Advance Amount Rs.{" "}
                <u>
                  <b>{data?.flatDetail[0]?.flatAdvance}</b>
                </u>{" "}
                {/* (_______________________){" "} */}
                will be paid to landlord by tenant as security deposit
              </Typography>
              <Typography variant="body1" gutterBottom>
                2. That the electricity bill / Sui gas bill shall pay by the
                tenant.
              </Typography>
              <Typography variant="body1" gutterBottom>
                3. That the tenant shall not challenge the ownership of the
                above said flat.
              </Typography>
              <Typography variant="body1" gutterBottom>
                4. That the tenant shall keep the said flat in the same
                condition, which he has taken possession.
              </Typography>
              <Typography variant="body1" gutterBottom>
                5. That after expiring of the tenancy period he will restore
                back the possession in the same condition and shall not sublet
                the flat or any portion to anybody else.
              </Typography>
              <Typography variant="body1" gutterBottom>
                6. That either party shall serve one month’s prior notice in
                advance the rent shall be recovered for the notice period also.
              </Typography>
              <Typography variant="body1" gutterBottom>
                7. That if anybody else or any legal heir raised any objection
                over the lease/rent of the said flat then the same shall be got
                cleared by the landlord.
              </Typography>
              <Typography variant="body1" gutterBottom>
                8. If either party wants to continue this agreement, rent will
                be increased by 15%, and make a new agreement.
              </Typography>
            </Container>
          </Container>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
            <Typography sx={{ fontSize: 40 }}>
              <CircularProgress />
            </Typography>
          </Box>
        )}
      </div>
    </>
  );
}
