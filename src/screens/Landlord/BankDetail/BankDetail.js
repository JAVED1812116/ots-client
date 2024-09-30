import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import { Container } from "@mui/material";
import { useLocation } from "react-router";
import title from "../../../components/title";
import "./bankDetails.css";
import { useDispatch } from "react-redux";
import { AccountSet } from "../../../Redux/Reducer/AccountSetting";
import { ToastContainer, toast } from "react-toastify";
import { GetAccount } from "../../../Redux/Reducer/GetAccountDetails";
import { ValidateUser } from "../../../Redux/Reducer/ValidateUser";
export default function BankDetail() {
  title("Account Detail");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const [getData, setGetData] = useState();
  const [fieldDisable, setFieldDisable] = useState(false);
  const [detail, setDetail] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    ibanNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = () => {
    setFieldDisable(true)
    if (
      (detail.bankName &&
        detail.accountName &&
        detail.accountNumber &&
        detail.ibanNumber != null) ||
      ""
    ) {
      detail.userId = localStorage.getItem("user_id");
      detail.userName = localStorage.getItem("name");
      dispatch(AccountSet({ detail })).then((res) => {
        if (
          res?.payload?.data?.message === "Account Detail Save Successfully"
        ) {
          toast.success(res?.payload?.data?.message, {
            autoClose: 300,
          });
          dispatch(ValidateUser({}))
          dispatch(
            GetAccount({ userId: localStorage.getItem("user_id") })
          ).then((res) => {
            setGetData(res?.payload?.data);
            let { bankName, accountName, accountNumber, ibanNumber } =
              res?.payload?.data?.data;
            setDetail({
              bankName,
              accountName,
              accountNumber,
              ibanNumber,
            });
          });
        } else {
          toast.error(res?.payload?.data?.message, {
            autoClose: 300,
          });
        }
      });
    } else {
      setFieldDisable(false)
      toast.error("Empty Fields are not allowed", {
        autoClose: 300,
      });
    }
  };
  const handleUpdate = () => {
    setFieldDisable(false)
  
  };

  React.useEffect(() => {
    dispatch(GetAccount({ userId: localStorage.getItem("user_id") })).then(
      (res) => {
        setGetData(res?.payload?.data);
        if (res?.payload?.data?.data?.bankName !== "") {
          
          setFieldDisable(true)
        }
        let { bankName, accountName, accountNumber, ibanNumber } =
          res?.payload?.data?.data;
        setDetail({
          bankName,
          accountName,
          accountNumber,
          ibanNumber,
        });
      }
    );
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
              id="standard-multiline-flexible"
              label="Bank Name"
              multiline
              maxRows={4}
              variant="standard"
              name="bankName"
              value={detail.bankName}
              disabled={fieldDisable===true}
              onChange={handleChange}
            />
            <TextField
              id="standard-textarea"
              label="Account Name"
              placeholder="Placeholder"
              multiline
              variant="standard"
              name="accountName"
              value={detail.accountName}
              disabled={fieldDisable===true}
              onChange={handleChange}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Account Number"
              multiline
              maxRows={4}
              variant="standard"
              name="accountNumber"
              value={detail.accountNumber}
              disabled={fieldDisable===true}
              onChange={handleChange}
            />
            <TextField
              id="standard-textarea"
              label="IBAN Number"
              placeholder="Placeholder"
              multiline
              variant="standard"
              name="ibanNumber"
              value={detail.ibanNumber}
              disabled={fieldDisable===true}
              onChange={handleChange}
            />
          </div>

          {getData?.data?.bankName === "" &&
          getData?.data?.accountName === "" &&
          getData?.data?.accountNumber === "" &&
          getData?.data?.ibanNumber === "" ? (
            <Button
            className="bankButton"
            variant="contained"
            onClick={handleSubmit}
            >
              Save
            </Button>
          ) : (
            " "
          )}

          {getData?.data?.bankName !== "" &&
          getData?.data?.accountName !== "" &&
          getData?.data?.accountNumber !== "" &&
          getData?.data?.ibanNumber !== "" ? (
            fieldDisable===false?   <Button
              className="bankButton"
              variant="contained"
              onClick={handleSubmit}
            >
              Update
            </Button>:<Button
              className="bankButton"
              variant="contained"
              onClick={handleUpdate}
            >
              Edit
            </Button>
          ) : (
            " "
          )}
        </Container>
        <ToastContainer />
      </div>
    </>
  );
}
