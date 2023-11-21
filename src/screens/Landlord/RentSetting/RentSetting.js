import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import { Container } from "@mui/material";
import { useLocation } from "react-router";
import title from "../../../components/title";
import "./rentSetting.css"
import { useDispatch } from "react-redux";
import { RentSet } from "../../../redux/Reducer/RentSetting";
import { toast,ToastContainer } from "react-toastify";
export default function RentSetting() {
  title("Rent Setting")
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [detail, setDetail] = useState({
    monthlyRent:"",
    advance:"",
    maintainanceChearges:"",
    trashCharges:"",
  });
  const handleChange = (e) => {
 
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit=()=>{
    if(detail.monthlyRent&&detail.advance&&detail.maintainanceChearges&&detail.trashCharges!=null||""){
      dispatch(RentSet({detail})).then((res)=>{
       if(res?.payload?.data?.message==="Rent Set Successfully"){
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
      toast.error("Empty Field are not allowed", {
        autoClose: 300,
      });
    }
  }
  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
    
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>Rent Setting</h1>
        </div>
        <Container maxWidth="sm" className="rent-setting-container">
          <div className="rent-inputs">
            <TextField
              id="standard-multiline-flexible"
              label="Monthly Rent"
              multiline
              maxRows={4}
              variant="standard"
              name="monthlyRent"
              onChange={handleChange}
            />
            <TextField
              id="standard-textarea"
              label="Advance"
              placeholder="Placeholder"
              multiline
              variant="standard"
              name="advance"
              onChange={handleChange}
            />

            <TextField
              id="standard-multiline-flexible"
              label="Maintenance Charges"
              multiline
              maxRows={4}
              variant="standard"
              name="maintainanceChearges"
              onChange={handleChange}
            />
            <TextField
              id="standard-textarea"
              label="Trash Charges"
              placeholder="Placeholder"
              multiline
              variant="standard"
              name="trashCharges"
              onChange={handleChange}
            />
          </div>
          <Button className="rentButton" variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Container>
        <ToastContainer />
      </div>
    
    </>
  );
}
