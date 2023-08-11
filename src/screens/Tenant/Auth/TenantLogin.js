import React from "react";
import "./auth.css";
import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { EmailRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import Button from '@mui/material/Button';
const TenantLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  return (
    <div className="landlord_login">
      <div className="bg"></div>
      <div className="login-body">
        <div className="logoClass">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="loginText">
          <h1>Login Page</h1>
        </div>

        <div className="flex flex-col">
          <FormControl variant="outlined" fullWidth className="email_input">
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={"text"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {<EmailRounded />}
                  </IconButton>
                </InputAdornment>
              }
              label="Email"
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth className="password_input">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {/* <div className="forgetPassword">
            <text>Forget Password</text>
          </div> */}
        </div>
        {/* <div className="line1">
        <div className="loginemail">
          <EmailOutlinedIcon className="loginemail" />
        </div>
        <input className="loginEmailText" placeholder="Enter Your Email" />
      </div>
      <div className="line2">
        <div className="loginPassword">
          <LockOutlinedIcon className="loginPassword" />
        </div>
        <input
          className="loginPasswordText"
          placeholder="Enter Your Password"
        />
      </div> */}

        <div className="flex Login">
          <Button className="LoginButton" onClick={() => navigate("/landlord-dashboard")}>Login</Button>
        </div>
        <div className="Login flex">
          <div className="newAccount">
            Don't Have Account?
            {/* <Button onClick={() => navigate("/landlord-signup")}>Signup</Button> */}
            {/* <Button variant="text" onClick={() => navigate("/landlord-signup")}>Signup</Button> */}
            <Link to={"/tenant-signup"} className="nodecoration signuplink">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;
