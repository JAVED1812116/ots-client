import React from 'react'
import "./auth.css"
import { Button } from '@mui/base'
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const LandlordLogin = () => {
  const navigate=useNavigate();
  return (
    <div className='login-body'>
      <div className='logoClass'>
      <img className='logo' src={logo} alt="" />
      </div>
      <div className='loginText'>
      <h1>Login Page</h1>
      </div>
      <div className='line1'>
        <div className='loginemail'>
      <EmailOutlinedIcon className='loginemail'/>
      </div>
<input className='loginEmailText'  placeholder='Enter Your Email'/>
      </div>
      <div className='line2'>
        <div className='loginPassword'>
        <LockOutlinedIcon className='loginPassword'/>
        </div>
<input className='loginPasswordText' placeholder='Enter Your Password'/>
      </div>
      <div className='forgetPassword'>
<text className='forgetPassword'>Forget Password</text>
      </div>
      <div className='Login'>
      <Button className='LoginButton' onClick={()=>navigate("/landlord-dashboard")}>Login</Button>
      </div>
      <div className='Login'>
      <text className='newAccount'>Don't Have Account?<Button onClick={()=> navigate("/landlord-signup")}>Signup</Button></text>
      </div>
    </div>
  )
}

export default LandlordLogin
