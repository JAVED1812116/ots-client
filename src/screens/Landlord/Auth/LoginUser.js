import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../../Redux/Reducer/LoginUser";
import { ToastContainer, toast } from "react-toastify";
import { loginSchema } from "./validationSchema";
import { useFormik } from "formik";
import { CircularProgress } from "@mui/material";

const initialValues = {
  email: "",
  password: ""
}
const LoginUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const loaderSate=useSelector((state)=>state?.loginUser?.loading)
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values,action) => {
      dispatch(UserLogin({ values })).then((res) => {

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
          localStorage.setItem("is_active", true);
          localStorage.setItem("user_id", res?.payload?.data?.data?._id);
          localStorage.setItem("user_email", res?.payload?.data?.data?.email);
          localStorage.setItem("token", res?.payload?.data?.accessToken)
          sessionStorage.setItem("ots_token", res?.payload?.data?.accessToken);
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
          toast.dismiss();
          toast.error(res?.payload?.data?.result, {
            position: "top-center",
          });
        } else {
          toast.error(res?.payload?.data?.message, {
            position: "top-center",
          });
        }

      });

      action.resetForm();
    },
  })
  useEffect(() => {
    location?.state?.type === undefined && navigate("/");
  }, []);

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
        {loaderSate && (
      <div className="loader-overlay">
        <CircularProgress />
      </div>
    )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <FormControl variant="outlined" fullWidth className="email_input">
              <InputLabel htmlFor="outlined-adornment-password" style={{ marginBottom: 22 }}>Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={"text"}
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.email && Boolean(errors.email)
                }
                helperText={touched.email && errors.email}
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
              />
              <p className="error-style">{errors.email}</p>
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
                value={values.password}
                      error={
                        touched.password && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                label="Password"
              />
             {errors.password&& touched.password? <p className="error-style">{errors.password}</p>:null}
            </FormControl>
          </div>
          <div className="flex Login">
            <Button
              className="LoginButton"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
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
