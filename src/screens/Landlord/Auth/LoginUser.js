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
import { Link } from "react-router-dom";
import title from "../../../components/title";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../../Redux/Reducer/LoginUser";
import { ToastContainer, toast } from "react-toastify";
const LoginUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.state.type,"Location")
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    location?.state?.type === undefined && navigate("/");
  }, []);
  const login = () => {
    title("Login");

    if ((email && password != null) || "") {
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      var passwords = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (regexEmail.test(email)) {
        if (passwords.test(password)) {
          dispatch(UserLogin({ email, password })).then((res) => {
            if (
              res?.payload?.data?.message === "User Login Successfully" &&
              res?.payload?.data?.data?.is_register === true &&
              res?.payload?.data?.data?.is_active === true
            ) {
              sessionStorage.setItem(
                "is_register",
                res?.payload?.data?.data?.is_register
              );
              localStorage.setItem("name", res?.payload?.data?.data?.name);
              localStorage.setItem("is_register", true);
              localStorage.setItem("user_id", res?.payload?.data?.data?._id);
              // console.log(
              //   res?.payload?.data?.data?.name,
              //   "data:res?.payload?.data?.data?.name"
              // );
              toast.success("Logging!", {
                autoClose: 300,
              });
              setTimeout(() => {
                if (res?.payload?.data?.data?.type === "landlord") {
                  {
                    navigate("/landlord-dashboard");
                  }
                } else if (res?.payload?.data?.data?.type === "tenant") {
                  {
                    navigate("/tenant-dashboard");
                    // tenant dashboard working here
                  }
                }
              }, 2200);
            } else if (res?.payload?.data?.data?.code &&
              res?.payload?.data?.data?.is_active === false &&
              res?.payload?.data?.data?.is_register === true) {
              toast.success("Logging!", {
                autoClose: 300,
              });
              sessionStorage.setItem(
                "is_register",
                res?.payload?.data?.data?.is_register
              );
              sessionStorage.setItem("name", res?.payload?.data?.data?.name);
              sessionStorage.setItem("user_id", res?.payload?.data?.data?._id);
              sessionStorage.setItem(
                "user_email",
                res?.payload?.data?.data?.email
              );
              sessionStorage.setItem("code", res?.payload?.data?.data?.code);
              setTimeout(() => {
                navigate("/pending-request");
              }, 2200);
            } else if (
              res?.payload?.data?.message === "User Login Successfully" &&
              res?.payload?.data?.data?.is_register === false &&
              res?.payload?.data?.data?.is_active === false
            ) {
              toast.success("Logging!", {
                autoClose: 300,
              });
              sessionStorage.setItem(
                "is_register",
                res?.payload?.data?.data?.is_register
              );
              sessionStorage.setItem("name", res?.payload?.data?.data?.name);
              sessionStorage.setItem("user_id", res?.payload?.data?.data?._id);
              sessionStorage.setItem(
                "user_email",
                res?.payload?.data?.data?.email
              );
              setTimeout(() => {
                if (res?.payload?.data?.data?.type === "landlord") {
                  {
                    navigate("/property-reg");
                  }
                } else if (res?.payload?.data?.data?.type === "tenant") {
                  {
                    sessionStorage.setItem("code", res?.payload?.data?.data?.code);
                    navigate("/tenant-registration");
                  }
                }
              }, 2200);
            } else if (
              res?.payload?.data?.message === "User Login Successfully" &&
              res?.payload?.data?.data?.is_register === true &&
              res?.payload?.data?.data?.is_active === false
            ) {
              toast.success("Logging!", {
                autoClose: 300,
              });
              sessionStorage.setItem(
                "is_register",
                res?.payload?.data?.data?.is_register
              );
              sessionStorage.setItem("name", res?.payload?.data?.data?.name);
              sessionStorage.setItem("user_id", res?.payload?.data?.data?._id);
              sessionStorage.setItem(
                "user_email",
                res?.payload?.data?.data?.email
              );
              setTimeout(() => {
                if (location?.state?.type === "Landlord") {
                  {
                    navigate("/pending-request");
                  }
                }
                // else if(location?.state?.type==="Tenant"){
                //   { navigate("/tenant-registration")}
                // }
              }, 2200);
            } else if (res?.payload?.data?.result === "No User Found") {
              toast.error(res?.payload?.data?.result, {
                position: "top-center",
              });
            } else {
              toast.error(res?.payload?.data?.message, {
                position: "top-center",
              });
            }
          });
        } else {
          toast.error("Password is not valid", {
            position: "top-center",
          });
        }
      } else {
        toast.error("Email is not valid", {
          position: "top-center",
        });
      }
    } else {
      toast.error("Empty Field are not allowed", {
        position: "top-center",
      });
    }
  };
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
        </div>

        <div className="flex Login">
          <Button
            className="LoginButton"
            onClick={() => {
              login();
            }}
          >
            Login
          </Button>
        </div>
        <div className="Login flex">
          <div className="newAccount">
            Don't Have Account?
            {location?.state?.type === "Landlord" ? (
              <Link
                to={"/signup"}
                state={{ type: "Landlord" }}
                className="nodecoration signuplink"
              >
                Signup
              </Link>
            ) : (
              <Link
                to={"/signup"}
                state={{ type: "Tenant" }}
                className="nodecoration signuplink"
              >
                Signup
              </Link>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginUser;
