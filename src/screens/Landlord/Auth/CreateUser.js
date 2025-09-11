import React from "react";
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
// import { UserAdd } from "../../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Alert, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import CodeIcon from "@mui/icons-material/Code";
import "react-toastify/dist/ReactToastify.css";
import { UserAdd } from "../../../Redux/Reducer/CreateUser";
import { useFormik } from "formik";
import { signUpSchema } from "./validationSchema";

// import Button from '@mui/material/Button';
const CreateUser = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const loaderSate=useSelector((state)=>state?.UserAdd?.loading)
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  <Alert variant="filled" severity="success">
    This is a success alert — check it out!
  </Alert>;
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const hasId = query.get("id");

  const initialValues = {
    name:"",
    email: "",
    password: ""
  }
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values,action) => {
      dispatch(UserAdd({ values, code: hasId })).then(
        (res) => {
          if (res?.payload?.data?.message === "User Register Successfully") {
            navigate("/login",{state:{type:"Landlord"}})
            return toast.success("Signup Successfully!", {
              position: "top-center",
            });
          } else if (res?.payload?.data?.message === "User Already Registered") {
            return toast.error("User Already Registered!", {
              position: "top-center",
            });
          } 
          else if (res?.payload?.data?.message === "Landlord Not Found") {
            return toast.error("Landlord Not Found!", {
              position: "top-center",
            });
          } 
          else {
            toast.error("Empty Field are not allowed", {
              position: "top-center",
            });
          }
        }
      ).catch((err)=> {
        console.log(err, 'err res');
      });
      action.resetForm();
    },
  })
  return (
    <div className="landlord_login">
      <div className="login-body">
        <div className="logoClass">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="loginText">
          <h1>Signup Page</h1>
        </div>
        {loaderSate && (
      <div className="loader-overlay">
        <CircularProgress />
      </div>
    )}
        <form onSubmit={handleSubmit}>
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
              // onChange={(e) => setName(e.target.value)}
              name="name"
              value={values.name}
              onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.name && Boolean(errors.name)
                }
                helperText={touched.name && errors.name}
            />
            <p className="error-style">{errors.name}</p>
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
              // onChange={(e) => {
              //   setEmail(e.target.value);
              // }}
              name="email"
              value={values.email}
              onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.email && Boolean(errors.email)
                }
                helperText={touched.email && errors.email}
            />
{errors.email&& touched.email? <p className="error-style">{errors.email}</p>:null}
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
              // onChange={(e) => {
              //   setPassword(e.target.value);
              // }}
              value={values.password}
                      error={
                        touched.password && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
            />
            {errors.password&& touched.password? <p className="error-style">{errors.password}</p>:null}
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
            type="submit"
            // onClick={() => {
            //   Signup();
            // }}
          >
            Signup
          </Button>
        </div>
        </form>
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
