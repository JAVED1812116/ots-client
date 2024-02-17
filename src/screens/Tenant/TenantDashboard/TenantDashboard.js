import React, { useState } from "react";
import Wrapper from "../../../components/Wrapper";
import "./dashboard.css";
import { useLocation } from "react-router";
import title from "../../../components/title";
import { GetAppliedFlat } from "../../../Redux/Reducer/GetAppliedFlat";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import KitchenIcon from '@mui/icons-material/Kitchen';
import BedIcon from '@mui/icons-material/Bed';
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import cardPic from "../../../assets/card_pic.webp";
import Logo from "../../../assets/Logo.png";
import moment from "moment";

export default function TenantDashboard() {
  title("DashBoard");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
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
        <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
        {
          data&&data?.map((e,i)=>{
            return(
          <Card sx={{ maxWidth: 345 }} key={i}>
            <CardHeader
              avatar={
                  <img src={Logo} style={{objectFit:"cover",width:'50px',height:'50px',borderRadius:100}}/>
              }
              action={
                <IconButton aria-label="settings">
                  {/* <MoreVertIcon /> */}
                  pending
                </IconButton>
              }
              // title="Shrimp and Chorizo Paella"
              title={e?.flatDetail[0].flatName}
              subheader={moment(e?.acceptedDate===""? e?.rejectedDate:(e?.acceptedDate&&e?.rejectedDate==="")?e?.date:e.acceptedDate).format("DD-MM-YYYY")}
            />
            <CardMedia
              component="img"
              height="194"
              image={cardPic}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="bedrooms">
                <BedIcon  style={{ fontSize: 18 }}/><Typography  style={{ fontSize: 18 }}>{e?.flatDetail[0]?.flatRooms}</Typography>
              </IconButton>
              <IconButton aria-label="kitchen">
                <KitchenIcon  style={{ fontSize: 18 }}/><Typography style={{ fontSize: 18 }}>{e?.flatDetail[0]?.flatKitchen}</Typography>
              </IconButton>
            </CardActions>
          </Card>
          )
          })
        }
        </div>

        
      </div>
    </>
  );
}
