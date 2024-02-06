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
export default function Agreements() {
  title("Agreement");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetOneAgreement({ id: id })).then((res) => {
      setData(res?.payload?.data?.data[0]);
    });
  }, []);
  console.log(data, "data");
  return (
    <>
      <Wrapper open={open} setOpen={setOpen} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        {console.log(data?.length > 0, "dataLength")}
        {data?.length === undefined ? (
          <Container maxWidth="sm" sx={{ border: "1px solid", padding: "5px" }}>
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
                  Created at: {moment(data?.acceptedDate).format("DD-MMM-YYYY")}
                </Typography>
              </Typography>
            </Container>
            <Typography
              variant="h6"
              align="left"
              gutterBottom
              sx={{
                fontWeight: "bold",
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
                <Typography>abc</Typography>
                <Typography>abc</Typography>
                <Typography>abc</Typography>
              </Container>
            </Container>
            <Typography
              variant="h6"
              align="left"
              gutterBottom
              sx={{
                fontWeight: "bold",
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
            <Typography variant="body1" gutterBottom>
              <b> Name ____________ Father’s Name: ___________</b>landlord
              holding<b> CNIC NO # ___________ </b>Resident House
              <b>#_________________________________________ Karachi </b>(Here in
              after called the landlord) of the one part.
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
              AND
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>Name: </b>
              <u> {data?.name}</u> <b> CNIC NO#: </b> <u> {data?.cnicNo}</u>{" "}
              (here in after called the Tenant) of the other part. Whereas the
              landlord is owner a residential flat of
              <b> Flat Name </b>
              <u> {data?.flatDetail[0]?.flatName}</u> <b>Flat NO#</b>{" "}
              <u>{data?.flatDetail[0]?.flatNumber}</u>
              <b>Flat Floor</b> <u>{data?.flatDetail[0]?.flatFloor}</u>
              <b> Flat Rooms</b> <u>{data?.flatDetail[0]?.flatRooms}</u>{" "}
              <b>Flat Kitchen</b> <u>{data?.flatDetail[0]?.flatKitchen}</u> They
              are agreed to rent out the above said flat for a period of{" "}
              <b>11 months</b> commencing{" "}
              <b>
                from <u>{moment(data?.date).format("DD-MM-YYYY")}</u> To
                ______________{" "}
              </b>
              at the monthly rent of Rs.<u>{data?.rent}</u>
              (_______________________________) per month will be paid on or
              before 5th of every month on following terms and conditions.
            </Typography>

            <Typography variant="body1" gutterBottom mt={3}>
              <b>
                1. Advance Amount Rs. <u>{data?.advance}</u>{" "}
                (_______________________){" "}
              </b>
              will be paid to landlord by tenant as security deposit
            </Typography>
            <Typography variant="body1" gutterBottom>
              2. That the electricity bill / Sui gas bill shall pay by the
              tenant.
            </Typography>
            <Typography variant="body1" gutterBottom>
              3. That the tenant shall not challenge the ownership of the above
              said flat.
            </Typography>
            <Typography variant="body1" gutterBottom>
              4. That the tenant shall keep the said flat in the same condition,
              which he has taken possession.
            </Typography>
            <Typography variant="body1" gutterBottom>
              5. That after expiring of the tenancy period he will restore back
              the possession in the same condition and shall not sublet the flat
              or any portion to anybody else.
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
              8. If either party wants to continue this agreement, rent will be
              increased by 15%, and make a new agreement.
            </Typography>
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
