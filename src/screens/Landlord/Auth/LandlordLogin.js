import React from 'react'
import "./auth.css"
import { TextField } from '@mui/material'
import { Button } from '@mui/base'
const LandlordLogin = () => {
  return (
    <div className='login-body'>
      <div className='loginText'>
      <h1>Login Page</h1>
      </div>
      <div className='line1'>
<input className='loginEmailText' placeholder='Enter Your Email'/>
      </div>
      <div className='line2'>
<input className='loginPasswordText' placeholder='Enter Your Password'/>
      </div>
      <div className='forgetPassword'>
<text className='forgetPassword'>Forget Password</text>
      </div>
      <div className='Login'>
<Button className='LoginButton'>Login</Button>
      </div>
    </div>
  )
}

export default LandlordLogin
