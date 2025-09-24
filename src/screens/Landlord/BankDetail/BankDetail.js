import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Wrapper from "../../../components/Wrapper";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useLocation } from "react-router";
import title from "../../../components/title";
import { useDispatch } from "react-redux";
import { AccountSet } from "../../../Redux/Reducer/AccountSetting";
import { ToastContainer, toast } from "react-toastify";
import { GetAccount } from "../../../Redux/Reducer/GetAccountDetails";
import { ValidateUser } from "../../../Redux/Reducer/ValidateUser";
import { bankDetailSchema } from "./validationSchema";
import { useFormik } from "formik";

export default function BankDetail() {
  title("Account Detail");
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [getData, setGetData] = useState();
  const [fieldDisable, setFieldDisable] = useState(false);
 
  const handleUpdate = () => {
    setFieldDisable(false);
  };

  useEffect(() => {
    dispatch(GetAccount({ userId: localStorage.getItem("user_id") })).then((res) => {
      setGetData(res?.payload?.data);
      if (res?.payload?.data?.data?.bankName !== "") {
        setFieldDisable(true);
      }
      const { bankName, accountName, accountNumber, ibanNumber } = res?.payload?.data?.data;
      // setDetail({ bankName, accountName, accountNumber, ibanNumber });
    });
  }, []);
  const initialValues = {
    bankName: "",
    accountName: "",
    accountNumber: "",
    ibanNumber: "",
  }
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } = useFormik({
    initialValues,
    validationSchema: bankDetailSchema,
    onSubmit: async(values,action) => {
  try {
     
      
      // If validation passes, dispatch the action
      setFieldDisable(true);
      console.log(values,"111111111 valuesvaluesvalues")
      const res = await dispatch(AccountSet({ values }));
      console.log(res,"111111111 resresres")
      if (res?.payload?.data?.message === "Account Detail Save Successfully") {
        toast.success(res?.payload?.data?.message, { autoClose: 300 });
        dispatch(ValidateUser({}));
        const accountRes = await dispatch(GetAccount({ userId: localStorage.getItem("user_id") }));
        setGetData(accountRes?.payload?.data);
        let { bankName, accountName, accountNumber, ibanNumber } = accountRes?.payload?.data?.data;
        // setDetail({ bankName, accountName, accountNumber, ibanNumber });
      } else {
        toast.error(res?.payload?.data?.message, { autoClose: 300 });
      }
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message; // Collect all errors
        });
      }
    }
      action.resetForm();
    },
  })
  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
      <form onSubmit={handleSubmit}>
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>Account Detail</h1>
        </div>
        <Container maxWidth="sm" className="bank-details-container">
          <div className="bank-inputs">
            <TextField
              id="bankName"
              label="Bank Name"
              variant="standard"
              name="bankName"
              disabled={fieldDisable}
              value={values.bankName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.bankName && Boolean(errors.bankName)
              }
              helperText={touched.bankName && errors.bankName}
            />
            <TextField
              id="accountName"
              label="Account Name"
              variant="standard"
              name="accountName"
              disabled={fieldDisable}
              value={values.accountName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.accountName && Boolean(errors.accountName)
              }
              helperText={touched.accountName && errors.accountName}
            />
            <TextField
              id="accountNumber"
              label="Account Number"
              variant="standard"
              name="accountNumber"
              disabled={fieldDisable}
              value={values.accountNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.accountNumber && Boolean(errors.accountNumber)
              }
              helperText={touched.accountNumber && errors.accountNumber}
            />
            <TextField
              id="ibanNumber"
              label="IBAN Number"
              variant="standard"
              name="ibanNumber"
              disabled={fieldDisable}
              value={values.ibanNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.ibanNumber && Boolean(errors.ibanNumber)
              }
              helperText={touched.ibanNumber && errors.ibanNumber}
            />
          </div>

          {/* {values?.bankName === "" &&
          values?.accountName === "" &&
          values?.accountNumber === "" &&
          values?.ibanNumber === "" ? ( */}
            <Button className="bankButton" variant="contained" type="submit">
              Save
            </Button>
          {/* ) : */}
           {/* getData?.data?.bankName && getData?.data?.accountName && getData?.data?.accountNumber && getData?.data?.ibanNumber ? (
            fieldDisable === false ? ( */}
              {/* <Button className="bankButton" variant="contained" onClick={handleSubmit}>
                Update
              </Button> */}
            {/* ) : ( */}
              {/* <Button className="bankButton" variant="contained" onClick={handleUpdate}>
                Edit
              </Button> */}
            {/* )
          ) : null} */}
        </Container>
        <ToastContainer />
      </div>
      </form>
    </>
  );
}
