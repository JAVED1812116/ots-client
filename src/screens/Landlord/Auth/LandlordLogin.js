import React, { useState } from "react";
import "./auth.css";
import { Button } from "@mui/base";
import { useLocation, useNavigate } from "react-router-dom";
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
import title from "../../../components/title";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../../Redux/Reducer/Login";
// import Button from '@mui/material/Button';
const LandlordLogin = () => {
  const location=useLocation();
  console.log(location.state.type,"Location")
  title("Login")
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
const [email,setEmail]=useState(null);
const [password,setPassword]=useState(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const login = () => {
    dispatch(UserLogin({email,password})).then((res)=>{
      console.log(res,"response")
    });
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
              onChange={(e)=>{setEmail(e.target.value)}}
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
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </FormControl>
        </div>

        <div className="flex Login">
          <Button className="LoginButton"   onClick={() => {
               login();
             }}>Login</Button>
        </div>
        <div className="Login flex">
          <div className="newAccount">
            Don't Have Account?
            {location.state.type==="Landlord"?
            <Link to={"/signup"} state={{type:"Landlord"}} className="nodecoration signuplink">Signup</Link>:<Link to={"/signup"} state={{type:"Tenant"}} className="nodecoration signuplink">Signup</Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordLogin;
