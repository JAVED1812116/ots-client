import React, { useState } from "react";
import Wrapper from "../../../components/Wrapper";
import "./dashboard.css";
import { useLocation } from "react-router";
import title from "../../../components/title";
import { GetAppliedFlat } from "../../../Redux/Reducer/GetAppliedFlat";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BedIcon from "@mui/icons-material/Bed";
import Chip from "@mui/material/Chip";
import cardPic from "../../../assets/card_pic.webp";
import Logo from "../../../assets/CardLogo.png";
import moment from "moment";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function TenantDashboard() {
  title("DashBoard");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(GetAppliedFlat({ userId: localStorage.getItem("user_id") })).then(
      (res) => {
        setData(res?.payload?.data?.data);
      }
    );
  }, []);

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>Dashboard</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Grid container>
            {data &&
              data?.map((e, i) => (
                <Grid key={i}>
                  <Button
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() =>
                      navigate(
                        `/tenant-functionality/${e?.flatDetail[0]?.landlordId}/${e?.flatDetail[0]?.id}`
                      )
                    }
                  >
                    <Card sx={{ maxWidth: 345 }}>
                      <CardHeader
                        avatar={
                          <img
                            src={Logo}
                            style={{
                              objectFit: "cover",
                              width: "50px",
                              height: "50px",
                              borderRadius: 100,
                            }}
                          />
                        }
                        action={
                          <Chip
                            label={
                              e.is_accept
                                ? "Active"
                                : e.is_reject
                                ? "Reject"
                                : "Pending"
                            }
                            color={
                              e.is_accept
                                ? "success"
                                : e.is_reject
                                ? "error"
                                : "primary"
                            }
                          />
                        }
                        title={e.flatDetail[0].flatName}
                        subheader={moment(
                          e.is_accept
                            ? e.acceptedDate
                            : e.is_reject
                            ? e.rejectedDate
                            : e.date
                        ).format("DD-MM-YYYY")}
                      />
                      <CardMedia
                        component="img"
                        height="194"
                        image={cardPic}
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary" style={{textAlign: "left"}}>
                          <span
                            style={{ fontWeight: "bold" }}
                          >{`Owner Name: ${e?.landlordDetail?.ownerName}`}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{textAlign: "left"}}>
                          <span
                            style={{ fontWeight: "bold" }}
                          >{`Email Address: ${e?.landlordDetail?.email}`}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{textAlign: "left"}}>
                          <span
                            style={{ fontWeight: "bold" }}
                          >{`Address: ${e?.landlordDetail?.postalAddress}`}</span>
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing style={{justifyContent: "flex-end"}}>
                        <IconButton aria-label="bedrooms">
                          <BedIcon style={{ fontSize: 20 }} />
                          <Typography style={{ fontSize: 15 }}>
                            {e.flatDetail[0].flatRooms}
                          </Typography>
                        </IconButton>
                        <IconButton aria-label="kitchen">
                          <KitchenIcon style={{ fontSize: 20 }} />
                          <Typography style={{ fontSize: 15 }}>
                            {e.flatDetail[0].flatKitchen}
                          </Typography>
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Button>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </>
  );
}
