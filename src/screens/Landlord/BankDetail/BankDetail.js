import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Wrapper from "../../../components/Wrapper";
import { useState, useEffect } from "react";
import { CircularProgress, Container } from "@mui/material";
import { useLocation } from "react-router";
import title from "../../../components/title";
import { useDispatch, useSelector } from "react-redux";
import { AccountSet } from "../../../Redux/Reducer/AccountSetting";
import { ToastContainer, toast } from "react-toastify";
import { GetAccount } from "../../../Redux/Reducer/GetAccountDetails";
import { ValidateUser } from "../../../Redux/Reducer/ValidateUser";
import { bankDetailSchema } from "./validationSchema";
import { useFormik } from "formik";
import { isEqual } from "lodash";
import "./bankDetails.css";

export default function BankDetail() {
  title("Account Detail");
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mylocation, setMyLocation] = useState(location.pathname);
  const loaderSate=useSelector((state)=>state?.accountSetting?.loading);
  const [initialData, setInitialData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    ibanNumber: "",
  });

  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize: true, // jab initialData change ho to values reset ho jayein
    validationSchema: bankDetailSchema,
    onSubmit: async (values) => {
      try {
        const res = await dispatch(AccountSet({ values }));
        if (res?.payload?.data?.message === "Account Detail Save Successfully") {
          toast.success(res?.payload?.data?.message, { autoClose: 300 });
          dispatch(ValidateUser({}));

          const accountRes = await dispatch(
            GetAccount({ userId: localStorage.getItem("user_id") })
          );
          let { bankName, accountName, accountNumber, ibanNumber } =
            accountRes?.payload?.data?.data;

          const updatedData = {
            bankName: bankName || "",
            accountName: accountName || "",
            accountNumber: accountNumber || "",
            ibanNumber: ibanNumber || "",
          };

          setInitialData(updatedData); // form reset karne ke liye
        } else {
          toast.error(res?.payload?.data?.message, { autoClose: 300 });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const { values, errors, handleBlur, handleChange, touched, handleSubmit, isValid } =
    formik;

  useEffect(() => {
    dispatch(GetAccount({ userId: localStorage.getItem("user_id") })).then(
      (res) => {
        const { bankName, accountName, accountNumber, ibanNumber } =
          res?.payload?.data?.data;

        const backendData = {
          bankName: bankName || "",
          accountName: accountName || "",
          accountNumber: accountNumber || "",
          ibanNumber: ibanNumber || "",
        };

        setInitialData(backendData); // backend ka data set karo
      }
    );
  }, [dispatch]);

  // compare current form values with backend data
  const isChanged = !isEqual(initialData, values);

  return (
    <>
    {loaderSate && (
      <div className="loader-overlay">
        <CircularProgress />
      </div>
    )}
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
                value={values.bankName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.bankName && Boolean(errors.bankName)}
                helperText={touched.bankName && errors.bankName}
              />
              <TextField
                id="accountName"
                label="Account Name"
                variant="standard"
                name="accountName"
                value={values.accountName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.accountName && Boolean(errors.accountName)}
                helperText={touched.accountName && errors.accountName}
              />
              <TextField
                id="accountNumber"
                label="Account Number"
                variant="standard"
                name="accountNumber"
                value={values.accountNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.accountNumber && Boolean(errors.accountNumber)}
                helperText={touched.accountNumber && errors.accountNumber}
              />
              <TextField
                id="ibanNumber"
                label="IBAN Number"
                variant="standard"
                name="ibanNumber"
                value={values.ibanNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.ibanNumber && Boolean(errors.ibanNumber)}
                helperText={touched.ibanNumber && errors.ibanNumber}
              />
            </div>

            <Button
              className="bankButton"
              variant="contained"
              type="submit"
              disabled={!isChanged || !isValid}
            >
              Save
            </Button>
          </Container>
          <ToastContainer />
        </div>
      </form>
    </>
  );
}
