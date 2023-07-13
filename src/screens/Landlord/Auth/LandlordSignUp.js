import React from 'react'
import "./auth.css"
import { Button } from '@mui/base'
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
const LandlordSignUp = () => {
  const navigate=useNavigate();
  return (
    <>    
    <div className='signup-body'>
       <div className='logoClass'>
      <img className='logo' src={logo} alt="" />
      </div>
      <div className='signupText'>
      <h1>SignUp Page</h1>
      </div>
      <div className='signupline1'>
<input className='loginEmailText' placeholder='Enter Your Name'/>
      </div>
      <div className='signupline2'>
<input className='loginPasswordText' placeholder='Enter Your Email'/>
      </div>
      <div className='signupline3'>
<input className='loginPasswordText' placeholder='Enter Your Password'/>
      </div>
      <div className='Signup'>
      <Button className='signupButton'>Signup</Button>
      </div>
      <div className='Signup'>
      <text className='alreadyAccount'>Already Have Account?<Button onClick={()=> navigate("/landlord-login")}>Login</Button></text>
      </div>
    </div>
  </>
  )
}

export default LandlordSignUp
