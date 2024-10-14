import * as React from "react";
import Wrapper from "../../../components/Wrapper";
import title from "../../../components/title";
import "./profile.css";
import { Box, Container, Grid, TextField, Avatar, Button } from "@mui/material";

export default function Profile() {
  title("Profile");
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState({
    name: "SAEED",
    email: "saeed@example.com",
    contactNumber: "923xxxxxxxxx",
  });

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} />
      <div className="mainHeading">
        <h1>Profile</h1>
      </div>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={4}>
          {/* Left Grid: Profile Picture, Name, Details */}
          <Grid item xs={12} md={4} textAlign="center">
            <input
              accept="image/*"
              id="upload-image"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="upload-image">
              <Avatar
                alt="User Avatar"
                src={image || "https://via.placeholder.com/150"}
                sx={{
                  width: 150,
                  height: 150,
                  margin: "auto",
                  cursor: "pointer",
                  marginBottom: 2,
                }}
              />
            </label>
            <h2>{userDetails.name}</h2>
            <p>Email: {userDetails.email}</p>
            <p>Contact: {userDetails.contactNumber}</p>
          </Grid>

          {/* Right Grid: Profile Form */}
          <Grid item xs={12} md={8}>
            <TextField
              required
              id="standard-multiline-flexible"
              label="Name"
              value={userDetails.name}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
              fullWidth
              sx={{ marginBottom: 3 }}
              variant="standard"
            />
            <TextField
              required
              id="standard-multiline-flexible"
              label="Email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              fullWidth
              sx={{ marginBottom: 3 }}
              variant="standard"
            />
            <TextField
              required
              id="standard-textarea"
              label="Contact Number"
              value={userDetails.contactNumber}
              onChange={(e) => setUserDetails({ ...userDetails, contactNumber: e.target.value })}
              fullWidth
              sx={{ marginBottom: 3 }}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
