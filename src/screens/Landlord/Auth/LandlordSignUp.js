import React, { useState } from "react";
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
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Link } from "react-router-dom";
import title from "../../../components/title";
import { UserAdd } from "../../../Redux/Reducer/Signup";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

// import Button from '@mui/material/Button';
const LandlordSignup = () => {
  title("SignUp")
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [name,setName]=useState(null);
  const [email,setEmail]=useState(null);
  const [password,setPassword]=useState(null);
  <Alert variant="filled" severity="success">
  This is a success alert — check it out!
</Alert>
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const Signup = () => {
    if(name||email||password!=null){
      dispatch(UserAdd({name,email,password})).then((res)=>{
        if(res?.payload?.data==="user Register Successfully"){
          return(
            toast.success("Signup Successfully!",{
              position:"top-center"
            })

          )
        }
        else{
          console.log("ok")
        }
      });
    }else{
    
    }
    
  };
  return (
    <div className="landlord_login">
    
      <div className="login-body">
        <div className="logoClass">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="loginText">
          <h1>Signup Page</h1>
        </div>
        <div className="flex flex-col">
          <FormControl variant="outlined" fullWidth className="name_input">
            <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={"text"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {<PersonOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="Name"
              onChange={(e)=>setName(e.target.value)}
            />
          </FormControl>

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
{/* onClick={() => navigate("/landlord-dashboard")} */}
        <div className="flex Login">
          <Button className="LoginButton"       onClick={() => {
            Signup();
          }} >Signup</Button>
        </div>
        <div className="Login flex">
          <text className="newAccount">
            Already have an account
            <Link to={"/landlord-login"} className="nodecoration signuplink">Login</Link>
          </text>
        </div>
      </div>
      <div className="bg"></div>
<ToastContainer />
    </div>
  );
};

export default LandlordSignup;
