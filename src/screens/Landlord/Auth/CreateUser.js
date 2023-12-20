import React, { useEffect, useState } from "react";
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
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
import title from "../../../components/title";
// import { UserAdd } from "../../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import CodeIcon from "@mui/icons-material/Code";
import "react-toastify/dist/ReactToastify.css";
import { UserAdd } from "../../../Redux/Reducer/CreateUser";

// import Button from '@mui/material/Button';
const CreateUser = () => {
  const location = useLocation();
  // console.log(location.state.type, "Locationsignup");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [code, setCode] = useState(null);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  console.log(query.get("id"), "abc");

  <Alert variant="filled" severity="success">
    This is a success alert — check it out!
  </Alert>;
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  // const idRegex = /^\/signup\/([a-fA-F0-9]+)$/;
  // const hasId = idRegex.test(location?.pathname);
  const hasId = query.get("id");
  // useEffect(()=>{
  //   location?.state?.type===undefined&&  navigate("/")
  // },[])
  const Signup = () => {
    title("SignUp");
    if ((name && email && password != null) || "") {
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      var names = /^([^0-9]*)$/;
      var passwords = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

      if (names.test(name)) {
        if (regexEmail.test(email)) {
          if (passwords.test(password)) {
            dispatch(UserAdd({ name, email, password, code: hasId })).then(
              (res) => {
                if (res?.payload?.data === "User Register Successfully") {
                  return toast.success("Signup Successfully!", {
                    position: "top-center",
                  });
                } else if (res?.payload?.data === "User Already Registered") {
                  return toast.error("User Already Registered!", {
                    position: "top-center",
                  });
                } else {
                  toast.error("Empty Field are not allowed", {
                    position: "top-center",
                  });
                }
              }
            );
          } else {
            toast.error("password is not valid", {
              position: "top-center",
            });
          }
        } else {
          toast.error("Email is not valid", {
            position: "top-center",
          });
        }
      } else {
        toast.error("name is not valid", {
          position: "top-center",
        });
      }
    } else {
      toast.error("Please Fill All Field!", {
        position: "top-center",
      });
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
          {location?.state?.type === "Tenant" || hasId ? (
            <FormControl
              variant="outlined"
              fullWidth
              className="email_input"
              disabled
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Code
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                // type={"text"}
                type={"password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {<CodeIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Email"
                value={"landlordcode"}
                // onChange={(e) => {
                //   setCode(e.target.value);
                // }}
              />
            </FormControl>
          ) : (
            ""
          )}
        </div>
        {/* onClick={() => navigate("/landlord-dashboard")} */}
        <div className="flex Login">
          <Button
            className="LoginButton"
            onClick={() => {
              Signup();
            }}
          >
            Signup
          </Button>
        </div>
        <div className="Login flex">
          <text className="newAccount">
            Already have an account
            {/* <Link to={"/login"} className="nodecoration signuplink">Login</Link> */}
            {location?.state?.type === "Landlord" ? (
              <Link
                to={"/login"}
                state={{ type: "Landlord" }}
                className="nodecoration signuplink"
              >
                Login
              </Link>
            ) : (
              <Link
                to={"/login"}
                state={{ type: "Tenant" }}
                className="nodecoration signuplink"
              >
                Login
              </Link>
            )}
          </text>
        </div>
      </div>
      <div className="bg"></div>
      <ToastContainer />
    </div>
  );
};

export default CreateUser;
