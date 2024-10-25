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
import AccountDetailValidation from "../../../Validation/AccountDetailValidation";

export default function BankDetail() {
  title("Account Detail");
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [getData, setGetData] = useState();
  const [fieldDisable, setFieldDisable] = useState(false);
  
  const validationSchema = AccountDetailValidation();
  const [detail, setDetail] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    ibanNumber: "",
  });
  
  const [errors, setErrors] = useState({}); // State to hold error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const handleSubmit = async () => {
    try {
      // Validate the detail object
      await validationSchema.validate(detail, { abortEarly: false });
      
      // If validation passes, dispatch the action
      setFieldDisable(true);
      const res = await dispatch(AccountSet({ detail }));
      if (res?.payload?.data?.message === "Account Detail Save Successfully") {
        toast.success(res?.payload?.data?.message, { autoClose: 300 });
        dispatch(ValidateUser({}));
        const accountRes = await dispatch(GetAccount({ userId: localStorage.getItem("user_id") }));
        setGetData(accountRes?.payload?.data);
        let { bankName, accountName, accountNumber, ibanNumber } = accountRes?.payload?.data?.data;
        setDetail({ bankName, accountName, accountNumber, ibanNumber });
      } else {
        toast.error(res?.payload?.data?.message, { autoClose: 300 });
      }
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message; // Collect all errors
        });
        setErrors(newErrors); // Set errors in state
      }
    }
  };

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
      setDetail({ bankName, accountName, accountNumber, ibanNumber });
    });
  }, []);

  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
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
              value={detail.bankName}
              disabled={fieldDisable}
              onChange={handleChange}
              error={!!errors.bankName} // Check for error
              helperText={errors.bankName} // Show error message
            />
            <TextField
              id="accountName"
              label="Account Name"
              variant="standard"
              name="accountName"
              value={detail.accountName}
              disabled={fieldDisable}
              onChange={handleChange}
              error={!!errors.accountName}
              helperText={errors.accountName}
            />
            <TextField
              id="accountNumber"
              label="Account Number"
              variant="standard"
              name="accountNumber"
              value={detail.accountNumber}
              disabled={fieldDisable}
              onChange={handleChange}
              error={!!errors.accountNumber}
              helperText={errors.accountNumber}
            />
            <TextField
              id="ibanNumber"
              label="IBAN Number"
              variant="standard"
              name="ibanNumber"
              value={detail.ibanNumber}
              disabled={fieldDisable}
              onChange={handleChange}
              error={!!errors.ibanNumber}
              helperText={errors.ibanNumber}
            />
          </div>

          {getData?.data?.bankName === "" &&
          getData?.data?.accountName === "" &&
          getData?.data?.accountNumber === "" &&
          getData?.data?.ibanNumber === "" ? (
            <Button className="bankButton" variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          ) : getData?.data?.bankName && getData?.data?.accountName && getData?.data?.accountNumber && getData?.data?.ibanNumber ? (
            fieldDisable === false ? (
              <Button className="bankButton" variant="contained" onClick={handleSubmit}>
                Update
              </Button>
            ) : (
              <Button className="bankButton" variant="contained" onClick={handleUpdate}>
                Edit
              </Button>
            )
          ) : null}
        </Container>
        <ToastContainer />
      </div>
    </>
  );
}
