import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Wrapper from '../../../components/Wrapper';
import { useState } from 'react';
import { Container } from '@mui/material';
import { useLocation } from "react-router";
import title from '../../../components/title';
import "./bankDetails.css"
import { useDispatch } from 'react-redux';
import { AccountSet } from '../../../redux/Reducer/AccountSetting';
import { ToastContainer, toast } from 'react-toastify';
export default function BankDetail() {
  title("Account Detail")
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [detail, setDetail] = useState({
    bankName:"",
    accountName:"",
    accountNumber:"",
    ibanNumber:"",
  });
  const handleChange=(e)=>{
const {name,value}=e.target;
setDetail((prev)=>{
  return {...prev,[name]:value}
});
  };

  const handleSubmit=()=>{
   
    if(detail.bankName&&detail.accountName&&detail.accountNumber&&detail.ibanNumber!=null||""){
      console.log("inIF")
      dispatch(AccountSet({detail})).then((res)=>{
        console.log(res?.payload?.data?.message)
        if(res?.payload?.data?.message==="Account Detail Save Successfully"){
          toast.success(res?.payload?.data?.message, {
            autoClose: 300,
          });
  
        }else{
          toast.error(res?.payload?.data?.message,{
            autoClose:300,
          })
         
         }
        });
    }else{
      console.log("inElse")
      toast.error("Empty Field are not allowed", {
        autoClose: 300,
      });
    }
  }
  return (
    <>
    <Wrapper open={open} setOpen={setOpen} mylocation= {mylocation}/>
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
      <div className="mainHeading">
          <h1>Account Detail</h1>
        </div>
      <Container maxWidth="sm" className="bank-details-container">

      <div className="bank-inputs">
        <TextField
          id="standard-multiline-flexible"
          label="Bank Name"
          multiline
          maxRows={4}
          variant="standard"
          name='bankName'
          onChange={handleChange}
        />
        <TextField
          id="standard-textarea"
          label="Account Name"
          placeholder="Placeholder"
          multiline
          variant="standard"
          name='accountName'
          onChange={handleChange}
        />
        {/* <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="standard"
        /> */}

        <TextField
          id="standard-multiline-flexible"
          label="Account Number"
          multiline
          maxRows={4}
          variant="standard"
          name='accountNumber'
          onChange={handleChange}
        />
        <TextField
          id="standard-textarea"
          label="IBAN Number"
          placeholder="Placeholder"
          multiline
          variant="standard"
          name='ibanNumber'
          onChange={handleChange}
        />
      </div>
      <Button className="bankButton" variant="contained" onClick={handleSubmit}>
        Save
      </Button>
    </Container>
    <ToastContainer />
    </div>
    </>
  );
}