import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Logo from "../../assets/Logo.png";
import Banglow from "../../assets/Banglow.jpg";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };
 

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 56,
                  margin: 1,
                }}
                alt="Your logo."
                src={Logo}
              />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                  <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                  onClick={() => {
                    navigate("/about-us");
                  }}
                >
                  About Us
                </Button>
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  Contact Us
                </Button>
                <Button
                   onClick={() => navigate("/login",{state:{type:"Landlord"}})}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  Login
                </Button>
              </Menu>
            </Box>
            {/* Center */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 56,
                  margin: 1,
                }}
                alt="Your logo."
                src={Logo}
              />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" },justifyContent:'right' }}>
            
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => {
                    navigate("/about-us");
                  }}
                >
                  About Us
                </Button>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Contact Us
                </Button>
                <Button
                  onClick={() => navigate("/login",{state:{type:"Landlord"}})}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
      {/* Image Container */}
      <Container
        maxWidth="xl"
        sx={{
          background: "linear-gradient(45deg, #66CCFF 30%, #FFCC99 90%)", // Adjust the colors as needed
          borderRadius: 8,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          padding: "20px",
          marginTop: 2,
        }}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ mt: 2 }}
        >
          {/* First column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ color: "black", fontWeight: "bold", marginBottom: 2 }}>
              Welcome to OTS
            </Box>
            <Box
              sx={{
                fontWeight: "bold",
                color: "black",
                fontSize: { xs: 40, md: 80 },
              }}
            >
              Manage Your <br /> Property
            </Box>
            <Box sx={{ color: "black", fontWeight: "bold", marginBottom: 2 }}>
              you will have everything nearby supermarket, busses, stations,
              cinemas the carmen neighbourhood, etc.
            </Box>
          </Grid>

          {/* Second column */}
          <Grid item xs={12} md={6}>
            <Container
              component="img"
              alt="Your logo."
              src={Banglow}
              sx={{
                width: "100%", // Make the image responsive within its container
                height: "auto", // Maintain aspect ratio
                borderRadius: 8, // Optional: Add rounded corners
              }}
            />
          </Grid>
        </Grid>
      </Container>
      {/* Every Thing Should be this easy */}
      <Container sx={{ mt: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          Every Thing Should be this easy
        </Box>
        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
        <Grid container spacing={3}>
          <Grid item xs>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="../../assets/Banglow.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Answer Questions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Select a quote
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Get Registered
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* </Grid> */}
      </Container>

      {/* Insurance Better */}
      <Container
        maxWidth="xl"
        sx={{
          background: "linear-gradient(45deg, #66CCFF 30%, #FFCC99 90%)", // Adjust the colors as needed
          borderRadius: 8,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          padding: "20px",
          marginTop: 2,
        }}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ mt: 2 }}
        >
          {/* First column */}
          <Grid item xs={12} md={6}>
            <Container
              component="img"
              alt="Your logo."
              src={Banglow}
              sx={{
                width: "100%", // Make the image responsive within its container
                height: "auto", // Maintain aspect ratio
                borderRadius: 8, // Optional: Add rounded corners
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ color: "black", fontWeight: "bold", marginBottom: 2 }}>
              Our best services
            </Box>
            <Box
              sx={{
                fontWeight: "bold",
                color: "black",
                fontSize: { xs: 40, md: 50 },
              }}
            >
              And here's how?We do insurance better <br /> Property
            </Box>
            <Box sx={{ color: "black", mt: 2 }}>
              save an average of$250 per year <br />
              File a claim in 3 min <br />
              Easily Manage your policy online
              <br /> the carmen neighbourhood, etc.
              <br />
              Get and Support <br />
            </Box>
          </Grid>

          {/* Second column */}
        </Grid>
      </Container>

      <Container
        sx={{
          backgroundColor: "black",
          borderRadius: 8,
          padding: "20px",
          marginTop: 2,
        }}
        maxWidth="xl"
      >
        <Box>
          <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
            <Typography
              variant="h4"
              align="center"
              mb={2}
              sx={{ color: "white", fontWeight: "bold", fontSize: 50 }}
            >
              Lets Get in <span style={{ color: "#C0FC57" }}>Touch</span>
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
                InputLabelProps={{
                  style: { color: "#00FF00" },
                }}
                InputProps={{
                  style: { color: "white", borderColor: "white" },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                type="email"
                InputLabelProps={{
                  style: { color: "#00FF00" },
                }}
                InputProps={{
                  style: { color: "white", borderColor: "white" },
                }}
              />
              <TextField
                fullWidth
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
                required
                multiline
                rows={4}
                InputLabelProps={{
                  style: { color: "#00FF00" },
                }}
                InputProps={{
                  style: { color: "white", borderColor: "white" },
                }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#00FF00",
                  color: "black",
                  width: "100%",
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
      {/* FOOTER */}
      <Container sx={{mt:5}}>
        {/* <Typography sx={{color:'black'}}>
          At Integritort, we are revolutionizing the mass tort industry and
          prioritizing patient well-being by harnessing the power of real-time
          medical records. Our cutting-edge technology and innovative approach
          aim to enhance the integrity of mass tort cases while putting patients
          at the center of their own care journey.
        </Typography> */}
        {/* <Typography sx={{ fontWeight: 'bold', color: 'black', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Copyright © 2023 Integritort, LLC. All rights reserved.</Typography> */}
        {/* <Typography sx={{  color: 'white', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', background: "black" }}>Design & Developed by OTS</Typography> */}
      </Container>
      <Box
      sx={{
        textAlign: "center",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[800],
        fontWeight: "bold",
        fontSize: 24,
        p: 6,
      }}
      component="footer"
    >
      <Container maxWidth="xl">
      <Typography sx={{color:'white'}}>
          At Integritort, we are revolutionizing the mass tort industry and
          prioritizing patient well-being by harnessing the power of real-time
          medical records. Our cutting-edge technology and innovative approach
          aim to enhance the integrity of mass tort cases while putting patients
          at the center of their own care journey.
        </Typography>
      <Typography sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Copyright © 2023 Integritort, LLC. All rights reserved.</Typography>
        <Typography sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {"Design & Developed by OTS "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
    </>
  );
}
export default LandingPage;
