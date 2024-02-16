import React, { useState } from "react";
import Wrapper from "../../../components/Wrapper";
import "./dashboard.css";
import { useLocation } from "react-router";
import title from "../../../components/title";
import {GetAppliedFlat} from "../../../Redux/Reducer/GetAppliedFlat";
import { useDispatch } from "react-redux";
export default function TenantDashboard() {
  title("DashBoard")
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [mylocation, setMyLocation] = useState(location.pathname);
  const dispatch = useDispatch();

React.useEffect(() => {
  // setLoading(true)
  dispatch(GetAppliedFlat({ userId: localStorage.getItem("user_id") })).then(
    (res) => {
      console.log(res,"javed res")
      // if(res?.payload?.data?.message==="Get New Request Successfully"){
      // setData(res?.payload?.data?.data);
      // setLoading(false)
      // }
    }
  );
}, []);
  return (
    <>
      <Wrapper open={open} setOpen={setOpen} mylocation={mylocation} />
      <div className={`${open ? "sidebar-open" : "sidebar-closed"} `}>
        <div className="mainHeading">
          <h1>Dashboard</h1>
        </div>
        This is dashboard
      </div>
    </>
  );
}
