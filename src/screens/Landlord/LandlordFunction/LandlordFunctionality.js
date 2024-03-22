import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import agreement from "../../../assets/agreement.png";
// import uploadBill from "../../../assets/UploadBill.jpg";
// import previousBill from "../../../assets/previousBill.jpg";
// import unRegister from "../../../assets/unRigister.png";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import "./LandlordFunctionality.css";
import { useParams } from 'react-router-dom';
export default function LandlordFunctionality() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const getId=window.location.pathname.replace("/landlord-functionality/", "")
  
  return (
    <>
      <Wrapper open={open} setOpen={setOpen} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className=" cardsdiv flex flexwrap">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://blog.ipleaders.in/wp-content/uploads/2022/02/agreement.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Agreement
              </Typography>
              <Typography
                className="overflowpara"
                variant="body2"
                color="text.secondary"
              >
                An agreement is a promise or arrangement between two or more
                parties to do, or not do, something.
              </Typography>
            </CardContent>
            <CardActions className="justifyend">
              <Button
                className="view_button wm100"
                size="large"
                onClick={() => {
                  navigate(`/agreement/${getId}`);
                }}
              >
                View
              </Button>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://media.istockphoto.com/id/1344217043/photo/electric-bill-statement-and-home-energy-consumption.webp?b=1&s=170667a&w=0&k=20&c=0HrN_L88mp7-wC9JppxHzSQtY6DFGLf5FV6k6SwG0nk="
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Upload Bill
              </Typography>
              <Typography variant="body2" color="text.secondary">
                An agreement is a promise or arrangement between two or more
                parties to do, or not do, something.
              </Typography>
            </CardContent>
            <CardActions className="justifyend">
              <Button
                className="view_button wm100"
                size="large"
                onClick={() => {
                  navigate(`/upload-Bill/${getId}`);
                }}
              >
                View
              </Button>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://media.istockphoto.com/id/641839728/photo/real-estate-app-concept-on-smartphone-screen-person-searching-online.webp?b=1&s=170667a&w=0&k=20&c=3SWtrwHuAdLkM-XgHuCbA_alB-ldd4yoo4CpwJ5_6bU="
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Pending Bill
              </Typography>
              <Typography variant="body2" color="text.secondary">
                An agreement is a promise or arrangement between two or more
                parties to do, or not do, something.
              </Typography>
            </CardContent>
            <CardActions className="justifyend">
              <Button
                className="view_button wm100"
                size="large"
                onClick={() => {
                  navigate(`/pending-bill/${getId}`);
                }}
              >
                View
              </Button>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://media.istockphoto.com/id/641839728/photo/real-estate-app-concept-on-smartphone-screen-person-searching-online.webp?b=1&s=170667a&w=0&k=20&c=3SWtrwHuAdLkM-XgHuCbA_alB-ldd4yoo4CpwJ5_6bU="
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Previous Bill
              </Typography>
              <Typography variant="body2" color="text.secondary">
                An agreement is a promise or arrangement between two or more
                parties to do, or not do, something.
              </Typography>
            </CardContent>
            <CardActions className="justifyend">
              <Button
                className="view_button wm100"
                size="large"
                onClick={() => {
                  navigate(`/previous-bill/${getId}`);
                }}
              >
                View
              </Button>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://online.pharmaciae.org.za/wp-content/uploads/elementor/thumbs/unregistered-ot6n195v11gipipseb24tqqwq657ib2pmekkpgs5yw.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                UnRegister
              </Typography>
              <Typography variant="body2" color="text.secondary">
                An agreement is a promise or arrangement between two or more
                parties to do, or not do, something.
              </Typography>
            </CardContent>
            <CardActions className="justifyend">
              <Button className="view_button wm100" size="large">
                View
              </Button>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
        </div>

        {/* <div>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            mt={10}
            columns={{ xs: 6, sm: 8, md: 12 }}
          >
            <Button
              size="small"
              onClick={() => {
                navigate("/agreement");
              }}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt=""
                  height="140"
                  // image={agreement}
                  image="https://blog.ipleaders.in/wp-content/uploads/2022/02/agreement.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Agreement
                  </Typography>
                </CardContent>
              </Card>
            </Button>

            <Button
              size="small"
              onClick={() => {
                navigate("/upload-Bill");
              }}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt=""
                  height="140"
                  // image={uploadBill}
                  image="https://media.istockphoto.com/getId/1344217043/photo/electric-bill-statement-and-home-energy-consumption.webp?b=1&s=170667a&w=0&k=20&c=0HrN_L88mp7-wC9JppxHzSQtY6DFGLf5FV6k6SwG0nk="
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Upload Bill
                  </Typography>
                </CardContent>
              </Card>
            </Button>
          </Grid>
        </div>
        <div>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            mt={10}
          >
            <Button size="small">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt=""
                  height="140"
                  // image={previousBill}
                  image="https://media.istockphoto.com/getId/641839728/photo/real-estate-app-concept-on-smartphone-screen-person-searching-online.webp?b=1&s=170667a&w=0&k=20&c=3SWtrwHuAdLkM-XgHuCbA_alB-ldd4yoo4CpwJ5_6bU="
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Previous Bill
                  </Typography>
                </CardContent>
              </Card>
            </Button>

            <Button size="small">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt=""
                  height="140"
                  // image={unRegister}
                  image="https://online.pharmaciae.org.za/wp-content/uploads/elementor/thumbs/unregistered-ot6n195v11gipipseb24tqqwq657ib2pmekkpgs5yw.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    UnRegister
                  </Typography>
                </CardContent>
              </Card>
            </Button>
          </Grid>
        </div> */}
      </div>
    </>
  );
}
